import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Info,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const eventsData: Record<string, any> = {
  "hackathon-2024": {
    id: "hackathon-2024",
    name: "Coding Hackathon 2024",
    status: "upcoming",
    date: "13 - 14 Nov, 2025",
    time: "from 9:00 AM",
    location: "Campus Hall",
    description: "Join us for an exciting 24-hour coding hackathon where you'll collaborate with peers to build innovative solutions to real-world problems.",
    banner: "bg-gradient-to-br from-primary to-primary-glow",
    participants: 150,
    maxParticipants: 200,
    registrationDeadline: "November 10, 2025",
    activationDate: "November 13, 2025, 9:00 AM",
    requirements: [
      "Laptop with development environment setup",
      "Basic programming knowledge",
      "Team of 3-4 members (can form teams on the day)",
    ],
    agenda: [
      { time: "9:00 AM", activity: "Registration & Team Formation" },
      { time: "10:00 AM", activity: "Opening Ceremony & Problem Statement Release" },
      { time: "10:30 AM", activity: "Hacking Begins" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "4:00 PM", activity: "Submission Deadline" },
      { time: "4:30 PM", activity: "Presentations & Judging" },
      { time: "5:30 PM", activity: "Awards Ceremony" },
    ],
    prizes: [
      { place: "1st Place", reward: "₹50,000 + Trophy" },
      { place: "2nd Place", reward: "₹30,000 + Trophy" },
      { place: "3rd Place", reward: "₹20,000 + Trophy" },
    ],
    organizer: {
      name: "Ravi Rautela",
      designation: "Event Coordinator",
    },
  },
  "tech-workshop-1": {
    id: "tech-workshop-1",
    name: "Tech Workshop - Web Development",
    status: "active",
    date: "Tomorrow, 10:00 AM",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual",
    description: "Join us for an intensive web development workshop covering modern frameworks and best practices.",
    banner: "bg-gradient-to-br from-secondary to-secondary/70",
  }
};

const StudentEventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
    }
  }, [navigate]);

  const event = eventId ? eventsData[eventId] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
              <Button onClick={() => navigate("/dashboard/student")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If event is active, redirect to event dashboard
  if (event.status === "active") {
    navigate(`/dashboard/student/event/${eventId}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => navigate("/dashboard/student")}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Dashboard
            </Button>

            {/* Event Status Alert */}
            <Alert className="mb-6 border-primary/50 bg-primary/5">
              <Bell className="h-5 w-5 text-primary" />
              <AlertTitle className="text-lg font-semibold">Event Not Yet Active</AlertTitle>
              <AlertDescription className="text-base mt-2">
                This event will become active on <strong>{event.activationDate}</strong>.
                <br />
                You'll be able to access the event dashboard and start working on tasks once the event begins.
              </AlertDescription>
            </Alert>

            {/* Event Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-96 h-96 ${event.banner} opacity-10 rounded-full blur-3xl`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3 border-primary text-primary">
                      {event.status === "upcoming" ? "Upcoming" : "Registered"}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                      {event.name}
                    </h1>
                    <p className="text-muted-foreground text-lg mb-6">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-lg">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="font-semibold">{event.participants}/{event.maxParticipants}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            {event.requirements && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Requirements
                  </CardTitle>
                  <CardDescription>Make sure you have the following before the event</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {event.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Event Agenda */}
            {event.agenda && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Event Agenda
                  </CardTitle>
                  <CardDescription>Schedule for the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.agenda.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <div className="text-sm font-semibold text-primary min-w-[80px]">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prizes */}
            {event.prizes && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Prizes & Rewards
                  </CardTitle>
                  <CardDescription>What you can win</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {event.prizes.map((prize: any, index: number) => (
                      <div key={index} className="p-4 border border-border rounded-lg text-center bg-gradient-subtle">
                        <p className="font-bold text-lg mb-2">{prize.place}</p>
                        <p className="text-2xl font-bold gradient-text mb-1">{prize.reward.split(' + ')[0]}</p>
                        <p className="text-sm text-muted-foreground">{prize.reward.split(' + ')[1]}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer Info */}
            {event.organizer && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                      {event.organizer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{event.organizer.name}</p>
                      <p className="text-sm text-muted-foreground">{event.organizer.designation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Important Dates */}
            <Alert className="border-accent/50 bg-accent/5">
              <AlertCircle className="h-5 w-5 text-accent" />
              <AlertTitle>Important Dates</AlertTitle>
              <AlertDescription className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Registration Deadline:</span>
                  <strong>{event.registrationDeadline}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Event Activation:</span>
                  <strong>{event.activationDate}</strong>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentEventDetails;
