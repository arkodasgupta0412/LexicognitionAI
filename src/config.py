import os
from dotenv import load_dotenv

load_dotenv()

# We use OpenRouter for the LLM (Llama 70B) 
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
LLAMA_CLOUD_API_KEY = os.getenv("LLAMA_CLOUD_API_KEY")

if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY is missing. Get one at openrouter.ai")