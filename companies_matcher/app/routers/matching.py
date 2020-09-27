from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingMultiplicatorsParams, MatchingReportsParams


matching_router = APIRouter()


@matching_router.post("/multiplicators")
async def match_multiplicators(params: MatchingMultiplicatorsParams, request: Request):
    result = await request.app.finviz(tickers=params.tickers, multiplicators=params.multiplicators).get_data()
    return {'result': result}


@matching_router.post("/reports")
async def match_reports(params: MatchingReportsParams, request: Request):
    result = await request.app.marketwatch(report=params.reports[0], tickers=params.tickers, topics=params.topics).get_data()
    return {'result': result}
