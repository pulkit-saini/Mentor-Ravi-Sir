import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, BookOpen, Users, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const researchAreas = [
  {
    title: "Artificial Intelligence",
    description: "Machine learning, neural networks, and deep learning",
    icon: FlaskConical,
    projects: 12,
  },
  {
    title: "Blockchain & Web3",
    description: "Distributed systems and decentralized applications",
    icon: BookOpen,
    projects: 8,
  },
  {
    title: "Cybersecurity",
    description: "Network security and cryptography research",
    icon: Award,
    projects: 10,
  },
  {
    title: "Data Science",
    description: "Big data analytics and predictive modeling",
    icon: Users,
    projects: 15,
  },
];

const Research = () => {
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
      if (action.type === 'apply_research') {
        console.log('Completing research application');
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
              <span className="text-primary">Research</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Innovate and discover through cutting-edge research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {researchAreas.map((area, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {area.projects} active projects
                  </p>
                  <Button variant="outline" className="w-full">Explore</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Join Research Program</CardTitle>
                <CardDescription>
                  Collaborate with leading researchers and contribute to innovation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    executeProtectedAction(
                      'apply_research',
                      {},
                      () => {
                        // Navigate to research application
                        window.location.href = '/research/apply';
                      }
                    );
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit Research Proposal</CardTitle>
                <CardDescription>
                  Share your research ideas and get funding support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" variant="outline" className="w-full">
                  Submit Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
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

export default Research;
