from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.http import FileResponse
import os
from .langgraph_agents import get_patent_workflow

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .langgraph_agents import get_patent_workflow

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
            for step in agent.stream({"idea": idea}):
                step_responses.append(step)

            return JsonResponse({"steps": step_responses}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Only POST allowed"}, status=405)

def download_pdf(request):
    path = request.GET.get("path")
    abs_path = os.path.abspath(path)

    if not os.path.exists(abs_path):
        return JsonResponse({"error": "PDF not found"}, status=404)

    return FileResponse(open(abs_path, "rb"), content_type='application/pdf')