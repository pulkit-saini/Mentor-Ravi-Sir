import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Sparkles, Brain, Compass, Lightbulb, ArrowRight, Rocket } from "lucide-react";
import { domains } from "@/data/domains";
import { useNavigate } from "react-router-dom";

const DiscoverYourself = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<"welcome" | "questions" | "results">("welcome");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "interest",
      question: "What excites you most?",
      options: [
        { value: "ai", label: "🤖 Building intelligent systems", domains: ["ai", "datascience"] },
        { value: "web", label: "🌐 Creating beautiful websites", domains: ["webdev", "uiux"] },
        { value: "security", label: "🔐 Protecting digital assets", domains: ["cybersecurity"] },
        { value: "innovation", label: "⛓️ Exploring new tech frontiers", domains: ["blockchain", "arvr"] },
        { value: "mobile", label: "📱 Building mobile experiences", domains: ["mobile"] },
        { value: "infrastructure", label: "☁️ Managing systems at scale", domains: ["cloud", "devops"] },
        { value: "gaming", label: "🎮 Creating immersive worlds", domains: ["gamedev"] },
        { value: "hardware", label: "🔌 Connecting physical devices", domains: ["iot"] },
      ],
    },
    {
      id: "strength",
      question: "What's your superpower?",
      options: [
        { value: "logic", label: "🧮 Problem-solving & logic", domains: ["ai", "datascience", "blockchain"] },
        { value: "creative", label: "🎨 Creativity & design", domains: ["uiux", "webdev", "gamedev"] },
        { value: "technical", label: "⚙️ Technical depth", domains: ["devops", "cloud", "cybersecurity"] },
        { value: "curious", label: "🔍 Curiosity & exploration", domains: ["iot", "arvr"] },
      ],
    },
    {
      id: "goal",
      question: "What's your dream?",
      options: [
        { value: "startup", label: "🚀 Launch my own startup", domains: ["webdev", "mobile", "ai"] },
        { value: "enterprise", label: "🏢 Work at top tech companies", domains: ["cloud", "devops", "cybersecurity"] },
        { value: "innovation", label: "💡 Push technological boundaries", domains: ["ai", "blockchain", "arvr"] },
        { value: "create", label: "🎮 Create experiences people love", domains: ["gamedev", "uiux", "mobile"] },
      ],
    },
  ];

  const calculateResults = () => {
    const domainScores: Record<string, number> = {};
    
    // Calculate scores based on answers
    Object.values(answers).forEach(answerId => {
      questions.forEach(q => {
        const option = q.options.find(opt => opt.value === answerId);
        if (option?.domains) {
          option.domains.forEach(domain => {
            domainScores[domain] = (domainScores[domain] || 0) + 1;
          });
        }
      });
    });

    // Get top 3 domains
    const sortedDomains = Object.entries(domainScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([domainId]) => domains.find(d => d.id === domainId))
      .filter(Boolean);

    return sortedDomains;
  };

  const handleStart = () => setCurrentStep("questions");

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (currentIndex === questions.length - 1) {
      setTimeout(() => setCurrentStep("results"), 300);
    }
  };

  const recommendedDomains = currentStep === "results" ? calculateResults() : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-background dark:to-background">
      <Navigation />

      {/* Welcome Screen */}
      {currentStep === "welcome" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center px-4 pt-20"
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              🌱
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Your Perfect Path
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Let AI guide you to the tech domain that matches your unique talents, interests, and dreams.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {[
                { icon: <Brain className="w-8 h-8" />, label: "AI-Powered" },
                { icon: <Compass className="w-8 h-8" />, label: "Personalized" },
                { icon: <Lightbulb className="w-8 h-8" />, label: "Insightful" },
                { icon: <Sparkles className="w-8 h-8" />, label: "Quick" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex flex-col items-center gap-2 p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-xl border border-primary/20"
                >
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
            >
              Let's Begin
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Questions Screen */}
      {currentStep === "questions" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20"
        >
          <div className="max-w-4xl mx-auto w-full space-y-12">
            {questions.map((question, qIndex) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: qIndex * 0.2 }}
                className="bg-white/80 dark:bg-card/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-primary/20 shadow-lg"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold">
                    {qIndex + 1}
                  </span>
                  {question.question}
                </h3>

                <div className="grid gap-3 md:gap-4">
                  {question.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 md:p-5 rounded-xl text-left transition-all ${
                        answers[question.id] === option.value
                          ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg"
                          : "bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-card/80 border border-gray-200 dark:border-border"
                      }`}
                    >
                      <span className="text-lg font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results Screen */}
      {currentStep === "results" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20"
        >
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-7xl mb-4"
              >
                ✨
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Your Perfect Paths Await!
              </h2>
              <p className="text-xl text-foreground/80">
                Based on your answers, here are the domains that match you best:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recommendedDomains.map((domain, index) => (
                <motion.div
                  key={domain?.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group cursor-pointer"
                  onClick={() => navigate(`/learning-path/${domain?.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-white dark:bg-card p-6 rounded-2xl border border-primary/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{domain?.icon}</span>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                          TOP MATCH
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{domain?.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{domain?.tagline}</p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Explore Path
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <motion.button
                onClick={() => navigate("/learning-path")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                <Rocket className="w-6 h-6" />
                Start Learning Now
              </motion.button>
              <p className="text-sm text-muted-foreground">
                Or explore all domains in the learning garden
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default DiscoverYourself;
