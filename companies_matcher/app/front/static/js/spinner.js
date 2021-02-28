function createSpinner(id, elemId) {
    let placeForSpinner = document.getElementById(elemId);
    let divFirst = document.createElement("div");
    divFirst.className = "text-center";
    divFirst.id = id
    divFirst.style = "padding-top: 9%; padding-bottom: 9%"
    let divSecond = document.createElement("div");
    divSecond.className = "spinner-border";
    divSecond.style = "width: 4rem; height: 4rem;"
    divSecond.setAttribute("role", "status")
    let span = document.createElement("span");
    span.className = "sr-only";
    divSecond.append(span)
    divFirst.append(divSecond)
    placeForSpinner.append(divFirst)
}