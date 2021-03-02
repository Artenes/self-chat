class Chat {

    constructor(messagesStore, users) {
        this.users = users
        this.store = messagesStore
        this.messages = this.store.getMessages()
        this.messagesObservers = []
        this.currentUserIndex = 0
    }

    nextUser() {
        this.currentUserIndex++
        if (this.currentUserIndex == this.users.length)
            this.currentUserIndex = 0

        return this.currentUserIndex
    }

    prevUser() {
        this.currentUserIndex--
        if (this.currentUserIndex < 0)
            this.currentUserIndex = this.users.length - 1

        return this.currentUserIndex
    }

    sendMessage(message) {
        let user = this.users[this.currentUserIndex]
        this.messages.push({
            user: user,
            text: message
        })
        this.store.saveMessages(this.messages)
        this.notify()
    }

    clear() {
        this.messages = []
        this.store.clearMessages()
        this.notify()
    }

    observeMessages(callback) {
        this.messagesObservers.push(callback)
        this.notify()
    }

    getUsers() {
        return this.users
    }

    notify() {
        this.messagesObservers.forEach(observer => observer(this.messages))
    }

}