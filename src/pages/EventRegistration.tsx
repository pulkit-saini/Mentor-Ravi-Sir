import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Calendar, Users, Trophy, Clock } from "lucide-react";

const EventRegistration = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated] = useState(false); // This will be connected to actual auth later

  const upcomingEvents = [
    {
      id: 1,
      title: "AgriTech Innovation Hackathon",
      date: "March 15-17, 2024",
      participants: "50+ Teams",
      duration: "48 Hours",
      description: "Join the ultimate hackathon focused on agricultural technology solutions.",
    },
    {
      id: 2,
      title: "EdTech Startup Bootcamp",
      date: "April 5-7, 2024",
      participants: "100+ Entrepreneurs",
      duration: "3 Days",
      description: "Intensive bootcamp for education technology startups and founders.",
    },
    {
      id: 3,
      title: "Mentorship Meet & Greet",
      date: "April 20, 2024",
      participants: "Invite Only",
      duration: "4 Hours",
      description: "Network with industry leaders and get personalized mentorship.",
    },
  ];

  const handleRegister = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Handle registration for authenticated users
      console.log("Registering for event...");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6 py-12">
            <h1 className="text-5xl md:text-6xl font-bold">
              Register for <span className="gradient-text">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join gamified events, connect with mentors, and earn professional certifications. 
              Sign in to register for upcoming events.
            </p>
          </div>

          {/* Events Grid */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="glass-card rounded-2xl p-6 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.participants}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{event.duration}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-primary"
                    onClick={handleRegister}
                  >
                    {isAuthenticated ? "Register Now" : "Sign In to Register"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          {!isAuthenticated && (
            <div className="max-w-2xl mx-auto mt-16 text-center glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Sign in or create an account to register for events and unlock exclusive opportunities.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-primary"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In / Sign Up
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default EventRegistration;
