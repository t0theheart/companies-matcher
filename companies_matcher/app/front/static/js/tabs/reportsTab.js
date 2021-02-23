async function clickCreateReportsTableListener() {
    let tickers = parseTickers(document.getElementById("input-tickers").value);
    let incomeTopics = getValuesFromPressedToggles("income-toggles");
    let balanceTopics = getValuesFromPressedToggles("balance-toggles");
    let cashTopics = getValuesFromPressedToggles("cash-toggles");

    removeElemById("matching-reports-table");

    let reports = [];
    if (incomeTopics.length > 0) {
        reports.push("income")
    }
    if (balanceTopics.length > 0) {
        reports.push("balance-sheet")
    }
    if (incomeTopics.length > 0) {
        reports.push("cash-flow")
    }

    let topics = incomeTopics.concat(balanceTopics.concat(cashTopics))

    createSpiner("matching-reports-table-spiner", "matching-reports");

    let result = await myFetch(
        "/reports/match",
        "POST",
        {"tickers": tickers, "topics": topics, "reports": reports},
        {"Content-Type": "application/json;charset=utf-8"},
        wrappedShowMessage('Companies tickers and any reports topics must be filled')
    )

    removeElemById("matching-reports-table-spiner");

    if (!result) {
        return;
    }

    createReportsTable(result.data, tickers, topics, result.period);

}

function createReportsTable(data, mainRowHeaders, childRowHeaders, columnHeaders) {
    let placeForTable = document.getElementById("matching-reports");

    let oldTable = placeForTable.children[0];
    if (oldTable) {
        placeForTable.removeChild(oldTable);
    }

    let table = document.createElement("table");
    table.className = "table table-bordered";
    table.id = "matching-reports-table";
    table.coloredCells = {};

    columnHeaders.unshift("Topics");
    columnHeaders.unshift("Companies");

    let headersTr = table.insertRow();
    headersTr.className = "table-header";
    columnHeaders.forEach(function(item) {
        let td = headersTr.insertCell();
        td.innerHTML = item;
    });

    mainRowHeaders.forEach(function (mainRowHeader) {
        childRowHeaders.forEach(function (childRowHeader, childRowHeaderNum) {
            let tr = table.insertRow();
            columnHeaders.forEach(function (columnHeader, columnHeaderNum) {
                let td = tr.insertCell();
                td.addEventListener("click",clickReportsTableCellListener);
                if (columnHeaderNum === 0 ) {
                    td.className = "table-header simple-text";
                    if (childRowHeaderNum === 0) {
                        td.innerHTML = mainRowHeader;
                    }
                }
                else if (columnHeaderNum === 1) {
                    td.innerHTML = childRowHeader;
                    td.className = "table-header simple-text";
                } else {
                    if (data[mainRowHeader][columnHeader]) {
                        td.innerHTML = data[mainRowHeader][columnHeader][childRowHeader];
                    }
                    td.className = "table-cell simple-text";
                }
            });
        });
    });
    placeForTable.append(table);
}

function clickReportsTableCellListener(event) {
    let columnIndex = event.originalTarget.cellIndex;
    if (columnIndex < 2) {
        return;
    }
    let topic = event.originalTarget.parentElement.children[1].innerText;
    let table = event.originalTarget.offsetParent;

    if (table.coloredCells.columnIndex) {
        changeCellsColorInReportsTable(table, table.coloredCells.columnIndex, table.coloredCells.topic, "table-cell simple-text") ;
    }

    if (table.coloredCells.columnIndex === columnIndex && table.coloredCells.topic === topic) {
        changeCellsColorInReportsTable(table, columnIndex, topic, "table-cell simple-text");
        table.coloredCells = {};
    } else {
       changeCellsColorInReportsTable(table, columnIndex, topic, "colored-table-cell simple-text");
       table.coloredCells = {
           columnIndex: columnIndex,
           topic: topic
        };
    }
}


function changeCellsColorInReportsTable(table, columnIndex, topic, style) {
    let rows = table.children[0].children;
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells
        if (cells[1].innerText === topic) {
            cells[columnIndex].className = style
        }
    }
}