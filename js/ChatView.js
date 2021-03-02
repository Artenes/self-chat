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

        //this will trigger messages rendering
        this.chat.observeMessages(messages => this.onMessagesChange(messages))
        
        this.renderUsers(this.chat.getUsers())
        this.iptMessage.focus()
    }

    onKeydown(event) {
        if (event.key === "Enter") {
            this.onSend()
            return
        }
    
        if (event.key === "ArrowUp") {
            this.sltUsers.value = this.chat.prevUser()
            this.imgUserSelection.src = this.chat.getUser().pic
            return
        }
    
        if (event.key === "ArrowDown") {
            this.sltUsers.value = this.chat.nextUser()
            this.imgUserSelection.src = this.chat.getUser().pic
            return
        }
    }

    onClear() {
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

    renderUsers(users) {
        this.sltUsers.innerHTML = ''
        users.forEach((user, index) => {
            const optionNode = document.createElement("option")
            const textUser = document.createTextNode(user.name)
            optionNode.value = index
            optionNode.appendChild(textUser)
            this.sltUsers.appendChild(optionNode)
        })
        this.imgUserSelection.src = this.chat.getUser().pic
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