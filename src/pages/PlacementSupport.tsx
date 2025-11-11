import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Briefcase, FileText, Video, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const services = [
  {
    title: "Resume Building",
    description: "Create ATS-friendly resumes that stand out",
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    description: "Mock interviews and feedback sessions",
    icon: Video,
  },
  {
    title: "Career Counseling",
    description: "One-on-one guidance for career planning",
    icon: TrendingUp,
  },
  {
    title: "Job Matching",
    description: "Connect with companies hiring in your field",
    icon: Briefcase,
  },
];

const PlacementSupport = () => {
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
      if (action.type === 'apply_placement') {
        console.log('Completing placement support application');
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
              <span className="text-primary">Placement Support</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get your dream job with comprehensive placement assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-primary" />
                Our Placement Partners
              </CardTitle>
              <CardDescription>
                We've partnered with 100+ companies across various industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">250+</p>
                  <p className="text-sm text-muted-foreground">Placements</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">$85K</p>
                  <p className="text-sm text-muted-foreground">Avg Package</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Partners</p>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => {
                  executeProtectedAction(
                    'apply_placement',
                    {},
                    () => {
                      // Navigate to placement application
                      window.location.href = '/placement-support/apply';
                    }
                  );
                }}
              >
                Apply for Placement Support
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

export default PlacementSupport;
