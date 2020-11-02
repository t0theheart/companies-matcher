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
};

function createToggle(name) {
    let toggle = document.createElement('button');
    toggle.className = "btn btn-info toggle-multiplicator";
    toggle.type = "button";
    toggle.setAttribute("data-toggle", "button");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("autocomplete", "off");
    toggle.innerText = name;
    return toggle;
};

function clickShowTableListener() {
    let multiplicators = [];
    let toggles = document.getElementById('multiplicators-toggles').childNodes;

    toggles.forEach(function(item){
        if (item.getAttribute("aria-pressed") === "true") {
            multiplicators.push(item.innerText)
        }
    });
    console.log(multiplicators)
}

