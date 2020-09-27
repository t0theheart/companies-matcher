from abc import ABC, abstractmethod


class ParserABC(ABC):

    @abstractmethod
    async def _request_html(self, ticker: str) -> str: pass

    @abstractmethod
    def _parse_html(self, html: str) -> dict: pass

    async def _get_one(self, ticker: str) -> dict:
        html = await self._request_html(ticker)
        return {ticker: self._parse_html(html)}

    async def get_data(self) -> dict:
        result = {}
        for ticker in self._tickers:
            print(ticker)
            result.update(await self._get_one(ticker))
        return result

