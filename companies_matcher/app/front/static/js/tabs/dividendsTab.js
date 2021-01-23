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

function getDataFromDividendsTable() {
    let data = [];
    let keys = {0: 'ticker', 1: 'amount'}
    let table = document.getElementById('dividends-table');
    let rows = table.rows;
    for (let i = 1; i < table.rows.length; i++) {
        let obj = {};
        for (let j = 0; j < 2; j++) {
            obj[keys[j]] = rows[i].cells[j].children[0].value
        }
        data.push(obj);
    }
    return data;
}


async function clickGetDividendsInfoListener() {
    let data = getDataFromDividendsTable('dividends-table');
    console.log(data);

    let body = {
        "dividends": data,
    };

    let response = await fetch("/dividends/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
}