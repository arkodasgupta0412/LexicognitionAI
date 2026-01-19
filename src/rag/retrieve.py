from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.documents import Document
from src.models import get_llm

def get_retriever(vectorstore, k=8): 
    return vectorstore.as_retriever(search_kwargs={"k": k})

def get_precise_references(question, retriever):
    """
    Fetches docs and distills them into ultra-short, crisp facts.
    """
    llm = get_llm()
    raw_docs = retriever.invoke(question)
    precise_docs = []
    seen_concepts = []

    template = """
    Extract the single most critical technical fact from this excerpt that answers: "{question}".
    
    STRICT RULES:
    1. Output ONE sentence only.
    2. Maximum 120 words.
    3. If the excerpt is irrelevant, output 'REDUNDANT'.
    4. Do not start with "The text states..." or "In this paper...". Just state the fact directly.
    5. Rephrase the excerpts by understanding the meaning instead of blindly copy-pasting.
    
    Seen Concepts: {seen_list}
    Excerpt: {content}
    """
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | llm | StrOutputParser()

    for doc in raw_docs:
        short_content = chain.invoke({
            "question": question, 
            "content": doc.page_content,
            "seen_list": seen_concepts
        }).strip()
        
        # Only add unique, relevant, and valid length facts
        if "REDUNDANT" not in short_content.upper() and len(short_content) > 10:
            precise_docs.append(Document(
                page_content=short_content,
                metadata=doc.metadata 
            ))
            seen_concepts.append(short_content)
        
        if len(precise_docs) >= 2: # Cap at 3 crisp references
            break
            
    return precise_docs