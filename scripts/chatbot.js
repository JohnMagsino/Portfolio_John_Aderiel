class Chatbot {
    constructor() {
        this.chatVisible = false;
        this.initElements();
        this.initEvents();
    }

    initElements() {
        this.toggleBtn = document.createElement('div');
        this.toggleBtn.className = 'chatbot-toggle';
        this.toggleBtn.innerHTML = '<i class="fas fa-robot"></i>';
        document.body.appendChild(this.toggleBtn);

        this.chatContainer = document.createElement('div');
        this.chatContainer.className = 'chatbot-container';
        this.chatContainer.innerHTML = `
            <div class="chatbot-header">
                <h3>Ask Me Anything</h3>
                <p>About my professional background</p>
            </div>
            <div class="chatbot-messages" id="chatMessages"></div>
            <div class="chatbot-input">
                <input type="text" id="chatInput" placeholder="Ask about my experience...">
                <button id="sendButton">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        document.body.appendChild(this.chatContainer);

        this.messagesContainer = document.getElementById('chatMessages');
        this.inputField = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
    }

    initEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.chatVisible = !this.chatVisible;
        this.chatContainer.classList.toggle('active', this.chatVisible);
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.inputField.value = '';

        try {
            const response = await this.getBotResponse(message);
            this.addMessage(response, 'bot');
        } catch (error) {
            this.addMessage("Sorry, I'm having trouble responding. Please try again later.", 'bot');
            console.error('Chatbot error:', error);
        }
    }

    async getBotResponse(message) {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});