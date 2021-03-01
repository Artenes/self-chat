class MessagesStore {

    constructor(key) {
        this.key = key
    }

    getMessages() {
        let messages = localStorage.getItem(this.key)
        return messages ? JSON.parse(messages) : []
    }

    saveMessages(messages) {
        localStorage.setItem(this.key, JSON.stringify(messages))
    }

    clearMessages() {
        localStorage.removeItem(this.key)
    }

}

class Chat {

    constructor() {
        this.store = new MessagesStore()
        this.messages = this.store.getMessages()
        this.messagesObservers = []
    }

    sendMessage(user, message) {
        this.messages.push({
            user: user,
            text: message
        })
        this.store.saveMessages(this.messages)
        this.messagesObservers.forEach(observer => observer(this.messages))
    }

    clear() {
        this.store.clearMessages()
    }

    observeMessages(callback) {
        this.messagesObservers.push(callback)
        callback(this.messages)
    }

}

const messagesStore = new MessagesStore("messages")
const chat = new Chat()

const users = [{name: "Sonia", pic: "http://sprites-inc.co.uk/files/Starforce/MainCharacters/Sonia.png"}, {name: "Luna", pic: "http://sprites-inc.co.uk/files/Starforce/MainCharacters/Luna.png"}]
var selectedUser = 0
const btnSend = document.getElementById("btnSend")
const iptMessage = document.getElementById("iptMessage")
const ulMessages = document.getElementById("ulMessages")
const sltUsers = document.getElementById("sltUsers")
const btnClear = document.getElementById("btnClear")

function renderUsers() {
    sltUsers.innerHTML = ''
    users.forEach(function (user, index) {
        const optionNode = document.createElement("option")
        const textUser = document.createTextNode(user.name)
        optionNode.value = index
        optionNode.appendChild(textUser)
        sltUsers.appendChild(optionNode)
    })
}

function saveMessage(user, message) {
    chat.sendMessage(user, message)
}

function clearMessages() {
    chat.clear()
}

function renderMessages(messages) {
    ulMessages.innerHTML = ''
    messages.forEach(function(message) {
        const imgUser = document.createElement("img")
        const liMessage = document.createElement("li")
        const spanContainer = document.createElement("div")
        const textMessage = document.createTextNode(message.text)
        imgUser.src = message.user.pic
        spanContainer.appendChild(textMessage)
        liMessage.appendChild(imgUser)
        liMessage.appendChild(spanContainer)
        ulMessages.appendChild(liMessage)
    })
    window.scrollTo(0, document.body.scrollHeight)
}

function clearMessageBox() {
    iptMessage.value = ""
}

iptMessage.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage()
        return
    }

    if (event.key === "ArrowUp") {
        selectedUser--
        if (selectedUser < 0) {
            selectedUser = users.length - 1
        }
        sltUsers.value = selectedUser
    }

    if (event.key === "ArrowDown") {
        selectedUser++
        if (selectedUser >= users.length) {
            selectedUser = 0
        }
        sltUsers.value = selectedUser
    }
})

btnSend.addEventListener("click", sendMessage);

btnClear.addEventListener("click", clearMessages)

function sendMessage() {
    const message = iptMessage.value
    const user = users[sltUsers.value]

    if (!message)
        return

    saveMessage(user, message)
}

renderUsers()
iptMessage.focus()

chat.observeMessages(messages => {
    renderMessages(messages)
    clearMessageBox()
})