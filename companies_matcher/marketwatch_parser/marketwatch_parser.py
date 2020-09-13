from bs4 import BeautifulSoup
import requests


class MarketwatchParser:
    def __init__(self, url: str, headers: dict):
        self._page = None
        self._url = url
        self._headers = headers

    @staticmethod
    def _parse_period(soup: BeautifulSoup):
        row = soup.find('tr', class_='topRow')
        return [i.text for i in row.find_all('th', scope='col')][:-1]

    def _request_html(self, ticker: str, endpoint: str):
        url = self._url + f'{ticker}/{endpoint}'
        page = requests.get(url, headers=self._headers)
        self._page = page

    def _parse_html(self, topics: list):
        result = dict()
        soup = BeautifulSoup(self._page.text, "html.parser")
        rows = soup.find_all('tr')

        for row in rows:
            if c := row.find('td', class_='rowTitle'):
                topic = c.text.strip()
                if topic in topics:
                    values = [i.text for i in row.find_all('td', class_='valueCell')]
                    result[topic] = values

        period = self._parse_period(soup)

        din = {key: {} for key in period}
        for n, item in enumerate(period):
            for key in result.keys():
                values = result[key][n]
                din[item].update({key: values})

        return din

    def get_data(self, topics: list):
        return self._parse_html(topics)
