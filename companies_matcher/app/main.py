from fastapi import FastAPI
from companies_matcher.app.routers.multiplicators import router
from companies_matcher.parsers import FinvizParser, MarketwatchParser


app = FastAPI()


@app.on_event("startup")
async def init_app():
    app.finviz = FinvizParser
    app.marketwatch = MarketwatchParser

    app.include_router(router)


