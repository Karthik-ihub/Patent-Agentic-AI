from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.http import FileResponse
import os
from .langgraph_agents import get_patent_workflow
from django.http import FileResponse, JsonResponse
import os
from django.conf import settings

@csrf_exempt
def run_patent_pipeline(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            idea = data.get("idea", "").strip()

            if not idea:
                return JsonResponse({"error": "Missing idea"}, status=400)

            # Get agent workflow
            agent = get_patent_workflow()

            # STREAM responses step by step
            step_responses = []
            final_state = {}
            for step in agent.stream({"idea": idea}):
                step_responses.append(step)
                final_state.update(step)  # Update with the latest state

            # Extract pdf_path from the final state
            pdf_path = final_state.get("file_patent", {}).get("pdf_path", "")

            return JsonResponse({
                "steps": step_responses,
                "pdf_path": pdf_path
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Only POST allowed"}, status=405)


def download_pdf(request):
    if request.method != "GET":
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)

    # Get the file path from query parameters
    file_path = request.GET.get("path")
    if not file_path:
        return JsonResponse({"error": "Missing file path"}, status=400)

    # Define the directory where PDFs are stored (e.g., settings.MEDIA_ROOT/patents)
    base_dir = os.path.join(settings.MEDIA_ROOT, "patents")
    
    # Construct the absolute path and prevent path traversal
    abs_path = os.path.abspath(os.path.join(base_dir, file_path))
    if not abs_path.startswith(base_dir):
        return JsonResponse({"error": "Invalid file path"}, status=400)

    # Validate file extension
    if not abs_path.endswith(".pdf"):
        return JsonResponse({"error": "Only PDF files are allowed"}, status=400)

    # Check if file exists
    if not os.path.exists(abs_path):
        return JsonResponse({"error": "PDF not found"}, status=404)

    try:
        # Open file and serve it as a download
        response = FileResponse(
            open(abs_path, "rb"),
            content_type="application/pdf",
            as_attachment=True,
            filename=os.path.basename(abs_path)
        )
        return response
    except IOError:
        return JsonResponse({"error": "Error reading the file"}, status=500)