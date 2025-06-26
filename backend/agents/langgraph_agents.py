import os
from langgraph.graph import StateGraph, END
from typing import TypedDict

from .gemini_call import ask_gemini
from .rag_utils import search_similar_patents

# Agent memory state structure
class AgentState(TypedDict):
    idea: str
    claims: str
    prior_art: str
    structured_claims: str
    draft: str
    filing_status: str

# Agent 1: Extract technical claims
def innovation_extractor(state: AgentState) -> AgentState:
    prompt = f"""You are an AI patent analyst. Extract key technical claims from this innovation idea:\n\n"{state['idea']}"\n\nList the claims clearly."""
    return {"claims": ask_gemini(prompt)}

# Agent 2: Search prior art using RAGfrom .gemini_call import ask_gemini
from .rag_utils import search_similar_patents

def prior_art_researcher(state: AgentState) -> AgentState:
    claims = state["claims"]
    idea = state["idea"]

    # Step 1: Search vector DB using the claims
    top_matches = search_similar_patents(claims, top_k=5)
    joined_matches = "\n\n".join(top_matches)

    # Step 2: Ask Gemini to filter and explain which are relevant
    prompt = f"""
You are a patent research expert. A user has submitted the following idea:

"{idea}"

And the extracted technical claims from the patent DB are:

{claims}

The following are potential prior art documents retrieved from a patent database:

{joined_matches}

Please do the following:
1. Identify which prior art entries (if any) closely match the claims or idea.
2. For each matched entry, summarize what it is and how it overlaps with the user's idea.
3. Ignore irrelevant entries.
4. Format your response as a bullet list of matches with explanation.
"""

    filtered_prior_art = ask_gemini(prompt)

    return {"prior_art": filtered_prior_art}


# Agent 3: Generate legal claims
def claim_generator(state: AgentState) -> AgentState:
    prompt = f"""Based on the following extracted claims:\n\n{state['claims']}\n\nAnd the following prior art:\n\n{state['prior_art']}\n\nGenerate a structured, legally sound set of patent claims."""
    return {"structured_claims": ask_gemini(prompt)}

# Agent 4: Draft full patent
def draft_writer(state: AgentState) -> AgentState:
    prompt = f"""
You are a patent lawyer with extensive experience in drafting patent applications for various technologies and inventions. Your expertise lies in creating comprehensive and submission-ready patent drafts that adhere to legal standards and format requirements.
Your task is to generate a full, submission-ready patent draft document based on structured claims. Please use the following format for the draft: 

Title: 
__________  
Abstract:
__________  
Field of the Invention: 
__________  
Background of the Invention:
 __________  
Summary of the Invention: 
__________  
Detailed Description:
__________  
Claims: 
__________  
Textual Description of Diagrams (optional): 
__________

Ensure that each section is clearly labeled and formatted in a neat manner, making it suitable for pre-filing and PDF generation. Avoid any special characters or formatting such as ** or #.
Based on these structured claims:

{state['structured_claims']}
    """
    return {"draft": ask_gemini(prompt)}

# Agent 5: Simulated filingimport datetime
import datetime
import json
from .pdf_utils import create_patent_pdf

def patent_filer(state: AgentState) -> AgentState:
    draft = state['draft']
    
    # Step 1: Create PDF
    pdf_path = create_patent_pdf(draft, filename="patent_preview.pdf")

    # Step 2: Mock filing metadata
    filing_id = "FAKE" + os.urandom(4).hex().upper()
    filing_info = {
        "filing_id": filing_id,
        "status": "submitted",
        "timestamp": datetime.datetime.now().isoformat(),
        "pdf_path": pdf_path
    }

    with open("filing_history.json", "a") as f:
        json.dump(filing_info, f)
        f.write("\n")

    return {
        "filing_status": "Patent submitted successfully to mock system ✅",
        "filing_id": filing_id,
        "pdf_path": pdf_path  # Optional: You can serve it in frontend
    }


# LangGraph setup
def get_patent_workflow():
    builder = StateGraph(AgentState)

    builder.add_node("extract_idea", innovation_extractor)
    builder.add_node("prior_art_search", prior_art_researcher)
    builder.add_node("generate_claims", claim_generator)
    builder.add_node("write_draft", draft_writer)
    builder.add_node("file_patent", patent_filer)

    builder.set_entry_point("extract_idea")
    builder.add_edge("extract_idea", "prior_art_search")
    builder.add_edge("prior_art_search", "generate_claims")
    builder.add_edge("generate_claims", "write_draft")
    builder.add_edge("write_draft", "file_patent")
    builder.set_finish_point("file_patent")

    return builder.compile()
