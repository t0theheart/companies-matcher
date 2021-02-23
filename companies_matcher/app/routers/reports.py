from fastapi import APIRouter, Request
from companies_matcher.app.serializers import MatchingReportsParams
from companies_matcher.parsers.marketwatch_reports import get_reports
from companies_matcher.config import config

reports_router = APIRouter()


@reports_router.post("/match")
async def match_reports(params: MatchingReportsParams, request: Request):
    result = await get_reports(reports=params.reports, tickers=params.tickers, topics=params.topics)
    return {'result': result}


@reports_router.get("/income/topics")
async def get_income_topics(request: Request):
    return {'result': config['marketwatch']['incomeTopics']}


@reports_router.get("/balance/topics")
async def get_balance_topics(request: Request):
    return {'result': config['marketwatch']['balanceTopics']}


@reports_router.get("/cash/topics")
async def get_cash_topics(request: Request):
    return {'result': config['marketwatch']['cashTopics']}
