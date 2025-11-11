import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const hackathons = [
  {
    title: "AI Innovation Challenge",
    date: "March 15-17, 2026",
    participants: "200+",
    prize: "$10,000",
  },
  {
    title: "Web3 Builder Sprint",
    date: "April 5-7, 2026",
    participants: "150+",
    prize: "$7,500",
  },
  {
    title: "IoT Solutions Hackathon",
    date: "May 10-12, 2026",
    participants: "180+",
    prize: "$8,000",
  },
  {
    title: "Social Impact Hack",
    date: "June 20-22, 2026",
    participants: "220+",
    prize: "$12,000",
  },
];

const Hackathons = () => {
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();
  
  const [selectedHackathon, setSelectedHackathon] = useState<typeof hackathons[0] | null>(null);
  
  // Handle pending action after login
  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'register_hackathon' && action.data) {
        console.log('Completing hackathon registration:', action.data);
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
              <span className="text-primary">Hackathons</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Battle for excellence and showcase your innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {hackathons.map((hackathon, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    {hackathon.title}
                  </CardTitle>
                  <CardDescription>Compete, innovate, and win</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{hackathon.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{hackathon.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Award className="w-4 h-4" />
                      <span>Prize Pool: {hackathon.prize}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      executeProtectedAction(
                        'register_hackathon',
                        hackathon,
                        () => {
                          setSelectedHackathon(hackathon);
                          // Navigate to hackathon registration
                          window.location.href = `/hackathon/${hackathon.title.toLowerCase().replace(/\s+/g, '-')}`;
                        }
                      );
                    }}
                  >
                    Register Team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Organize Your Hackathon</CardTitle>
              <CardDescription>
                Host your own hackathon and bring innovators together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full">Propose Hackathon</Button>
            </CardContent>
          </Card>
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

export default Hackathons;
