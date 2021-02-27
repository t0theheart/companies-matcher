from companies_matcher.parsers.finviz_parser import FinvizParser


_multiplicator = 'Dividend'


def _join_result(data: list, dividends: dict):
    for item in data:
        t = item['ticker']
        try:
            div = dividends[t][_multiplicator]
            item['total'] = round(float(div) * item['amount'], 2)
            item['dividends'] = round(float(div), 2)
        except KeyError:
            item['total'] = 0
            item['dividends'] = 0
        except ValueError:
            item['total'] = 0
            item['dividends'] = 0


async def get_dividends(data: list):
    tickers = [item['ticker'] for item in data]
    parser = FinvizParser(tickers, [_multiplicator])
    result = await parser.get_data()
    _join_result(data, result)
    return data
