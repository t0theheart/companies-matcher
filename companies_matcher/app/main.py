from fastapi import FastAPI
from companies_matcher.app.routers import matching_router, index_router
from companies_matcher.parsers import FinvizParser, MarketwatchParser
from fastapi.staticfiles import StaticFiles


app = FastAPI()


@app.on_event("startup")
async def init_app():
    app.finviz = FinvizParser
    app.marketwatch = MarketwatchParser

    app.mount("/static", StaticFiles(directory="companies_matcher/app/front/static/css"), name="static")
    app.mount("/scripts", StaticFiles(directory="companies_matcher/app/front/static/js"), name="scripts")

    app.include_router(matching_router, prefix='/matching')
    app.include_router(index_router)
