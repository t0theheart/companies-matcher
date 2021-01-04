from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingReportsParams
from companies_matcher.parsers.marketwatch_reports import get_reports

reports_router = APIRouter()


@reports_router.post("/match")
async def match_reports(params: MatchingReportsParams, request: Request):
    result = await get_reports(reports=params.reports, tickers=params.tickers, topics=params.topics)
    return {'result': result}


@reports_router.get("/income/topics")
async def get_income_topics(request: Request):
    result = [
        "Sales/Revenue", "Gross Income", "Net Income", "EPS (Basic)", "EBITDA"
    ]
    return {'result': result}


@reports_router.get("/balance/topics")
async def get_balance_topics(request: Request):
    result = [
        "Cash & Short Term Investments", "Total Current Assets", "Net Property, Plant & Equipment", "Total Assets",
        "Total Liabilities"
    ]
    return {'result': result}


@reports_router.get("/cash/topics")
async def get_cash_topics(request: Request):
    result = [
        "Net Operating Cash Flow", "Free Cash Flow"
    ]
    return {'result': result}
