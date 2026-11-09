from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.database import get_db
from backend.app.models import Project, Document, ExtractedFinding, Handover, Review, AuditLog, User
from backend.app.schemas import DashboardStats
from backend.app.auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics & Dashboard"])

@router.get("/dashboard", response_model=DashboardStats)
def get_dashboard_metrics(
    project_id: Optional[str] = Query(None, description="Optional project ID to scope analytics"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    doc_query = db.query(Document)
    finding_query = db.query(ExtractedFinding)
    handover_query = db.query(Handover)
    audit_query = db.query(AuditLog)

    if project_id:
        doc_query = doc_query.filter(Document.project_id == project_id)
        finding_query = finding_query.filter(ExtractedFinding.project_id == project_id)
        handover_query = handover_query.filter(Handover.project_id == project_id)
        audit_query = audit_query.filter(AuditLog.project_id == project_id)

    total_projects = db.query(Project).count()
    total_documents = doc_query.count()
    total_findings = finding_query.count()

    pending_reviews = finding_query.filter(
        ExtractedFinding.status.in_(["DRAFT", "FLAGGED", "UNDER_INVESTIGATION"])
    ).count()

    approved_findings = finding_query.filter(
        ExtractedFinding.status == "APPROVED"
    ).count()

    flagged_issues = finding_query.filter(
        ExtractedFinding.verification_status.in_(["CONFLICTING", "UNSUPPORTED"])
    ).count()

    completed_handovers = handover_query.filter(
        Handover.status.in_(["APPROVED", "FINALIZED", "SHARED"])
    ).count()

    # Findings grouped by entity_type
    type_query = db.query(ExtractedFinding.entity_type, func.count(ExtractedFinding.id))
    if project_id:
        type_query = type_query.filter(ExtractedFinding.project_id == project_id)
    type_counts = type_query.group_by(ExtractedFinding.entity_type).all()
    findings_by_type = {t[0]: t[1] for t in type_counts}

    # Findings grouped by verification_status
    verif_query = db.query(ExtractedFinding.verification_status, func.count(ExtractedFinding.id))
    if project_id:
        verif_query = verif_query.filter(ExtractedFinding.project_id == project_id)
    verif_counts = verif_query.group_by(ExtractedFinding.verification_status).all()
    verification_breakdown = {v[0]: v[1] for v in verif_counts}

    # Recent activity stream
    recent_audits = (
        audit_query
        .order_by(AuditLog.created_at.desc())
        .limit(10)
        .all()
    )

    activity_stream = []
    for a in recent_audits:
        actor = db.query(User).filter(User.id == a.user_id).first() if a.user_id else None
        proj = db.query(Project).filter(Project.id == a.project_id).first() if a.project_id else None
        activity_stream.append({
            "id": a.id,
            "action": a.action,
            "user_name": actor.full_name if actor else "System",
            "project_name": proj.name if proj else "Global",
            "details": a.details or {},
            "timestamp": a.created_at.isoformat()
        })

    return DashboardStats(
        total_projects=total_projects,
        total_documents=total_documents,
        total_findings=total_findings,
        pending_reviews=pending_reviews,
        approved_findings=approved_findings,
        flagged_issues=flagged_issues,
        completed_handovers=completed_handovers,
        findings_by_type=findings_by_type,
        verification_breakdown=verification_breakdown,
        recent_activity=activity_stream
    )
