async function setMultiplicatorsToggles() {
    let response = await fetch("/multiplicators/list", {
      method: "GET"
    });
    let multiplicatorsList = (await response.json()).result.multiplicators;

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

async function clickCreateTableListener() {
    removeElemById("matching-multiplicators-table")

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

    createTableSpiner()

    let response = await fetch("/multiplicators/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });

    let result = (await response.json()).result;

    removeElemById("matching-multiplicators-table-spiner")

    setCacheJson('matching_multiplicators', result)
    setCacheJson('multiplicators', multiplicators)
    setCacheJson('tickers', tickers)

    let table = createTable(result, tickers, multiplicators)
    table.setAttribute("isSwap", "false")
    createSwapHeadersButton()
}

function createTable(data, columnHeaders, rowHeaders) {
    let placeForTable = document.getElementById("matching-multiplicators");

    let oldTable = placeForTable.children[0]
    if (oldTable) {
        placeForTable.removeChild(oldTable)
    }

    let table = document.createElement("table");
    table.className = "table"
    table.id = "matching-multiplicators-table"

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
    return table;
}

function createSwapHeadersButton() {
    let placeForButton = document.getElementById("matching-multiplicators-buttons");
    let oldTable = placeForButton.children[1];
    if (!oldTable) {
        let button = document.createElement("button");
        button.className = "btn btn-primary"
        button.innerText = "Swap table headers"
        button.addEventListener("click", clickSwapHeadersListener)
        console.log(button)
        placeForButton.append(button)
        console.log(placeForButton)
    }
}

function clickSwapHeadersListener() {
    let multiplicators = getCacheJson("multiplicators")
    let data = getCacheJson("matching_multiplicators")
    let tickers = getCacheJson("tickers")
    let table = document.getElementById("matching-multiplicators-table");

    if (table.getAttribute("isSwap") === "false") {
        data = transformDataForSwap(data)
        let newTable = createTable(data, multiplicators, tickers)
        newTable.setAttribute("isSwap", "true")
    } else {
        let newTable = createTable(data, tickers, multiplicators)
        newTable.setAttribute("isSwap", "false")
    }
}


function transformDataForSwap(data) {
    let newData = {}
    let firstKeys = Object.keys(data)
    let secondKeys = Object.keys(data[firstKeys[0]])
    secondKeys.forEach(function (key2) {
        let test = {}
        firstKeys.forEach(function (key1) {
            let value = data[key1][key2]
            test[key1] = value
            newData[key2] = test
        })
    })

    return newData;
}


function setCacheJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getCacheJson(key) {
    let value = localStorage.getItem(key)
    return JSON.parse(value)
}


function createTableSpiner() {
    let placeForSpiner = document.getElementById("matching-multiplicators");
    let divFirst = document.createElement("div");
    divFirst.className = "text-center";
    divFirst.id = "matching-multiplicators-table-spiner"
    divFirst.style = "padding-top: 9%"
    let divSecond = document.createElement("div");
    divSecond.className = "spinner-border";
    divSecond.style = "width: 4rem; height: 4rem;"
    divSecond.setAttribute("role", "status")
    let span = document.createElement("span");
    span.className = "sr-only";
    divSecond.append(span)
    divFirst.append(divSecond)
    placeForSpiner.append(divFirst)
}

function removeElemById(id) {
    let elem = document.getElementById(id);
    if (elem) {
        elem.remove()
    }
}
