import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Presentation, Clock, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const workshops = [
  {
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript basics",
    duration: "4 hours",
    participants: "25-30",
    level: "Beginner",
  },
  {
    title: "React & Modern Frontend",
    description: "Build interactive UIs with React",
    duration: "6 hours",
    participants: "20-25",
    level: "Intermediate",
  },
  {
    title: "Python for Data Analysis",
    description: "Learn data manipulation with Pandas",
    duration: "5 hours",
    participants: "20-30",
    level: "Beginner",
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform mobile apps",
    duration: "8 hours",
    participants: "15-20",
    level: "Intermediate",
  },
];

const Workshop = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();
  
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof workshops[0] | null>(null);
  
  // Handle pending action after login
  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'register_workshop' && action.data) {
        // Navigate to registration or show registration form
        console.log('Completing workshop registration:', action.data);
        // You can add navigation or form opening logic here
      }
    });
  }, [completePendingAction]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Workshops</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn hands-on skills through interactive workshop sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {workshops.map((workshop, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Presentation className="w-5 h-5 text-primary" />
                    {workshop.title}
                  </CardTitle>
                  <CardDescription>{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Participants: {workshop.participants}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span>Level: {workshop.level}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      executeProtectedAction(
                        'register_workshop',
                        workshop,
                        () => {
                          setSelectedWorkshop(workshop);
                          // Navigate to registration page or show registration form
                          window.location.href = `/workshop`;
                        }
                      );
                    }}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={clearPendingAction}
        message="Please sign in to continue with your registration 🚀"
      />
    </div>
  );
};

export default Workshop;
