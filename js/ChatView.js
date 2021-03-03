class ChatView {

    constructor(chat) {
        this.chat = chat
        this.btnSend = document.getElementById("btnSend")
        this.iptMessage = document.getElementById("iptMessage")
        this.ulMessages = document.getElementById("ulMessages")
        this.sltUsers = document.getElementById("sltUsers")
        this.btnClear = document.getElementById("btnClear")
        this.imgUserSelection = document.getElementById("imgUserSelection")

        this.iptMessage.addEventListener("keydown", event => this.onKeydown(event))
        this.btnSend.addEventListener("click", () => this.onSend())
        this.btnClear.addEventListener("click", () => this.onClear())
        this.sltUsers.addEventListener("change", event => this.onUserManualChange(event))

        //this will trigger messages and user rendering
        this.chat.observeMessages(messages => this.onMessagesChange(messages))
        this.chat.observeUser((users, userIndex) => this.onUserChange(users, userIndex))
        
        this.iptMessage.focus()
    }

    onKeydown(event) {
        if (event.key === "Enter") {
            this.onSend()
            return
        }
    
        if (event.key === "ArrowUp") {
            this.chat.prevUser()
            return
        }
    
        if (event.key === "ArrowDown") {
            this.chat.nextUser()
            return
        }
    }

    onClear() {
        let canDelete = confirm("Delete whole messages history?")
        if (canDelete)
            this.chat.clear()
    }

    onSend() {
        const message = this.iptMessage.value
    
        if (!message)
            return
    
        this.chat.sendMessage(message)
    }

    onMessagesChange(messages) {
        this.renderMessages(messages)
        this.clearMessageBox()
    }

    onUserChange(users, userIndex) {
        this.renderUsers(users)
        let user = users[userIndex]
        this.selectUser(userIndex, user)
    }

    onUserManualChange(event) {
        this.chat.selectUser(event.target.value)
    }

    renderUsers(users) {
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

    selectUser(userIndex, user) {
        this.imgUserSelection.src = user.pic
        this.sltUsers.value = userIndex
    }

}