import google.generativeai as genai
import os

def generate_response(user_message, system_prompt):
    # Configure with your API key (use environment variable in production)
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    
    # Initialize model
    model = genai.GenerativeModel('gemini-pro')
    
    # Combine prompts
    full_prompt = f"{system_prompt}\n\nUser Question: {user_message}"
    
    # Generate response
    response = model.generate_content(full_prompt)
    
    return response.text