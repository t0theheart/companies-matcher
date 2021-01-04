from bs4 import BeautifulSoup
from companies_matcher.config import config
from .abc import ParserABC
import aiohttp


class FinvizParser(ParserABC):
    _url = config['finviz']['url']
    _headers = {'User-Agent': config['service']['userAgent']}

    def __init__(self, tickers: list, multiplicators: list):
        self._tickers = tickers
        self._multiplicators = multiplicators

    async def _request_html(self, ticker: str):
        async with aiohttp.ClientSession() as session:
            async with session.get(self._url, params={'t': ticker}, headers=self._headers) as resp:
                return await resp.text()

    def _parse_html(self, html: str):
        result = dict()
        soup = BeautifulSoup(html, "html.parser")
        cells = soup.find_all('td', class_='snapshot-td2-cp')
        for cell in cells:
            key = cell.text
            if key in self._multiplicators:
                value = cell.find_next().text
                result[key] = value
        return result
