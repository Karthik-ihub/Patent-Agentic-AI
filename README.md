
# Patent Filing Assistant

The Patent Filing Assistant is a tool designed to help users transform their innovative ideas into patent applications. It uses a multi-agent workflow to extract technical claims, search for prior art, generate legal claims, draft the patent, and simulate the filing process.

## Features

- Extracts key technical claims from innovation ideas.
- Searches for prior art using a vector database.
- Generates structured, legally sound patent claims.
- Drafts full patent applications.
- Simulates the patent filing process.

## Setup

### Prerequisites

- Python 3.8 or higher
- Node.js and npm (for the frontend)
- Google API Key for Gemini integration
- FAISS and Sentence Transformers for prior art search

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd patent-filing-assistant
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install the required Python packages:

```bash
pip install -r requirements.txt
```

4. Install the required Node.js packages:

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Google API key:

```plaintext
GOOGLE_API_KEY=your_google_api_key
```

## Usage

### Running the Backend

1. Navigate to the project directory:

```bash
cd patent-filing-assistant
```

2. Run the Django server:

```bash
python manage.py runserver
```

### Running the Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Start the development server:

```bash
npm start
```

### Accessing the Application

Open your web browser and navigate to `http://localhost:3000` to access the Patent Filing Assistant.

## Project Structure

- `backend/`: Contains the Django backend code.
- `frontend/`: Contains the React frontend code.
- `langgraph_agents/`: Contains the agent workflow and utility functions.
- `gemini_call/`: Contains the Gemini API integration.
- `rag_utils/`: Contains the prior art search utilities.
- `pdf_utils/`: Contains the PDF generation utilities.

## API Endpoints

- `POST /api/run-agent/`: Run the patent filing pipeline with an innovation idea.
- `GET /api/download-pdf/`: Download the generated patent PDF.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
