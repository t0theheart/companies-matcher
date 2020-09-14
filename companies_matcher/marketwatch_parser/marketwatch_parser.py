from bs4 import BeautifulSoup
from companies_matcher.config import config
import requests


URL = config['marketwatch']['url']
HEADERS = {'User-Agent': config['service']['userAgent']}
ENDPOINT = config['marketwatch']['endpoints']['incomeStatement']


class MarketwatchParser:
    def __init__(self, tickers: list, topics: list):
        self._url = URL
        self._headers = HEADERS
        self._endpoint = ENDPOINT
        self._tickers = tickers
        self._topics = topics

    def _request_html(self, ticker: str):
        url = self._url + f'{ticker}/{self._endpoint}'
        response = requests.get(url, headers=self._headers)
        return response.text

    @staticmethod
    def _parse_period(soup: BeautifulSoup):
        row = soup.find('tr', class_='topRow')
        return [i.text for i in row.find_all('th', scope='col')][:-1]

    @staticmethod
    def _combine_data_with_period(data: dict, period: list):
        result = {key: {} for key in period}
        for n, item in enumerate(period):
            for key in data.keys():
                values = data[key][n]
                result[item].update({key: values})
        return result

    def _parse_html(self, html: str):
        data = dict()
        soup = BeautifulSoup(html, "html.parser")
        rows = soup.find_all('tr')
        for row in rows:
            if c := row.find('td', class_='rowTitle'):
                topic = c.text.strip()
                if topic in self._topics:
                    values = [i.text for i in row.find_all('td', class_='valueCell')]
                    data[topic] = values
        period = self._parse_period(soup)
        result = self._combine_data_with_period(data, period)
        return result, period

    def _get_one(self, ticker: str):
        html = self._request_html(ticker)
        return {ticker: self._parse_html(html)}

    def get_data(self):
        result = {}
        for ticker in self._tickers:
            result.update(self._get_one(ticker))
        return result
