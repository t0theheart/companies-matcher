from bs4 import BeautifulSoup
from companies_matcher.config import config
from .abc import ParserABC
import aiohttp


URL = config['marketwatch']['url']
HEADERS = {'User-Agent': config['service']['userAgent']}


class MarketwatchParser(ParserABC):
    _url = URL
    _headers = HEADERS

    def __init__(self, report: str, tickers: list, topics: list):
        self._tickers = tickers
        self._topics = topics
        self._endpoint = report

    @staticmethod
    def _parse_period(soup: BeautifulSoup):
        row = soup.find('thead', class_='table__header')
        return [i.text for i in row.find_all('div', attrs={'class': 'cell__content'})[2:-1]]

    @staticmethod
    def _combine_data_with_period(data: dict, period: list):
        result = {key: {} for key in period}
        for n, item in enumerate(period):
            for key in data.keys():
                values = data[key][n]
                result[item].update({key: values})
        return result

    async def _request_html(self, ticker: str):
        url = self._url + f'{ticker}/{self._endpoint}'
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self._headers) as resp:
                return await resp.text()

    def _parse_html(self, html: str):
        data = dict()
        soup = BeautifulSoup(html, "html.parser")
        rows = soup.find_all('tr', attrs={'class': 'table__row'})
        for row in rows:
            if cells := row.find_all('div', class_='cell__content'):
                topic = cells[0].text
                if topic in self._topics:
                    values = [i.text for i in cells[2:-1]]
                    data[topic] = values
        period = self._parse_period(soup)
        result = self._combine_data_with_period(data, period)
        return result, period
