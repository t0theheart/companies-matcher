from pydantic import BaseModel
from typing import List


class MatchingMultiplicatorsParams(BaseModel):
    tickers: List[str]
    multiplicators: List[str]


class MatchingReportsParams(BaseModel):
    tickers: List[str]
    topics: List[str]
    reports: List[str]
