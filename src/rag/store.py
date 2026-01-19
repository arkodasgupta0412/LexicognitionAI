from langchain_chroma import Chroma
import src.models as models

def store_embeddings(chunks):
    """
    Stores 'Atomic Propositions' in ChromaDB (Persistent).
    """
    embeddings = models.get_embeddings()
    
    # Chroma is better for metadata filtering (e.g., filter by Page Number)
    vectorstore = Chroma.from_documents(
        documents=chunks, 
        embedding=embeddings,
        collection_name="lexicognition_viva_index"
    )
    return vectorstore