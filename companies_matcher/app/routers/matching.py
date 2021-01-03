from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingReportsParams


reports_router = APIRouter()


@reports_router.post("/match")
async def match_reports(params: MatchingReportsParams, request: Request):
    result = await request.app.marketwatch(report=params.reports[0], tickers=params.tickers, topics=params.topics).get_data()
    return {'result': result}
