from flask import Flask, request, jsonify
from chatbot import generate_response
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = Flask(__name__)

# Strict prompt engineering to keep responses focused
SYSTEM_PROMPT = """
You are a professional chatbot representing John Aderiel Magsino. 
Your purpose is to answer questions about John's:
- Professional experience
- Technical skills
- Education
- Projects
- Certifications

You must:
1. Respond in a professional tone matching John's communication style
2. Only answer questions related to John's professional background
3. For unrelated questions, politely decline to answer
4. Keep responses concise (1-2 paragraphs maximum)
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
            
        # Generate response using Gemini
        response = generate_response(
            user_message=user_message,
            system_prompt=SYSTEM_PROMPT
        )
        
        return jsonify({'response': response})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)