async function clickCreateTableListener() {
    let tickers = parseTickers(document.getElementById("input-tickers").value);
    let multiplicators = getValuesFromPressedToggles("multiplicators-toggles");

    removeElemById("matching-multiplicators-table");
    createSpiner("matching-multiplicators-table-spiner", "matching-multiplicators");

    let result = await myFetch(
        "/multiplicators/match",
        "POST",
        {"tickers": tickers, "multiplicators": multiplicators},
        {"Content-Type": "application/json;charset=utf-8"},
        wrappedShowMessage('Companies tickers and multiplicators must be filled')
    )

    removeElemById("matching-multiplicators-table-spiner");

    if (!result) {
        return;
    }

    setCacheJson('matching_multiplicators', result);
    setCacheJson('multiplicators', multiplicators);
    setCacheJson('tickers', tickers);

    let table = createMultiplicatorsTable(result, tickers, multiplicators);
    table.setAttribute("isSwap", "false");
    createSwapHeadersButton();
}

function createMultiplicatorsTable(data, columnHeaders, rowHeaders) {
    let placeForTable = document.getElementById("matching-multiplicators");

    let oldTable = placeForTable.children[0];
    if (oldTable) {
        placeForTable.removeChild(oldTable);
    }

    let table = document.createElement("table");
    table.className = "table table-bordered";
    table.id = "matching-multiplicators-table";

    columnHeaders.unshift("#");

    let headersTr = table.insertRow();
    headersTr.className = "table-header";
    columnHeaders.forEach(function(item) {
        let td = headersTr.insertCell();
        td.innerHTML = item;
    });

    rowHeaders.forEach(function (rowHeader) {
        let tr = table.insertRow();
        columnHeaders.forEach(function (columnHeader, j) {
            let td = tr.insertCell();
            if (j === 0) {
                td.innerHTML = rowHeader;
                td.className = "table-header simple-text";
            } else {
                td.innerHTML = data[columnHeader][rowHeader];
                td.className = "table-cell simple-text"; // https://encycolorpedia.ru/10707f
            }
        });
    });
    placeForTable.append(table);
    return table;
}

function createSwapHeadersButton() {
    let placeForButton = document.getElementById("matching-multiplicators-buttons");
    let oldTable = placeForButton.children[1];
    if (!oldTable) {
        let button = document.createElement("button");
        button.className = "btn btn-primary simple-text";
        button.innerText = "Swap table headers";
        button.addEventListener("click", clickSwapHeadersListener);
        placeForButton.append(button);
    }
}

function clickSwapHeadersListener() {
    let multiplicators = getCacheJson("multiplicators");
    let data = getCacheJson("matching_multiplicators");
    let tickers = getCacheJson("tickers");
    let table = document.getElementById("matching-multiplicators-table");

    if (table.getAttribute("isSwap") === "false") {
        data = transformDataForSwap(data);
        let newTable = createMultiplicatorsTable(data, multiplicators, tickers);
        newTable.setAttribute("isSwap", "true");
    } else {
        let newTable = createMultiplicatorsTable(data, tickers, multiplicators);
        newTable.setAttribute("isSwap", "false");
    }
}

function transformDataForSwap(data) {
    let newData = {};
    let firstKeys = Object.keys(data);
    let secondKeys = Object.keys(data[firstKeys[0]]);

    secondKeys.forEach(function (key2) {
        let test = {};
        firstKeys.forEach(function (key1) {
            let value = data[key1][key2];
            test[key1] = value;
            newData[key2] = test;
        });
    });
    return newData;
}
