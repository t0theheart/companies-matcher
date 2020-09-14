from abc import ABC, abstractmethod


class ParserABC(ABC):

    @abstractmethod
    def _request_html(self, ticker: str) -> str: pass

    @abstractmethod
    def _parse_html(self, html: str) -> dict: pass

    def _get_one(self, ticker: str) -> dict:
        html = self._request_html(ticker)
        return {ticker: self._parse_html(html)}

    def get_data(self) -> dict:
        result = {}
        for ticker in self._tickers:
            result.update(self._get_one(ticker))
        return result

