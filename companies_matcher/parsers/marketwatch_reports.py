from .marketwatch_parser import MarketwatchParser
import asyncio
from collections import defaultdict


def _combine_results(results: list, tickers: list):
    combined_result = {ticker: defaultdict(dict) for ticker in tickers}
    period = set()
    for ticker in tickers:
        for report in results:
            for year in report[ticker].keys():
                combined_result[ticker][year].update(report[ticker][year])
                period.add(year)
    return {'data': combined_result, 'period': sorted(list(period))}


async def get_reports(reports: list, tickers: list, topics: list):
    parser = MarketwatchParser
    aws = [parser(report=report, tickers=tickers, topics=topics).get_data() for report in reports]
    results = await asyncio.gather(*aws)
    return _combine_results(results, tickers)
