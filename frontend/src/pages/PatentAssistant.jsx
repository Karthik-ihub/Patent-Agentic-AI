import { useState } from "react";
import axios from "axios";

// ResultCard component
const ResultCard = ({ title, content }) => (
  <div className="result-card">
    <h3 className="result-title">{title}</h3>
    <div className="result-content">{content}</div>
  </div>
);

function PatentAssistant() {
  const [idea, setIdea] = useState("");
  const [stepResults, setStepResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setStepResults([]);

    try {
      // Actual API call
      const response = await axios.post("http://localhost:8000/api/run-agent/", { idea });
      const steps = response.data.steps;

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStepResults((prev) => [...prev, steps[i]]);
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to prettify field names
  const formatTitle = (slug) => {
    return slug.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          width: 100%;
          max-width: 900px;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-x: hidden;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 118, 117, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 204, 112, 0.3) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
          border-radius: 20px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }

        .main-content {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          animation: slideDown 0.8s ease-out;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          text-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .subtitle {
          font-size: 1.2rem;
          color: #4a5568;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .input-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          animation: slideUp 0.8s ease-out 0.2s both;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .input-label {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 1rem;
        }

        .idea-textarea {
          width: 100%;
          min-height: 120px;
          padding: 1.5rem;
          border: 2px solid rgba(102, 126, 234, 0.1);
          border-radius: 16px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          background: rgba(248, 250, 252, 0.8);
          transition: all 0.3s ease;
          outline: none;
        }

        .idea-textarea:focus {
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .idea-textarea::placeholder {
          color: #a0aec0;
        }

        .submit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1.5rem;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .status-section {
          text-align: center;
          margin: 2rem 0;
        }

        .loading {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-size: 1.1rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.9);
          padding: 1rem 2rem;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(102, 126, 234, 0.3);
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .error {
          color: #e53e3e;
          background: rgba(254, 226, 226, 0.9);
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 500;
          border-left: 4px solid #e53e3e;
          backdrop-filter: blur(10px);
        }

        .results-section {
          width: 100%;
          margin-top: 2rem;
        }

        .result-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease-out both;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .result-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.3);
        }

        .result-card:nth-child(even) {
          animation: slideInRight 0.6s ease-out both;
        }

        .result-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(102, 126, 234, 0.1);
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .result-content {
          color: #4a5568;
          line-height: 1.7;
          font-size: 1rem;
          white-space: pre-wrap;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .input-section {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .result-card {
            padding: 1.5rem;
            border-radius: 16px;
          }

          .submit-button {
            padding: 0.8rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .input-section {
            padding: 1.2rem;
          }

          .result-card {
            padding: 1.2rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="main-content">
          <div className="header">
            <h1 className="title">Patent Filing Assistant</h1>
            <p className="subtitle">Transform your innovative ideas into patent applications</p>
          </div>

          <div className="input-section">
            <label className="input-label">Describe Your Innovation</label>
            <textarea
              className="idea-textarea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your innovative idea in detail... Describe the problem it solves, how it works, and what makes it unique."
            />
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading || !idea.trim()}
            >
              {loading ? 'Processing...' : 'Analyze & Generate Patent'}
            </button>
          </div>

          <div className="status-section">
            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                AI agents analyzing your innovation...
              </div>
            )}
            {error && <div className="error">{error}</div>}
          </div>

          {stepResults.length > 0 && (
            <div className="results-section">
              {stepResults.map((step, index) => {
                const agentKey = Object.keys(step)[0];
                const contentObj = step[agentKey];
                const contentKey = Object.keys(contentObj)[0];
                const contentValue = contentObj[contentKey];

                return (
                  <ResultCard
                    key={index}
                    title={`${formatTitle(agentKey)} → ${formatTitle(contentKey)}`}
                    content={contentValue}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatentAssistant;
