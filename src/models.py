import os
import base64
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_community.embeddings import HuggingFaceEmbeddings


load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def get_llm():
    """
    """
    if not OPENROUTER_API_KEY:
        raise ValueError("❌ OPENROUTER_API_KEY is missing. Check your .env file.")
        
    return ChatOpenAI(
        model="meta-llama/llama-3.3-70b-instruct",
        temperature=0.2,
        api_key=OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1"
    )

def get_embeddings():
    """
    Uses HuggingFaceEmbeddings (CPU).
    """
    return HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2", 
        model_kwargs={'device': 'cpu'}, 
        encode_kwargs={'normalize_embeddings': True}
    )

def describe_image(image_bytes):
    """
    Analyzes an image using **Gemini 1.5 Flash** via LangChain.
    """
    if not GOOGLE_API_KEY:
        print("⚠️ GEMINI_API_KEY missing. Skipping Vision.")
        return None

    try:
        # 1. Initialize Gemini via LangChain
        vision_model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=GOOGLE_API_KEY,
            temperature=0.1
        )

        # 2. Encode bytes to Base64 string for LangChain
        b64_string = base64.b64encode(image_bytes).decode("utf-8")

        # 3. Construct the Multimodal Message
        message = HumanMessage(
            content=[
                {
                    "type": "text", 
                    "text": """
                    You are a Research Paper Image Analyst.
                    1. CLASSIFY: Is this image a **Conceptual Diagram**, **Architecture**, **System Flow**, or **Graph**?
                    2. FILTER: If it is a purely decorative image, logo, or code snippet -> Return "IRRELEVANT".
                    3. DESCRIBE: Provide a dense technical explanation of the components and data flow logic.
                    """
                },
                {
                    "type": "image_url", 
                    "image_url": {"url": f"data:image/jpeg;base64,{b64_string}"}
                }
            ]
        )

        # 4. Invoke
        response = vision_model.invoke([message])
        content = response.content.strip()

        # 5. Filter
        if "IRRELEVANT" in content.upper() or len(content) < 20:
            return None
            
        return content

    except Exception as e:
        print(f"❌ Vision Error (Gemini): {e}")
        return None