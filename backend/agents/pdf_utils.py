from fpdf import FPDF
import os

def create_patent_pdf(draft_text: str, filename: str = "patent_preview.pdf") -> str:
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for line in draft_text.split("\n"):
        if line.strip() == "":
            pdf.ln(4)
        else:
            pdf.multi_cell(0, 10, line)

    path = os.path.join(os.path.dirname(__file__), filename)
    pdf.output(path)
    return path
