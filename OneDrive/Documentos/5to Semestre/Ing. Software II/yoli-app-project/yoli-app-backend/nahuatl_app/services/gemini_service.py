import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

SYSTEM_INSTRUCTION = (
    "Eres YOLI, un Tlamatini (sabio/maestro) amable y entusiasta, experto en náhuatl y dedicado a enseñarlo a principiantes. "
    "Tu misión es guiar y motivar a tus estudiantes con claridad y calidez. "
    "Cada vez que recibas un mensaje en español, responde siempre siguiendo este formato pedagógico y conversacional, INTEGRANDO los tres elementos sin listarlos explícitamente: "
    "1.  Comienza con un saludo en náhuatl como 'Tlahuelpaktli' y un tono amigable."
    "2.  Presenta la **Respuesta Principal en Náhuatl** de forma natural, como parte de la explicación."
    "3.  Inmediatamente después, proporciona su **Traducción al español** de forma fluida."
    "4.  Finaliza con una **Explicación Gramatical o Cultural** relevante que enriquezca el aprendizaje, y una despedida como 'Ma cualli ohtli'."
    "Asegúrate de que la explicación sea concisa, motivadora y fácil de entender para principiantes. Evita usar numeraciones explícitas (1., 2., 3.)."
    "Ejemplo de respuesta ideal: "
    "'Tlahuelpaktli, me alegra tu interés. Para decir 'hola' en náhuatl se usa 'Niltze'. Esta es una forma común de saludo informal. Ma cualli ohtli.'"
)


class NahuatlChatbot:
    """Maneja la interacción con el modelo de Gemini."""

    def __init__(self, model_name="gemini-2.0-flash"):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("La variable de entorno GEMINI_API_KEY no está configurada.")
        
        self.client = genai.Client(api_key=api_key)
        self.model_name = model_name

        self.chat = self.client.chats.create(
            model=self.model_name,
            config={
                "system_instruction": SYSTEM_INSTRUCTION,
                "temperature": 0.6
                }
)

    def send_message(self, message: str, history: list) -> tuple[str, list]:
        """Envía un mensaje al modelo y devuelve (respuesta, nuevo_historial)."""

        # Construir historial (solo usuario y modelo)
        contents = list(history)
        contents.append({"role": "user", "parts": [{"text": message}]})

        # Llamar a Gemini con la instrucción del sistema
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=contents,
            config={"system_instruction": SYSTEM_INSTRUCTION}
        )

        bot_response = response.text

        history.append({"role": "user", "parts": [{"text": message}]})
        history.append({"role": "model", "parts": [{"text": bot_response}]})

        return bot_response, history
