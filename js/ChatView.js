const users = [{name: "Sonia", pic: "http://sprites-inc.co.uk/files/Starforce/MainCharacters/Sonia.png"}, {name: "Luna", pic: "http://sprites-inc.co.uk/files/Starforce/MainCharacters/Luna.png"}]
var selectedUser = 0

class ChatView {

    constructor(chat) {
        this.chat = chat
        this.btnSend = document.getElementById("btnSend")
        this.iptMessage = document.getElementById("iptMessage")
        this.ulMessages = document.getElementById("ulMessages")
        this.sltUsers = document.getElementById("sltUsers")
        this.btnClear = document.getElementById("btnClear")

        this.iptMessage.addEventListener("keydown", event => this.onKeydown(event))
        this.btnSend.addEventListener("click", () => this.onSend())
        this.btnClear.addEventListener("click", () => this.onClear())

        this.chat.observeMessages(messages => this.onMessagesChange(messages))

        this.iptMessage.focus()
    }

    onKeydown(event) {
        if (event.key === "Enter") {
            this.onSend()
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
    }

    onClear() {
        this.chat.clear()
    }

    onSend() {
        const message = this.iptMessage.value
        const user = users[this.sltUsers.value]
    
        if (!message)
            return
    
        this.chat.sendMessage(user, message)
    }

    onMessagesChange(messages) {
        this.renderMessages(messages)
        this.clearMessageBox()
    }

    renderUsers() {
        this.sltUsers.innerHTML = ''
        users.forEach((user, index) => {
            const optionNode = document.createElement("option")
            const textUser = document.createTextNode(user.name)
            optionNode.value = index
            optionNode.appendChild(textUser)
            this.sltUsers.appendChild(optionNode)
        })
    }

    renderMessages(messages) {
        this.ulMessages.innerHTML = ''
        messages.forEach((message) => {
            const imgUser = document.createElement("img")
            const liMessage = document.createElement("li")
            const spanContainer = document.createElement("div")
            const textMessage = document.createTextNode(message.text)
            imgUser.src = message.user.pic
            spanContainer.appendChild(textMessage)
            liMessage.appendChild(imgUser)
            liMessage.appendChild(spanContainer)
            this.ulMessages.appendChild(liMessage)
        })
        window.scrollTo(0, document.body.scrollHeight)
    }

    clearMessageBox() {
        this.iptMessage.value = ""
    }

}