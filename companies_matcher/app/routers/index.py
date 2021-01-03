from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse


index_router = APIRouter()
templates = Jinja2Templates(directory="companies_matcher/app/front/templates")


@index_router.get("/", response_class=HTMLResponse)
async def match_multiplicators(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
