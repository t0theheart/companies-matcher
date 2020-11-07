const MessageContainerId = "message-container";
const MessageTimeout = 3200;

function showMessage(messageText) {

    function deleteMessageHandler() {
        let button = message.children[0];
        button.click();
    }

    let message = document.createElement('div');
    message.className = 'alert alert-danger alert-dismissible fade show';
    message.innerHTML = `${messageText}<button type="button" class="close" data-dismiss="alert">×</button>`;
    let place = document.getElementById(MessageContainerId);
    place.append(message)

    setTimeout(deleteMessageHandler, MessageTimeout)
}

function createMessagesContainer() {
    let container = document.createElement('div');
    container.id = MessageContainerId;
    container.style.cssText = 'position: fixed; bottom: 15px; right: 15px; width: 350px;';
    document.body.appendChild(container);
}