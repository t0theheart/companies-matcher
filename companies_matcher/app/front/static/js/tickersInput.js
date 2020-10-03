function parseTickers(tickers) {
    return tickers.replace(/\s+/g, '').split(',').map((t) => t.toUpperCase());
}

function tickersInputHandler(tickers){
    localStorage.setItem('tickers', parseTickers(tickers));
}