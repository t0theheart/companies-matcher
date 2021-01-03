from fastapi import FastAPI
from companies_matcher.app.routers import index_router, multiplicators_router, reports_router
from companies_matcher.parsers import FinvizParser, MarketwatchParser
from fastapi.staticfiles import StaticFiles


app = FastAPI()


@app.on_event("startup")
async def init_app():
    app.finviz = FinvizParser
    app.marketwatch = MarketwatchParser

    app.mount("/static", StaticFiles(directory="companies_matcher/app/front/static/css"), name="static")
    app.mount("/scripts", StaticFiles(directory="companies_matcher/app/front/static/js"), name="scripts")

    app.include_router(multiplicators_router, prefix='/multiplicators')
    app.include_router(reports_router, prefix='/reports')
    app.include_router(index_router)
