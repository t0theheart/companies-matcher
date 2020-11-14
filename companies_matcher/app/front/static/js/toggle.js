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