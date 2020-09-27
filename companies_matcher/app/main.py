from fastapi import FastAPI
from companies_matcher.app.routers import multiplicators_router, reports_router
from companies_matcher.parsers import FinvizParser, MarketwatchParser


app = FastAPI()


@app.on_event("startup")
async def init_app():
    app.finviz = FinvizParser
    app.marketwatch = MarketwatchParser

    app.include_router(multiplicators_router)
    app.include_router(reports_router)
