from companies_matcher.finviz_parser.finviz_parser import FinvizParser
from companies_matcher.writer.writer import write_to_xlsx
from companies_matcher.config import config


url = config['finviz']['url']
multiplicators = config['finviz']['multiplicators']
tickers = config['finviz']['tickers']

headers = {'User-Agent': config['service']['userAgent']}


data = FinvizParser(url, headers).get_data(tickers, multiplicators)
write_to_xlsx(data=data, column_headers=tickers, rows_headers=multiplicators)
