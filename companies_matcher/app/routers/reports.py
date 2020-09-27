from fastapi import APIRouter, Request, Query
from typing import List

reports_router = APIRouter()


@reports_router.get("/reports/{report}")
async def get_report(report: str, request: Request, t: List[str] = Query(None), tp: List[str] = Query(None)):
    result = await request.app.marketwatch(report=report, tickers=t, topics=tp).get_data()
    return {'result': result}
