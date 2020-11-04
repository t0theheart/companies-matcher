function setMultiplicatorsToggles() {
    let multiplicatorsList = [
        "Market Cap", "Book/sh", "Cash/sh", "Recom", "P/E", "Forward P/E", "PEG", "P/S", "P/B", "P/C", "P/FCF",
        "Quick Ratio", "Current Ratio", "Debt/Eq", "LT Debt/Eq", "ROA", "ROE", "ROI", "Gross Margin",
        "Oper. Margin", "Profit Margin", "Beta"
    ];

    let toggles = document.getElementById('multiplicators-toggles');

    multiplicatorsList.forEach(function(item) {
        let toggle = createToggle(item);
        toggles.append(toggle);
    });
}

function createToggle(name) {
    let toggle = document.createElement('button');
    toggle.className = "btn btn-info toggle-multiplicator";
    toggle.type = "button";
    toggle.setAttribute("data-toggle", "button");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("autocomplete", "off");
    toggle.innerText = name;
    return toggle;
}

async function clickShowTableListener() {
    let multiplicators = [];
    let tickers = parseTickers(document.getElementById("input-tickers").value);
    let toggles = document.getElementById("multiplicators-toggles").childNodes;
    toggles.forEach(function(item){
        if (item.getAttribute("aria-pressed") === "true") {
            multiplicators.push(item.innerText)
        }
    });

    let body = {
        "tickers": tickers,
        "multiplicators": multiplicators
    };

    let response = await fetch("/matching/multiplicators", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });

    let result = (await response.json()).result;
    createTable(result, tickers, multiplicators)
}

function createTable(data, columnHeaders, rowHeaders) {
    let placeForTable = document.getElementById("matching-multiplicators");

    let table = document.createElement("table");
    table.className = "table"

    columnHeaders.unshift("#")

    let headersTr = table.insertRow()
    columnHeaders.forEach(function(item) {
        let td = headersTr.insertCell()
        td.innerHTML = item
    });

    rowHeaders.forEach(function (rowHeader, i) {
        let tr = table.insertRow()
        columnHeaders.forEach(function (columnHeader, j) {
            let td = tr.insertCell()
            if (j === 0) {
                td.innerHTML = rowHeader
            } else {
                td.innerHTML = data[columnHeader][rowHeader]
            }
        })
    })

   placeForTable.append(table)
}