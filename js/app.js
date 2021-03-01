const messagesStore = new MessagesStore("messages")
const chat = new Chat()
const chatView = new ChatView(chat)

chatView.renderUsers()