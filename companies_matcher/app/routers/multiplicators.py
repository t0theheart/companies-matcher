from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingMultiplicatorsParams, MatchingReportsParams


multiplicators_router = APIRouter()


@multiplicators_router.post("/match")
async def match_multiplicators(params: MatchingMultiplicatorsParams, request: Request):
    result = await request.app.finviz(tickers=params.tickers, multiplicators=params.multiplicators).get_data()
    return {'result': result}


@multiplicators_router.get("/list")
async def get_multiplicators_list(request: Request):
    result = {
        "multiplicators": [
            "Market Cap", "Book/sh", "Cash/sh", "Recom", "P/E", "Forward P/E", "PEG", "P/S", "P/B", "P/C", "P/FCF",
            "Quick Ratio", "Current Ratio", "Debt/Eq", "LT Debt/Eq", "ROA", "ROE", "ROI", "Gross Margin",
            "Oper. Margin", "Profit Margin", "Beta"
        ]
    }
    return {'result': result}
