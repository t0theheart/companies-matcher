function parseTickers(tickers) {
    if (tickers) {
        return tickers.replace(/\s+/g, '').split(',').map((t) => t.toUpperCase());
    }
    return [];
}
