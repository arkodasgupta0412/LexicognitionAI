from .ingest import load_and_chunk_pdf
from .store import store_embeddings
from .retrieve import get_retriever

def create_retriever_pipeline(uploaded_file, file_name=None, enable_vision=True):
    """ 
    Full RAG pipeline: Ingest -> Store -> Retrieve 
    Args:
        uploaded_file: Path or file object.
        file_name: Original filename (string) to fix metadata.
    """

    # 1. Ingest & Chunk (Pass file_name to fix metadata)
    chunks, debug_file_path = load_and_chunk_pdf(uploaded_file, original_filename=file_name, enable_vision=enable_vision)

    print(f"DEBUG: Chunks written to: {debug_file_path}")
    
    # 2. Embed & Store
    vectorstore = store_embeddings(chunks)
    
    # 3. Return Retriever
    return get_retriever(vectorstore)