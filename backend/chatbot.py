import google.genai as genai
from google.genai import types
import os

def generate_response(user_message, system_prompt):
    # Correctly get the API key from the environment variable
    api_key = os.getenv('GEMINI_API_KEY')
    client = genai.Client(api_key=api_key)
    
    # Combine prompts
    full_prompt = f"{system_prompt}\n\nUser Question: {user_message}"
    
    # Set generation config to limit tokens
    config = types.GenerateContentConfig(max_output_tokens=256)
    
    # Generate response
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=full_prompt,
        config=config
    )
    return response.text