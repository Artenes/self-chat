class Chat {

    constructor(messagesStore, users) {
        this.users = users
        this.store = messagesStore
        this.messages = this.store.getMessages()
        this.messagesObservers = []
        this.userObservers = []
        this.currentUserIndex = 0
    }

    nextUser() {
        this.selectUser(this.currentUserIndex + 1)
    }

    prevUser() {
        this.selectUser(this.currentUserIndex - 1)
    }

    selectUser(index) {
        this.currentUserIndex = index;
        if (this.currentUserIndex < 0)
            this.currentUserIndex = this.users.length - 1
        else if (this.currentUserIndex >= this.users.length)
            this.currentUserIndex = 0
        this.notifyUserChange()
    }

    sendMessage(message) {
        let user = this.users[this.currentUserIndex]
        this.messages.push({
            user: user,
            text: message
        })
        this.store.saveMessages(this.messages)
        this.notifyMessageChange()
    }

    clear() {
        this.messages = []
        this.store.clearMessages()
        this.notifyMessageChange()
    }

    observeMessages(callback) {
        this.messagesObservers.push(callback)
        this.notifyMessageChange()
    }

    observeUser(callback) {
        this.userObservers.push(callback)
        this.notifyUserChange()
    }

    notifyMessageChange() {
        this.messagesObservers.forEach(observer => observer(this.messages))
    }

    notifyUserChange() {
        this.userObservers.forEach(observer => observer(this.users, this.currentUserIndex))
    }

}