import { useState, useEffect, useRef } from "react";
import {
  Lightbulb,
  Zap,
  FileText,
  Search,
  Brain,
  Rocket,
  Scale,
  BookOpen,
  BadgeIcon as Certificate,
} from "lucide-react";

// Legal document floating animation
const LegalDocument = ({ delay = 0 }) => (
  <div
    className="legal-document"
    style={{
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${12 + Math.random() * 6}s`,
    }}
  />
);

// CenteredResponseCard component for displaying responses
const CenteredResponseCard = ({ title, content }) => {
  return (
    <div className="centered-response-card">
      <div className="response-header">
        <h3 className="response-title">{title}</h3>
      </div>
      <div className="response-content">{content}</div>
    </div>
  );
};

// WhyChooseUsCard component for animated cards
const WhyChooseUsCard = ({ title, description, icon }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`why-choose-us-card ${isVisible ? "visible" : ""}`}>
      <div className="card-legal-seal"></div>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

// Enhanced WorkflowStep component for roadmap
const WorkflowStep = ({ step, description, icon, index, isActive, isCompleted }) => {
  const stepRef = useRef(null);

  return (
    <div ref={stepRef} className={`roadmap-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
      <div className="step-timeline">
        <div className="step-node">
          <div className="step-node-inner">
            <div className="step-icon-container">{icon}</div>
          </div>
          <div className="step-legal-ring"></div>
        </div>
      </div>

      <div className="step-content-container">
        <div className="step-content-card">
          <div className="step-number">Article {index + 1}</div>
          <h3 className="step-title">{step}</h3>
          <p className="step-description">{description}</p>
          <div className="step-progress-bar">
            <div className="step-progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced HowItWorksSection component with corner-placed cards and timeline
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const sectionRef = useRef(null);

  const workflowData = [
    {
      step: "Idea Submission",
      description:
        "Submit your innovative idea in detail. Describe the problem it solves, how it works, and what makes it unique.",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      step: "Innovation Analysis",
      description: "Our system analyzes your innovation to understand its core components and potential patentability.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      step: "Prior Art Research",
      description:
        "We conduct comprehensive research to ensure your innovation is unique and hasn't been patented before.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      step: "Claims Generation",
      description: "Our advanced algorithms generate patent claims that define the scope of your innovation.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      step: "Application Drafting",
      description: "We draft a detailed patent application, including all necessary legal and technical descriptions.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      step: "Filing Preparation",
      description: "We prepare all the documents required for filing and guide you through the submission process.",
      icon: <Rocket className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));
      const stepProgress = progress * workflowData.length;
      const currentActiveStep = Math.floor(stepProgress);

      setActiveStep(currentActiveStep);

      const newCompletedSteps = new Set();
      for (let i = 0; i < currentActiveStep; i++) {
        newCompletedSteps.add(i);
      }
      setCompletedSteps(newCompletedSteps);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [workflowData.length]);

  const totalPathLength = 1200; // Adjusted for 6 cards
  const progressLength = (activeStep / (workflowData.length - 1)) * totalPathLength;

  return (
    <div className="roadmap-section" ref={sectionRef}>
      <div className="roadmap-header">
        <div className="legal-emblem">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="roadmap-title">Patent Process Framework</h2>
        <p className="roadmap-subtitle">A systematic approach to intellectual property protection</p>
      </div>

      <div className="roadmap-container">
        <div className="roadmap-timeline">
          <svg className="timeline-svg" viewBox="0 0 800 1400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="legalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <pattern id="legalPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="none" stroke="rgba(30, 64, 175, 0.1)" strokeWidth="1" />
              </pattern>
            </defs>

            <path
              className="timeline-path"
              d="M400 50
                Q200 150 400 250
                Q600 350 400 450
                Q200 550 400 650
                Q600 750 400 850
                Q200 950 400 1050
                Q600 1150 400 1250
                Q200 1350 400 1400"
            />

            <path
              className="timeline-progress-path"
              d="M400 50
                Q200 150 400 250
                Q600 350 400 450
                Q200 550 400 650
                Q600 750 400 850
                Q200 950 400 1050
                Q600 1150 400 1250
                Q200 1350 400 1400"
              strokeDasharray={`${progressLength} ${totalPathLength}`}
              strokeDashoffset="0"
            />
          </svg>
        </div>

        <div className="roadmap-steps">
          {workflowData.map((item, index) => (
            <WorkflowStep
              key={index}
              step={item.step}
              description={item.description}
              icon={item.icon}
              index={index}
              isActive={activeStep === index}
              isCompleted={completedSteps.has(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress indicator component
const ProgressStep = ({ step, isActive, isCompleted, icon }) => (
  <div className={`progress-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
    <div className="step-icon">{icon}</div>
    <span className="step-label">{step}</span>
  </div>
);

function PatentAssistant() {
  const [idea, setIdea] = useState("");
  const [stepResults, setStepResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const steps = [
    { name: "Analyzing Innovation", icon: <Brain className="w-5 h-5" /> },
    { name: "Researching Prior Art", icon: <Search className="w-5 h-5" /> },
    { name: "Generating Claims", icon: <Zap className="w-5 h-5" /> },
    { name: "Drafting Application", icon: <FileText className="w-5 h-5" /> },
    { name: "Preparing Filing", icon: <Rocket className="w-5 h-5" /> },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setStepResults([]);
    setCurrentStep(0);
    setTypingComplete(false);

    try {
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
      const filteredSteps = steps.filter((step, index) => index === 3 || index === 4);

      for (let i = 0; i < filteredSteps.length; i++) {
        setCurrentStep(steps.indexOf(filteredSteps[i]) + 1);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStepResults((prev) => [...prev, filteredSteps[i]]);
      }

      setCurrentStep(steps.length);
      setTypingComplete(true);
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

  const whyChooseUsData = [
    {
      title: "Legal Expertise",
      description: "Our AI is trained on extensive patent law databases and legal precedents for accurate analysis.",
      icon: <Scale className="w-6 h-6" />,
    },
    {
      title: "Comprehensive Research",
      description: "We conduct thorough prior art searches across global patent databases and legal repositories.",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: "Professional Documentation",
      description: "Generate legally compliant patent applications that meet USPTO and international standards.",
      icon: <Certificate className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
          color: #1e293b;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-x: hidden;
        }

        .container {
          position: relative;
          min-height: 100vh;
          width: 100vw;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background:
            radial-gradient(circle at 20% 20%, rgba(30, 64, 175, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(217, 119, 6, 0.05) 0%, transparent 50%);
          box-sizing: border-box;
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

        .legal-document {
          position: absolute;
          width: 8px;
          height: 12px;
          background: linear-gradient(45deg, #1e40af, #059669);
          border-radius: 1px;
          animation: float-document linear infinite;
          opacity: 0.3;
          box-shadow: 0 0 4px rgba(30, 64, 175, 0.3);
        }

        @keyframes float-document {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }

        .main-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .input-section,
        .progress-container,
        .chat-container {
          width: 100%;
          max-width: 100%;
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
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #059669 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.1;
          position: relative;
          font-family: 'Georgia', serif;
          letter-spacing: -0.02em;
        }

        .title::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(135deg, #1e40af, #059669, #d97706);
          border-radius: 8px;
          filter: blur(15px);
          opacity: 0.1;
          z-index: -1;
        }

        .subtitle {
          font-size: 1.3rem;
          color: #64748b;
          font-weight: 400;
          letter-spacing: 0.3px;
          margin-bottom: 2rem;
          font-family: 'Georgia', serif;
        }

        .feature-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .badge {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(30, 64, 175, 0.2);
          padding: 0.7rem 1.5rem;
          border-radius: 25px;
          font-size: 0.9rem;
          color: #1e40af;
          backdrop-filter: blur(10px);
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.1);
          transition: all 0.3s ease;
        }

        .badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.15);
        }

        .input-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(30, 64, 175, 0.1);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
          animation: slideUp 0.8s ease-out 0.2s both;
          box-shadow: 0 20px 40px rgba(30, 64, 175, 0.08);
        }

        .input-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #1e40af, #059669, #d97706, transparent);
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1.5rem;
          font-family: 'Georgia', serif;
        }

        .idea-textarea {
          width: 100%;
          min-height: 150px;
          padding: 1.5rem;
          background: rgba(248, 250, 252, 0.8);
          border: 2px solid rgba(30, 64, 175, 0.2);
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Georgia', serif;
          color: #1e293b;
          resize: vertical;
          transition: all 0.3s ease;
          outline: none;
          line-height: 1.6;
        }

        .idea-textarea:focus {
          border-color: #1e40af;
          background: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 0 0 4px rgba(30, 64, 175, 0.1),
            0 8px 25px rgba(30, 64, 175, 0.15);
          transform: translateY(-2px);
        }

        .idea-textarea::placeholder {
          color: #64748b;
          font-style: italic;
        }

        .submit-button {
          background: linear-gradient(135deg, #1e40af 0%, #059669 100%);
          color: white;
          border: none;
          padding: 1.3rem 3.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
          font-family: 'Georgia', serif;
          letter-spacing: 0.5px;
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
          box-shadow: 0 12px 35px rgba(30, 64, 175, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .progress-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(30, 64, 175, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          display: ${loading ? "block" : "none"};
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.08);
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
          background: rgba(30, 64, 175, 0.2);
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
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(248, 250, 252, 0.9);
          border: 3px solid rgba(30, 64, 175, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-icon {
          background: linear-gradient(135deg, #1e40af, #059669);
          border-color: #1e40af;
          color: white;
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
        }

        .progress-step.completed .step-icon {
          background: linear-gradient(135deg, #059669, #d97706);
          border-color: #059669;
          color: white;
        }

        .step-label {
          font-size: 0.85rem;
          color: #64748b;
          text-align: center;
          font-weight: 500;
          font-family: 'Georgia', serif;
        }

        .progress-step.active .step-label {
          color: #1e40af;
          font-weight: 600;
        }

        .progress-step.completed .step-label {
          color: #059669;
          font-weight: 600;
        }

        .loading-status {
          text-align: center;
          color: #1e40af;
          font-size: 1.1rem;
          font-weight: 500;
          font-family: 'Georgia', serif;
        }

        .centered-response-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(30, 64, 175, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          margin: 1.5rem auto;
          max-width: 100%;
          text-align: left;
          animation: fadeInUp 1s ease-out;
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.08);
        }

        .response-header {
          margin-bottom: 1.5rem;
          border-bottom: 2px solid rgba(30, 64, 175, 0.1);
          padding-bottom: 1rem;
        }

        .response-title {
          font-size: 1.6rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Georgia', serif;
        }

        .response-content {
          color: #374151;
          line-height: 1.8;
          font-size: 1.05rem;
          white-space: pre-wrap;
          text-align: left;
          font-family: 'Georgia', serif;
        }

        .why-choose-us-section {
          margin: 4rem auto;
          max-width: 1200px;
          text-align: center;
        }

        .why-choose-us-title {
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #059669 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2.5rem;
          font-family: 'Georgia', serif;
        }

        .why-choose-us-cards {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .why-choose-us-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(30, 64, 175, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 380px;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.08);
        }

        .why-choose-us-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .why-choose-us-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(30, 64, 175, 0.15);
        }

        .card-legal-seal {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(135deg, #1e40af, #059669);
          border-radius: 22px;
          filter: blur(8px);
          opacity: 0.1;
          z-index: -1;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          color: #1e40af;
          transition: all 0.3s ease;
        }

        .card-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          background: linear-gradient(135deg, #1e40af, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Georgia', serif;
        }

        .card-description {
          color: #4b5563;
          line-height: 1.7;
          font-size: 1.05rem;
          font-family: 'Georgia', serif;
        }

        .error {
          background: rgba(239, 68, 68, 0.1);
          border: 2px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
          padding: 1.2rem 2rem;
          border-radius: 12px;
          font-weight: 500;
          text-align: center;
          backdrop-filter: blur(10px);
          font-family: 'Georgia', serif;
        }

        .roadmap-section {
          margin: 6rem auto;
          max-width: 100%;
          padding: 4rem 1rem;
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 30px;
        }

        .roadmap-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .legal-emblem {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #1e40af, #059669);
          border-radius: 50%;
          margin-bottom: 2rem;
          color: white;
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.3);
        }

        .roadmap-title {
          font-size: 3.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #059669 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          font-family: 'Georgia', serif;
          letter-spacing: -0.02em;
        }

        .roadmap-subtitle {
          font-size: 1.3rem;
          color: #64748b;
          font-weight: 400;
          font-family: 'Georgia', serif;
          font-style: italic;
        }

        .roadmap-container {
          position: relative;
          max-width: 100%;
          margin: 0 auto;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .roadmap-timeline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 100%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 1;
        }

        .timeline-svg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .timeline-path {
          fill: none;
          stroke: rgba(30, 64, 175, 0.2);
          stroke-width: 3;
          stroke-dasharray: 12, 8;
          animation: legal-dash-flow 25s linear infinite;
        }

        .timeline-progress-path {
          fill: none;
          stroke: url(#legalGradient);
          stroke-width: 5;
          stroke-linecap: round;
          filter: drop-shadow(0 0 12px rgba(30, 64, 175, 0.4));
          transition: stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes legal-dash-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 200; }
        }

        .roadmap-steps {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem; /* Gap between cards */
        }

        .roadmap-step {
          width: 100%;
          max-width: 480px; /* Card width */
          margin-bottom: 6rem;
          opacity: 0.25;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .roadmap-step:nth-child(odd) {
          margin-right: auto;
          margin-left: 1rem; /* Push to left edge with minimal padding */
          justify-content: flex-start;
        }

        .roadmap-step:nth-child(even) {
          margin-left: auto;
          margin-right: 1rem; /* Push to right edge with minimal padding */
          justify-content: flex-end;
        }

        .roadmap-step.active {
          opacity: 1;
          transform: scale(1.02);
        }

        .roadmap-step.completed {
          opacity: 0.8;
        }

        .step-timeline {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
          margin-bottom: 1rem;
        }

        .step-node {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 4px solid rgba(30, 64, 175, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 25px rgba(30, 64, 175, 0.1);
        }

        .roadmap-step.active .step-node {
          border-color: #1e40af;
          background: linear-gradient(135deg, #1e40af, #059669);
          box-shadow:
            0 0 50px rgba(30, 64, 175, 0.6),
            0 0 100px rgba(30, 64, 175, 0.3),
            inset 0 2px 10px rgba(255, 255, 255, 0.2);
          animation: legal-node-pulse 3s ease-in-out infinite;
        }

        .roadmap-step.completed .step-node {
          border-color: #059669;
          background: linear-gradient(135deg, #059669, #d97706);
          box-shadow:
            0 0 40px rgba(5, 150, 105, 0.5),
            0 0 80px rgba(5, 150, 105, 0.2);
        }

        @keyframes legal-node-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow:
              0 0 50px rgba(30, 64, 175, 0.6),
              0 0 100px rgba(30, 64, 175, 0.3),
              inset 0 2px 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            transform: scale(1.08);
            box-shadow:
              0 0 70px rgba(30, 64, 175, 0.8),
              0 0 140px rgba(30, 64, 175, 0.4),
              inset 0 4px 20px rgba(255, 255, 255, 0.3);
          }
        }

        .step-node-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .step-icon-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #64748b;
          transition: all 0.4s ease;
          z-index: 2;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .roadmap-step.active .step-icon-container {
          color: white;
          animation: legal-icon-glow 3s ease-in-out infinite;
          transform: translate(-50%, -50%) scale(1.15);
        }

        .roadmap-step.completed .step-icon-container {
          color: white;
          transform: translate(-50%, -50%) scale(1.1);
        }

        @keyframes legal-icon-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
            transform: translate(-50%, -50%) scale(1.15);
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255, 255, 255, 1));
            transform: translate(-50%, -50%) scale(1.25);
          }
        }

        .step-legal-ring {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border: 3px solid rgba(30, 64, 175, 0.3);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s ease;
        }

        .roadmap-step.active .step-legal-ring {
          opacity: 1;
          transform: scale(1);
          animation: legal-pulse-ring 3s ease-in-out infinite;
        }

        @keyframes legal-pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
            border-color: rgba(30, 64, 175, 0.5);
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
            border-color: rgba(30, 64, 175, 0.1);
          }
        }

        .step-content-container {
          max-width: 480px;
          position: relative;
          margin: 0;
        }

        .roadmap-step:nth-child(odd) .step-content-container {
          margin-right: auto;
          padding-right: 0;
        }

        .roadmap-step:nth-child(even) .step-content-container {
          margin-left: auto;
          padding-left: 0;
        }

        .step-content-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(25px);
          border: 2px solid rgba(30, 64, 175, 0.15);
          border-radius: 20px;
          padding: 2.8rem;
          position: relative;
          overflow: hidden;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(40px);
          box-shadow: 0 15px 35px rgba(30, 64, 175, 0.08);
        }

        .roadmap-step.active .step-content-card {
          border-color: rgba(30, 64, 175, 0.4);
          background: rgba(255, 255, 255, 0.98);
          transform: translateY(0);
          box-shadow:
            0 30px 60px rgba(30, 64, 175, 0.12),
            0 0 0 1px rgba(30, 64, 175, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .roadmap-step.completed .step-content-card {
          border-color: rgba(5, 150, 105, 0.3);
          transform: translateY(0);
          box-shadow:
            0 25px 50px rgba(5, 150, 105, 0.08),
            0 0 0 1px rgba(5, 150, 105, 0.1);
        }

        .step-content-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.6), transparent);
          opacity: 0;
          transition: opacity 1s ease;
        }

        .roadmap-step.active .step-content-card::before {
          opacity: 1;
        }

        .step-number {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
          opacity: 0.8;
          letter-spacing: 0.8px;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
        }

        .roadmap-step.active .step-number {
          opacity: 1;
          animation: legal-number-glow 3s ease-in-out infinite;
        }

        @keyframes legal-number-glow {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(30, 64, 175, 0.4);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 25px rgba(30, 64, 175, 0.7);
          }
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #374151, #1f2937);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 1s ease;
          line-height: 1.3;
          font-family: 'Georgia', serif;
        }

        .roadmap-step.active .step-title {
          background: linear-gradient(135deg, #1e40af, #059669, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: legal-title-glow 3.5s ease-in-out infinite;
        }

        .roadmap-step.completed .step-title {
          background: linear-gradient(135deg, #059669, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes legal-title-glow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(30, 64, 175, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(30, 64, 175, 0.4));
          }
        }

        .step-description {
          color: #4b5563;
          line-height: 1.8;
          font-size: 1.15rem;
          margin-bottom: 1.8rem;
          transition: color 1s ease;
          font-family: 'Georgia', serif;
        }

        .roadmap-step.active .step-description {
          color: #374151;
        }

        .step-progress-bar {
          width: 100%;
          height: 5px;
          background: rgba(30, 64, 175, 0.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .step-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e40af, #059669, #d97706);
          border-radius: 4px;
          width: 0%;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .step-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transition: left 1s ease;
        }

        .roadmap-step.active .step-progress-fill {
          width: 100%;
          box-shadow: 0 0 20px rgba(30, 64, 175, 0.4);
        }

        .roadmap-step.active .step-progress-fill::after {
          left: 100%;
          animation: legal-progress-shimmer 2.5s ease-in-out infinite;
        }

        .roadmap-step.completed .step-progress-fill {
          width: 100%;
          background: linear-gradient(90deg, #059669, #d97706);
          box-shadow: 0 0 15px rgba(5, 150, 105, 0.3);
        }

        @keyframes legal-progress-shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
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

        @media (max-width: 1024px) {
          .roadmap-container {
            max-width: 900px;
          }

          .step-content-container {
            max-width: 420px;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .title {
            font-size: 2.8rem;
          }

          .roadmap-section {
            padding: 2rem 1rem;
          }

          .roadmap-title {
            font-size: 2.5rem;
          }

          .roadmap-container {
            max-width: 100%;
          }

          .roadmap-step {
            flex-direction: column;
            margin: 0 auto !important;
            max-width: 90%;
            justify-content: center !important;
          }

          .step-timeline {
            position: relative;
            margin-bottom: 1rem;
          }

          .step-content-container {
            max-width: 100%;
            margin: 0 !important;
            padding: 0 !important;
          }

          .step-content-card {
            padding: 2.2rem;
            transform: translateY(30px) !important;
          }

          .roadmap-step.active .step-content-card,
          .roadmap-step.completed .step-content-card {
            transform: translateY(0) !important;
          }

          .roadmap-timeline {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2.2rem;
          }

          .input-section {
            padding: 2rem;
          }

          .roadmap-section {
            padding: 1rem 0.5rem;
          }

          .roadmap-title {
            font-size: 2rem;
          }

          .step-content-card {
            padding: 1.8rem;
          }

          .step-title {
            font-size: 1.6rem;
          }

          .step-description {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="particles-bg">
          {[...Array(15)].map((_, i) => (
            <LegalDocument key={i} delay={i * 0.8} />
          ))}
        </div>

        <div className="main-content">
          <div className="header">
            <div className="title-container">
              <h1 className="title">Patent Forge AI</h1>
            </div>
            <p className="subtitle">Professional Intellectual Property Protection Services</p>
            <div className="feature-badges">
              <div className="badge">⚖️ Legal Expertise</div>
              <div className="badge">📚 Comprehensive Research</div>
              <div className="badge">🏛️ Professional Documentation</div>
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">
              <Lightbulb className="w-6 h-6" />
              Describe Your Innovation for Patent Analysis
            </label>
            <textarea
              className="idea-textarea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Provide a detailed description of your invention, including its technical specifications, unique features, and the problem it solves. This information will be used to conduct a comprehensive patent analysis and prepare your application."
            />
            <button className="submit-button" onClick={handleSubmit} disabled={loading || !idea.trim()}>
              {loading ? "Processing Legal Analysis..." : "Initiate Patent Process"}
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
                  : "Initializing Legal Analysis..."}
              </div>
            </div>
          )}

          {error && <div className="error">{error}</div>}

          {stepResults.length > 0 && typingComplete && (
            <div className="chat-container">
              {stepResults.map((step, index) => {
                const agentKey = Object.keys(step)[0];
                const contentObj = step[agentKey];
                const contentKey = Object.keys(contentObj)[0];
                const contentValue = contentObj[contentKey];
                const agentName =
                  agentNames[steps.findIndex((s) => s.name.toLowerCase().includes(agentKey.toLowerCase()))] ||
                  formatTitle(agentKey);

                return (
                  <CenteredResponseCard
                    key={index}
                    title={`${agentName} → ${formatTitle(contentKey)}`}
                    content={contentValue}
                  />
                );
              })}
            </div>
          )}

          <div className="why-choose-us-section">
            <h2 className="why-choose-us-title">Why Choose Our Service?</h2>
            <div className="why-choose-us-cards">
              {whyChooseUsData.map((item, index) => (
                <WhyChooseUsCard key={index} title={item.title} description={item.description} icon={item.icon} />
              ))}
            </div>
          </div>

          <HowItWorksSection />
        </div>
      </div>
    </>
  );
}

export default PatentAssistant;