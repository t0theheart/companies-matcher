from pydantic import BaseModel, validator
from typing import List


class MatchingMultiplicatorsParams(BaseModel):
    tickers: List[str]
    multiplicators: List[str]

    @validator('tickers')
    def _validate_tickers(cls, v):
        if not v:
            raise ValueError('tickers filed must not be empty')
        return v

    @validator('multiplicators')
    def _validate_multiplicators(cls, v):
        if not v:
            raise ValueError('multiplicators filed must not be empty')
        return v


class MatchingReportsParams(BaseModel):
    tickers: List[str]
    topics: List[str]
    reports: List[str]

    @validator('tickers')
    def _validate_tickers(cls, v):
        if not v:
            raise ValueError('tickers filed must not be empty')
        return v

    @validator('topics')
    def _validate_topics(cls, v):
        if not v:
            raise ValueError('topics filed must not be empty')
        return v

    @validator('reports')
    def _validate_reports(cls, v):
        if not v:
            raise ValueError('reports filed must not be empty')
        return v


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
