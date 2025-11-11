import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is this platform?",
    answer: "This platform is an initiative by Mentor Ravi Rautela, created to share his wide experience, practical insights, and knowledge with students. It serves as a collaborative learning space where mentorship, guidance, and growth opportunities come together."
  },
  {
    question: "What are the benefits for students?",
    answer: "Students can gain multiple advantages through this platform, such as: Discussing and exploring various career options, seeking internship and project guidance directly from mentors, engaging in interactive events, workshops, and sessions, networking with mentors and fellow students from across India, and learning about the latest in-demand skills and technologies."
  },
  {
    question: "What is the USP (Unique Selling Point) of this portal?",
    answer: "The unique strengths of this platform lie in its friendly and inclusive environment, learning-by-doing approach that focuses on real-world skill development, and active engagement and collaboration among students and mentors from across the country."
  },
  {
    question: "What kind of events are hosted on this platform?",
    answer: "The platform hosts a wide range of events including career guidance sessions and mentorship meets, skill development workshops, internship and project-based learning programs, and networking events connecting students and mentors."
  },
  {
    question: "How do I register for events?",
    answer: "Navigate to the Events section, select your desired event, and click on 'Register Now'. Fill in your details and submit the form."
  },
  {
    question: "Are the workshops free?",
    answer: "Most of our workshops are free for students. Some premium workshops may have a nominal fee which will be mentioned in the event details."
  },
  {
    question: "What is the mentorship program?",
    answer: "Our mentorship program connects you with industry experts who guide you through your learning journey, career decisions, and skill development."
  },
  {
    question: "How can I access internship opportunities?",
    answer: "Visit the Internships section from the navigation menu. Browse available opportunities and apply directly through our platform."
  },
  {
    question: "What types of internships are available?",
    answer: "Students can access diverse internship opportunities across multiple domains such as technology, management, data analytics, research, and innovation-driven projects — all designed to help them apply their learning practically."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold gradient-text">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Find quick answers to common questions
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-border/50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;