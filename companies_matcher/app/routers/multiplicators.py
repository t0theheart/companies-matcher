from fastapi import APIRouter, Request, Query
from typing import List

multiplicators_router = APIRouter()


@multiplicators_router.get("/multiplicators")
async def get_multiplicators(request: Request, t: List[str] = Query(None), m: List[str] = Query(None)):
    result = await request.app.finviz(tickers=t, multiplicators=m).get_data()
    return {'result': result}
