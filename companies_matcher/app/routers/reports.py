from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingReportsParams
from companies_matcher.parsers.marketwatch_reports import get_reports

reports_router = APIRouter()


@reports_router.post("/match")
async def match_reports(params: MatchingReportsParams, request: Request):
    result = await get_reports(reports=params.reports, tickers=params.tickers, topics=params.topics)
    return {'result': result}
