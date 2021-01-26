from companies_matcher.parsers.finviz_parser import FinvizParser


_multiplicator = 'Dividend'


def _join_result(data: list, dividends: dict):
    for item in data:
        t = item['ticker']
        div = dividends[t][_multiplicator]
        try:
            item['dividends'] = float(div) * item['amount']
        except ValueError:
            item['dividends'] = div


async def get_dividends(data: list):
    tickers = [item['ticker'] for item in data]
    parser = FinvizParser(tickers, [_multiplicator])
    result = await parser.get_data()
    _join_result(data, result)
    return data
