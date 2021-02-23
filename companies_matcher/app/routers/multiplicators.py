from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingMultiplicatorsParams
from companies_matcher.config import config


multiplicators_router = APIRouter()


@multiplicators_router.post("/match")
async def match_multiplicators(params: MatchingMultiplicatorsParams, request: Request):
    result = await request.app.finviz(tickers=params.tickers, multiplicators=params.multiplicators).get_data()
    return {'result': result}


@multiplicators_router.get("/list")
async def get_multiplicators_list(request: Request):
    return {'result': config['finviz']['multiplicators']}
