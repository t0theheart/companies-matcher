from bs4 import BeautifulSoup
import requests


class FinvizParser:
    def __init__(self, url: str, headers: dict):
        self._page = None
        self._url = url
        self._headers = headers

    def _request_html(self, ticker: str):
        page = requests.get(self._url.format(ticker), params={'t': ticker}, headers=self._headers)
        self._page = page

    def _parse_html(self, multiplicators: list):
        result = dict()
        soup = BeautifulSoup(self._page.text, "html.parser")
        cells = soup.find_all('td', class_='snapshot-td2-cp')
        for cell in cells:
            key = cell.text
            if key in multiplicators:
                value = cell.find_next().text
                result[key] = value
        return result

    def _get_one(self, ticker: str, multiplicators: list):
        self._request_html(ticker)
        return {ticker: self._parse_html(multiplicators)}

    def get_data(self, tickers: list, multiplicators: list):
        result = {}
        for ticker in tickers:
            result.update(self._get_one(ticker, multiplicators))
        return result
