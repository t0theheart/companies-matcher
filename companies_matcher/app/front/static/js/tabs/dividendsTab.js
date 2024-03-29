function createDividendRow() {
    let table = document.getElementById('dividends-table');
    let tr = table.insertRow();
    tr.className = "table-cell";
    for (let i = 0; i < 5; i++) {
        let td = tr.insertCell();
        if (i<2) {
            let input = document.createElement('input');
            input.className = 'form-control';
            input.size = 1;
            td.append(input);
        }
        if (i === 4) {
            let button = document.createElement('button');
            button.className = 'btn btn-danger';
            button.innerText = 'X';
            button.onclick = deleteRow;
            button.hidden = false;
            td.append(button);
            let span = document.createElement("span");
            span.className = "spinner-border m-1";
            span.hidden = true;
            td.append(span);
        }
    }
}

function deleteRow(event) {
    let row = event.originalTarget.parentElement.parentElement;
    let tableBody = row.parentElement;
    tableBody.removeChild(row)
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
    turnOnSpinners(true)
    let result = await myFetch(
        "/dividends/match",
        "POST",
        {"dividends": getDataFromDividendsTable('dividends-table')},
        {"Content-Type": "application/json;charset=utf-8"},
        wrappedShowMessage('All field must be filled')
    )
    if (!!result) {
        insertDividendsToTable(result)
    }
    turnOnSpinners(false)
}

function insertDividendsToTable(data) {
    let table = document.getElementById('dividends-table');
    let rows = table.rows;
    data.forEach(function (item) {
        for (let i = 1; i < table.rows.length; i++) {
            if (rows[i].cells[0].children[0].value === item['ticker']) {
                rows[i].cells[2].innerHTML = item['dividends']
                rows[i].cells[3].innerHTML =item['total']
                rows[i].cells[2].className = "table-cell simple-text";
                rows[i].cells[3].className = "table-cell simple-text";
            }
        }
    })
}

function turnOnSpinners(turnOn) {
    let table = document.getElementById('dividends-table');
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        rows[i].cells[4].children[0].hidden = turnOn
        rows[i].cells[4].children[1].hidden = !turnOn
    }
}