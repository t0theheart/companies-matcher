from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingDividendsParams


dividends_router = APIRouter()


@dividends_router.post("/match")
async def match_dividends(params: MatchingDividendsParams, request: Request):
    print(params)
    return {'result': params}
