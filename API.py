from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import base64
from groq import Groq
import imghdr
import logging
import os
from dotenv import load_dotenv
import json

app = FastAPI(title="Image Analysis Wrapper API")

# Load environment variables from .env
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Groq client with API key from environment variable
api_key = os.getenv("GROQ_API_KEY")# Replace with your actual API key or set as environment variable
if not api_key:
    logger.error("GROQ_API_KEY environment variable not set.")
    raise Exception("GROQ_API_KEY environment variable not set.")

client = Groq(api_key=api_key)

def encode_image_to_data_url(image_bytes: bytes, image_type: str) -> str:
    """Encodes image bytes to a Data URL."""
    encoded_str = base64.b64encode(image_bytes).decode('utf-8')
    return f"data:image/{image_type};base64,{encoded_str}"

@app.post("/analyze-image", response_class=JSONResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Endpoint to upload an image and receive its analysis in JSON format.

    - **file**: Image file to be analyzed.
    """
    # Validate the uploaded file is an image
    try:
        header = await file.read(512)
        image_type = imghdr.what(None, h=header)
        await file.seek(0)  # Reset file pointer after reading
        if image_type is None:
            logger.error("Uploaded file is not a valid image.")
            raise HTTPException(status_code=400, detail="Invalid image file.")
    except Exception as e:
        logger.exception("Error during image validation.")
        raise HTTPException(status_code=400, detail="Could not process the image.") from e

    # Read image bytes
    try:
        image_bytes = await file.read()
    except Exception as e:
        logger.exception("Error reading image bytes.")
        raise HTTPException(status_code=400, detail="Could not read the image file.") from e

    # Encode image to Data URL
    try:
        data_url = encode_image_to_data_url(image_bytes, image_type)
    except Exception as e:
        logger.exception("Error encoding image to Data URL.")
        raise HTTPException(status_code=500, detail="Error encoding image.") from e

    # Prepare the message content
    Input_Prompt = """
    Here is an image of a material, now you have to, Identify the type of the material,
    colour, properties and where it can be used and respond in a JSON format.
    Output = {
        "Material": "Material Type",
        "Colour": "Colour",
        "Properties": "Properties",
        "Uses": "Potential Uses"
    }
    When it comes to Properties, think about the characteristics of the material and provide a brief description.
    Respond with the JSON output.
    """
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (Input_Prompt)
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": data_url
                    }
                }
            ]
        }
    ]

    try:
        # Create completion using Groq client
        completion = client.chat.completions.create(
            model="llama-3.2-90b-vision-preview",
            messages=messages,
            temperature=1,
            max_tokens=4192,
            top_p=1,
            stream=False,
            response_format={"type": "json_object"},
            stop=None,
        )

        # Extract the message from the completion
        response = completion.choices[0].message

        # Log the raw response for debugging
        logger.info(f"Groq API Raw Response: {response}")

        # Convert the response to a dictionary
        if hasattr(response, 'to_dict'):
            response_dict = response.to_dict()
        else:
            # Manually extract relevant attributes
            response_dict = {
                "role": response.role,
                "content": response.content
            }

        # Log the serialized response
        logger.info(f"Serialized Response: {response_dict}")

        # If the content is a string (JSON), parse it
        if isinstance(response_dict.get("content"), str):
            try:
                response_json = json.loads(response_dict["content"])
                logger.info(f"Parsed JSON Response: {response_json}")
                return JSONResponse(content=response_json)
            except json.JSONDecodeError:
                logger.error("Groq API response content is not valid JSON.")
                raise HTTPException(status_code=500, detail="Groq API did not return valid JSON.")
        elif isinstance(response_dict.get("content"), dict):
            # If already a dictionary, return as is
            return JSONResponse(content=response_dict["content"])
        else:
            logger.error("Unexpected format of Groq API response content.")
            raise HTTPException(status_code=500, detail="Unexpected format of Groq API response.")

    except Exception as e:
        logger.exception("Error processing the image with Groq API.")
        raise HTTPException(status_code=500, detail="Error processing the image with Groq API.") from e