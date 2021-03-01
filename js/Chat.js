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

    notify() {
        this.messagesObservers.forEach(observer => observer(this.messages))
    }

}s