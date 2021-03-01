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