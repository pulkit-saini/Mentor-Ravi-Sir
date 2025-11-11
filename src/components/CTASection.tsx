import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What programs do you offer?",
    answer: "We offer a wide range of programs including workshops, training sessions, mentorship programs, hackathons, career guidance, research opportunities, and placement support. All our programs are designed to enhance your practical skills and industry readiness."
  },
  {
    question: "How can I enroll in a course or event?",
    answer: "You can easily browse our courses and events sections, select the program that interests you, and click the enroll or register button. You'll be guided through a simple registration process. For any assistance, our support team is always available."
  },
  {
    question: "Are the programs suitable for beginners?",
    answer: "Absolutely! We offer programs for all skill levels - from complete beginners to advanced professionals. Each program clearly mentions the level requirement (Beginner, Intermediate, or Advanced) so you can choose what fits your current expertise."
  },
  {
    question: "What kind of mentorship support is available?",
    answer: "Our mentorship program connects you with industry experts and top professionals who provide personalized guidance on career development, technical skills, project work, and interview preparation. Mentors are available through one-on-one sessions and group workshops."
  },
  {
    question: "Do you provide placement assistance?",
    answer: "Yes! We offer comprehensive placement support including resume building, interview preparation, mock interviews, and direct connections with hiring companies. Our placement team works closely with industry partners to ensure the best opportunities for our students."
  },
  {
    question: "Can I participate in multiple programs simultaneously?",
    answer: "Yes, you can enroll in multiple programs based on your availability and interests. However, we recommend planning your schedule carefully to ensure you can give adequate time and attention to each program for maximum benefit."
  },
  {
    question: "What is the duration of typical programs?",
    answer: "Program durations vary - workshops can be single-day or weekend events, training programs typically run for 8-12 weeks, and mentorship programs are flexible based on your needs. Each program listing includes specific duration details."
  },
  {
    question: "How do I get updates about upcoming events and programs?",
    answer: "Stay connected by subscribing to our newsletter, following our social media channels, or checking our events page regularly. We also send email notifications to registered users about new programs and opportunities."
  }
];

const CTASection = () => {
  return (
    <section className="py-10 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-foreground">Frequently Asked </span>
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our programs, enrollment process, and support services
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="glass-card rounded-2xl p-8 md:p-12 border-2">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold text-base md:text-lg pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pt-2 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="/connect-now" 
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              Contact us directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
