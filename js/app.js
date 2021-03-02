const messagesStore = new MessagesStore("messages")
const chat = new Chat(messagesStore, users)
const chatView = new ChatView(chat)