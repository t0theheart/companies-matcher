from pydantic import BaseModel, validator
from typing import List


class MatchingMultiplicatorsParams(BaseModel):
    tickers: List[str]
    multiplicators: List[str]


class MatchingReportsParams(BaseModel):
    tickers: List[str]
    topics: List[str]
    reports: List[str]


class DividendModel(BaseModel):
    ticker: str
    amount: int

    @validator('ticker')
    def _validate_ticker(cls, v):
        if v == '':
            raise ValueError('ticker filed must not be empty')
        return v

    @validator('amount')
    def _validate_amount(cls, v):
        if v == 0:
            raise ValueError('amount filed must not be empty')
        return v


class MatchingDividendsParams(BaseModel):
    dividends: List[DividendModel]
