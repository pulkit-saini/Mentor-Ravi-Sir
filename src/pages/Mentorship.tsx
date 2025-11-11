import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Briefcase, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const mentors = [
  {
    name: "Dr. Sarah Johnson",
    expertise: "AI & Machine Learning",
    experience: "15+ years",
    icon: GraduationCap,
  },
  {
    name: "Michael Chen",
    expertise: "Web Development",
    experience: "10+ years",
    icon: Briefcase,
  },
  {
    name: "Emma Williams",
    expertise: "Data Science",
    experience: "12+ years",
    icon: Award,
  },
  {
    name: "David Kumar",
    expertise: "Cybersecurity",
    experience: "8+ years",
    icon: Users,
  },
];

const Mentorship = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();
  
  // Handle pending action after login
  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'apply_mentorship') {
        console.log('Completing mentorship application');
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
              <span className="text-primary">Mentorship Program</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get guidance from top mentors in the industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mentors.map((mentor, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <mentor.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{mentor.name}</CardTitle>
                  <CardDescription>{mentor.expertise}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{mentor.experience}</p>
                  <Button variant="outline" className="w-full">Connect</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Apply for Mentorship</CardTitle>
              <CardDescription>
                Join our mentorship program and accelerate your career growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => {
                  executeProtectedAction(
                    'apply_mentorship',
                    {},
                    () => {
                      // Navigate to mentorship application
                      window.location.href = '/mentorship/apply';
                    }
                  );
                }}
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={clearPendingAction}
        message="Please sign in to continue with your application 🚀"
      />
    </div>
  );
};

export default Mentorship;
