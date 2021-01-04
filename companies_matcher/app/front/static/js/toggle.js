function createToggle(text) {
    let toggle = document.createElement('button');
    toggle.className = "btn btn-info toggle-in-list simple-text";
    toggle.type = "button";
    toggle.setAttribute("data-toggle", "button");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("autocomplete", "off");
    toggle.innerText = text;
    return toggle;
}

async function getAndCreateToggleList(endpoint, elementId) {
    let response = await fetch(endpoint, {
      method: "GET"
    });
    let result = (await response.json()).result;
    let toggles = document.getElementById(elementId);
    result.forEach(function(item) {
        let toggle = createToggle(item);
        toggles.append(toggle);
    });
}