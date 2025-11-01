from rest_framework.views import APIView
from rest_framework.response import Response
from .services.gemini_service import NahuatlChatbot

def get_chat_history(request):
    """Obtiene o inicializa el historial del chat en la sesión."""
    if 'history' not in request.session:
        request.session['history'] = []
    return request.session['history']

class ChatView(APIView):
    """Endpoint del chatbot YOLI."""

    def post(self, request):
        message = request.data.get('message')

        if not message:
            return Response({"error": "No se proporcionó mensaje"}, status=400)

        try:
            chatbot = NahuatlChatbot()
            history = get_chat_history(request)

            response_text, new_history = chatbot.send_message(message, history)

            request.session['history'] = new_history
            request.session.modified = True

            return Response({"response": response_text})

        except ValueError as e:
            return Response({"error": str(e)}, status=500)
        except Exception as e:
            print(f"Error interno: {e}")
            return Response({"error": "Error interno del chatbot"}, status=500)
