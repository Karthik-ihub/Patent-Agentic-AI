import faiss
import pickle
from sentence_transformers import SentenceTransformer
from typing import List
import os

# Load FAISS and metadata
FAISS_INDEX_PATH = os.path.join(os.path.dirname(__file__), "index.faiss")
METADATA_PATH = os.path.join(os.path.dirname(__file__), "metadata.pkl")

model = SentenceTransformer("all-MiniLM-L6-v2")

def search_similar_patents(query: str, top_k: int = 5) -> List[str]:
    # Load FAISS index
    index = faiss.read_index(FAISS_INDEX_PATH)
    
    # Load metadata
    with open(METADATA_PATH, "rb") as f:
        metadata = pickle.load(f)

    # Embed query
    query_embedding = model.encode([query])
    
    # Search
    distances, indices = index.search(query_embedding, top_k)
    
    # Return matched texts
    return [metadata[idx] for idx in indices[0] if idx < len(metadata)]
