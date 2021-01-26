from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingDividendsParams
from companies_matcher.parsers.finviz_dividends import get_dividends


dividends_router = APIRouter()


@dividends_router.post("/match")
async def match_dividends(params: MatchingDividendsParams):
    data = params.dict()['dividends']
    dividends = await get_dividends(data)
    return {'result': dividends}
