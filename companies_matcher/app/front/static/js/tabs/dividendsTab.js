function onTabClickListener() {
    let tickers = document.getElementById('input-tickers').value;
    let parsedTickers = parseTickers(tickers);
    console.log(parsedTickers);
}


function createDividendRow() {
    let table = document.getElementById('dividends-table');
    console.log(table);
    let tr = table.insertRow();
    tr.className = "table-cell simple-text";
    for (let i = 0; i < 4; i++) {
        let td = tr.insertCell();
        if (i<2) {
            let input = document.createElement('input');
            input.className = 'form-control';
            input.size = 1;
            td.append(input);
        }
    }
}