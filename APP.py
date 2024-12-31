import streamlit as st
import requests
from PIL import Image
import json

# 1. Set the page configuration first
st.set_page_config(
    page_title="🔍 Material Analyzer",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded",
)

# 2. Inject custom CSS for enhanced and responsive styling
def inject_css():
    st.markdown(
        """
        <style>
        /* General Styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #F8F9FA;
        }

        /* Main Title */
        .css-1aumxhk {
            font-size: 3rem;
            color: #4B8BBE;
            text-align: center;
            margin-bottom: 10px;
        }

        /* Description Text */
        .css-1dq8tca {
            text-align: center;
            color: #6C757D;
            margin-bottom: 40px;
        }

        /* Sidebar Styling */
        .css-1d391kg {
            background-color: #F0F4F8;
            padding: 20px;
            border-radius: 10px;
        }

        /* File Uploader */
        .stFileUploader > label {
            font-size: 1.2rem;
            color: #4B8BBE;
            font-weight: bold;
        }

        /* Analyze Button */
        .css-1n76uvr {
            background-color: #4B8BBE;
            color: white;
            border-radius: 8px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        .css-1n76uvr:hover {
            background-color: #36739F;
        }

        /* Error Messages */
        .css-1lcbmhc {
            color: red;
            font-weight: bold;
        }

        /* Spinner Styling */
        .css-1q1n0ol {
            color: #4B8BBE;
            font-weight: bold;
        }

        /* Analysis Results Container */
        .css-1v0mbdj {
            background-color: #FFFFFF;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* JSON Expander */
        .css-1xp0ktu {
            background-color: #F8F9FA;
            border: 1px solid #E0E0E0;
            border-radius: 8px;
            padding: 10px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
            /* Adjust font sizes for medium screens */
            .css-1aumxhk {
                font-size: 2.5rem;
            }
            .css-1dq8tca {
                font-size: 1rem;
            }
            .css-1n76uvr {
                font-size: 0.9rem;
                padding: 8px 16px;
            }
        }

        @media (max-width: 768px) {
            /* Stack columns vertically on small screens */
            .stColumns > div {
                flex: 100%;
                max-width: 100%;
            }

            /* Adjust font sizes for smaller screens */
            .css-1aumxhk {
                font-size: 2rem;
            }
            .css-1dq8tca {
                font-size: 0.9rem;
            }
            .css-1n76uvr {
                font-size: 0.8rem;
                padding: 6px 12px;
            }
        }

        @media (max-width: 480px) {
            /* Further adjust for very small screens */
            .css-1aumxhk {
                font-size: 1.8rem;
            }
            .css-1dq8tca {
                font-size: 0.8rem;
            }
            .css-1n76uvr {
                font-size: 0.7rem;
                padding: 5px 10px;
            }
        }
        </style>
        """,
        unsafe_allow_html=True
    )

# Call the inject_css function to apply custom styles
inject_css()

# 3. Load Font Awesome for additional icons
st.markdown(
    """
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    """,
    unsafe_allow_html=True
)

# 4. Sidebar Content
with st.sidebar:
    st.header("ℹ️ **About**")
    st.markdown(
        """
        **Material Analyzer** uses AI to identify and analyze materials based on uploaded images.

        **How It Works**:
        1. **Upload** an image of the material.
        2. **Analyze** the image to extract details.
        3. **View** the results in an organized manner.

        **Supported Formats**: `.jpg`, `.jpeg`, `.png`
        """
    )
    st.markdown(
        """
        <hr>
        <p>Developed with ❤️ using <a href="https://streamlit.io/">Streamlit</a> and <a href="https://www.groq.com/">Groq API</a>.</p>
        """,
        unsafe_allow_html=True
    )

# 5. Title and Description
st.title("🔍 **Material Analyzer**")
st.markdown(
    """
    Upload an image of a material, and our AI-powered analyzer will identify its type, color, properties, and potential uses.
    """
)

# 6. File Uploader within a container for better organization
with st.container():
    uploaded_file = st.file_uploader("📥 **Choose an image...**", type=["jpg", "jpeg", "png"])

    # Define maximum image size (optional)
    MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB

    if uploaded_file is not None:
        # Check file size
        if len(uploaded_file.getvalue()) > MAX_IMAGE_SIZE:
            st.error("❌ **Image size exceeds the 5MB limit.**")
        else:
            # Display the uploaded image within columns for better layout
            col1, col2 = st.columns([1, 2])
            with col1:
                try:
                    image = Image.open(uploaded_file)
                    st.image(image, caption='📸 **Uploaded Image**', use_container_width=True)
                except Exception as e:
                    st.error("❌ **Error loading image. Please try a different file.**")
            
            with col2:
                st.markdown(
                    """
                    ### **Analysis Instructions**
                    - **Material**: The type of material (e.g., Felt, Steel).
                    - **Colour**: Predominant colours in the material.
                    - **Properties**: Characteristics of the material.
                    - **Uses**: Common applications of the material.
                    """
                )
            
            # Button to trigger analysis
            if st.button("🔍 **Analyze Image**"):
                with st.spinner("🧠 **Analyzing...**"):
                    try:
                        # Prepare the files payload
                        files = {"file": uploaded_file.getvalue()}

                        # Send POST request to FastAPI backend
                        response = requests.post("http://127.0.0.1:8000/analyze-image", files=files)

                        # Check if the request was successful
                        if response.status_code == 200:
                            data = response.json()

                            # Display the results within a container
                            with st.container():
                                st.subheader("📊 **Analysis Results**")
                                col1, col2 = st.columns(2)

                                with col1:
                                    st.markdown(f"**Material:** {data.get('Material', 'N/A')}")
                                    st.markdown(f"**Colour:** {data.get('Colour', 'N/A')}")

                                with col2:
                                    st.markdown(f"**Properties:** {data.get('Properties', 'N/A')}")
                                    st.markdown(f"**Uses:** {data.get('Uses', 'N/A')}")

                                # Display the JSON response in an expander
                                st.markdown("---")
                                with st.expander("📄 **View Detailed JSON Response**"):
                                    st.json(data)

                        else:
                            st.error(f"❌ **Error {response.status_code}:** {response.text}")

                    except requests.exceptions.RequestException as e:
                        st.error(f"⚠️ **An error occurred:** {e}")