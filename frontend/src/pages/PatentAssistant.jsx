import { useState, useEffect } from "react";
import { Lightbulb, Zap, FileText, Search, CheckCircle, Sparkles, Brain, Shield, Rocket } from "lucide-react";

// Particle component for floating animation
const Particle = ({ delay = 0 }) => (
  <div 
    className="particle" 
    style={{ 
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 4}s`
    }}
  />
);

// Enhanced ResultCard with better animations and icons
const ResultCard = ({ title, content, isEven, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 600);
    return () => clearTimeout(timer);
  }, [index]);

  const getIcon = (title) => {
    if (title.includes('Innovation')) return <Lightbulb className="w-6 h-6" />;
    if (title.includes('Research')) return <Search className="w-6 h-6" />;
    if (title.includes('Claim')) return <CheckCircle className="w-6 h-6" />;
    if (title.includes('Draft')) return <FileText className="w-6 h-6" />;
    if (title.includes('Filing')) return <Shield className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  return (
    <div className={`chat-message ${isEven ? 'chat-right' : 'chat-left'} ${isVisible ? 'visible' : ''}`}>
      <div className="avatar-container">
        <div className="avatar-glow">
          <div className="robot-avatar">
            {getIcon(title)}
          </div>
        </div>
      </div>
      <div className="message-content">
        <div className="message-header">
          <h3 className="result-title">{title}</h3>
          <div className="pulse-indicator" />
        </div>
        <div className="result-content">{content}</div>
      </div>
    </div>
  );
};

// Progress indicator component
const ProgressStep = ({ step, isActive, isCompleted, icon }) => (
  <div className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
    <div className="step-icon">
      {icon}
    </div>
    <span className="step-label">{step}</span>
  </div>
);

function PatentAssistant() {
  const [idea, setIdea] = useState("");
  const [stepResults, setStepResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: "Analyzing Innovation", icon: <Brain className="w-5 h-5" /> },
    { name: "Researching Prior Art", icon: <Search className="w-5 h-5" /> },
    { name: "Generating Claims", icon: <Zap className="w-5 h-5" /> },
    { name: "Drafting Application", icon: <FileText className="w-5 h-5" /> },
    { name: "Preparing Filing", icon: <Rocket className="w-5 h-5" /> }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setStepResults([]);
    setCurrentStep(0);

    try {
      // Actual API call to your backend
      const response = await fetch("http://localhost:8000/api/run-agent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const steps = data.steps;

      // Display results as they come from the backend
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i + 1);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStepResults((prev) => [...prev, steps[i]]);
      }
      setCurrentStep(steps.length);
    } catch (err) {
      setError("Failed to connect to the backend. Please ensure the server is running and try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTitle = (slug) => {
    return slug.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const agentNames = [
    "Innovation Extractor Agent",
    "Prior Art Research Agent", 
    "Claim Generator Agent",
    "Draft Writer Agent",
    "Patent Filing Agent",
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0e1a;
          min-height: 100vh;
          color: #ffffff;
          overflow-x: hidden;
        }

        .container {
          position: relative;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: 
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
        }

        .particles-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          animation: float-particle linear infinite;
          opacity: 0.7;
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .main-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeInUp 1s ease-out;
        }

        .title-container {
          position: relative;
          display: inline-block;
        }

        .title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.1;
          position: relative;
          animation: textGlow 3s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
          0% {
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
          }
        }

        .title::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981);
          border-radius: 20px;
          filter: blur(20px);
          opacity: 0.3;
          z-index: -1;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        .subtitle {
          font-size: 1.3rem;
          color: #94a3b8;
          font-weight: 400;
          letter-spacing: 0.5px;
          margin-bottom: 2rem;
        }

        .feature-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .badge {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: #3b82f6;
          backdrop-filter: blur(10px);
          animation: float 3s ease-in-out infinite;
        }

        .badge:nth-child(2) { animation-delay: 0.5s; }
        .badge:nth-child(3) { animation-delay: 1s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .input-section {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .input-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 1.5rem;
        }

        .idea-textarea {
          width: 100%;
          min-height: 150px;
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.5);
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 16px;
          font-size: 1rem;
          font-family: inherit;
          color: #e2e8f0;
          resize: vertical;
          transition: all 0.3s ease;
          outline: none;
        }

        .idea-textarea:focus {
          border-color: #3b82f6;
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 
            0 0 0 4px rgba(59, 130, 246, 0.1),
            0 0 20px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        .idea-textarea::placeholder {
          color: #64748b;
        }

        .submit-button {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .progress-container {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          display: ${loading ? 'block' : 'none'};
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .progress-steps::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(59, 130, 246, 0.2);
          z-index: 0;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(30, 41, 59, 0.8);
          border: 2px solid rgba(59, 130, 246, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-icon {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-color: #3b82f6;
          color: white;
          animation: pulse-step 2s ease-in-out infinite;
        }

        .progress-step.completed .step-icon {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          border-color: #10b981;
          color: white;
        }

        @keyframes pulse-step {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }

        .step-label {
          font-size: 0.8rem;
          color: #94a3b8;
          text-align: center;
          font-weight: 500;
        }

        .progress-step.active .step-label {
          color: #3b82f6;
          font-weight: 600;
        }

        .progress-step.completed .step-label {
          color: #10b981;
          font-weight: 600;
        }

        .loading-status {
          text-align: center;
          color: #3b82f6;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 3rem;
        }

        .chat-message {
          display: flex;
          align-items: flex-start;
          max-width: 85%;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .chat-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .chat-left {
          align-self: flex-start;
          flex-direction: row;
        }

        .chat-right {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .avatar-container {
          position: relative;
        }

        .avatar-glow {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          padding: 2px;
          animation: rotate-glow 3s linear infinite;
        }

        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .robot-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }

        .message-content {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .message-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.4);
        }

        .message-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .result-title {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .result-content {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 1rem;
          white-space: pre-wrap;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 500;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

          .input-section {
            padding: 2rem;
          }

          .progress-steps {
            flex-direction: column;
            gap: 1rem;
          }

          .progress-steps::before {
            display: none;
          }

          .chat-message {
            max-width: 95%;
          }

          .feature-badges {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .input-section {
            padding: 1.5rem;
          }

          .message-content {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="particles-bg">
          {[...Array(20)].map((_, i) => (
            <Particle key={i} delay={i * 0.5} />
          ))}
        </div>

        <div className="main-content">
          <div className="header">
            <div className="title-container">
              <h1 className="title">Patent Forge AI</h1>
            </div>
            <p className="subtitle">Transform groundbreaking ideas into protected intellectual property</p>
            <div className="feature-badges">
              <div className="badge">🧠 AI-Powered Analysis</div>
              <div className="badge">🔍 Prior Art Research</div>
              <div className="badge">⚡ Instant Claims Generation</div>
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">
              <Lightbulb className="w-5 h-5" />
              Describe Your Revolutionary Innovation
            </label>
            <textarea
              className="idea-textarea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your breakthrough innovation in detail... What problem does it solve? How does it work? What makes it uniquely different from existing solutions?"
            />
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading || !idea.trim()}
            >
              {loading ? 'AI Agents Processing...' : 'Launch Patent Analysis'}
            </button>
          </div>

          {loading && (
            <div className="progress-container">
              <div className="progress-steps">
                {steps.map((step, index) => (
                  <ProgressStep
                    key={index}
                    step={step.name}
                    icon={step.icon}
                    isActive={currentStep === index + 1}
                    isCompleted={currentStep > index + 1}
                  />
                ))}
              </div>
              <div className="loading-status">
                {currentStep > 0 && currentStep <= steps.length 
                  ? `${steps[currentStep - 1].name}...` 
                  : 'Initializing AI Agents...'}
              </div>
            </div>
          )}

          {error && <div className="error">{error}</div>}

          {stepResults.length > 0 && (
            <div className="chat-container">
              {stepResults.map((step, index) => {
                const agentKey = Object.keys(step)[0];
                const contentObj = step[agentKey];
                const contentKey = Object.keys(contentObj)[0];
                const contentValue = contentObj[contentKey];
                const agentName = agentNames[index] || formatTitle(agentKey);

                return (
                  <ResultCard
                    key={index}
                    title={`${agentName} → ${formatTitle(contentKey)}`}
                    content={contentValue}
                    isEven={index % 2 === 1}
                    index={index}
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