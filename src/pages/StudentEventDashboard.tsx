import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Upload,
  MessageSquare,
  Trophy,
  Award,
  FileText,
  Video,
  CheckCircle2,
  Circle,
  Timer,
  Star,
  HelpCircle,
  Send,
} from "lucide-react";

const StudentEventDashboard = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState("02:45:30");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [mentorshipMessage, setMentorshipMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
    }
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 2);
    targetTime.setMinutes(targetTime.getMinutes() + 45);
    targetTime.setSeconds(targetTime.getSeconds() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setCountdown("00:00:00");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mock data - will be replaced with real data from backend
  const eventData = {
    id: eventId,
    name: "Tech Workshop - Web Development",
    banner: "/placeholder.svg",
    date: "Tomorrow, 10:00 AM",
    location: "Virtual",
    description:
      "Join us for an intensive web development workshop covering modern frameworks and best practices.",
    progress: 45,
    status: "active",
  };

  const teamData = {
    name: "Code Warriors",
    logo: "/placeholder.svg",
    slogan: "Innovation Through Code",
    description: "A passionate team dedicated to solving real-world problems with technology.",
    members: [
      { id: 1, name: "John Doe", role: "Team Leader", status: "active", avatar: "" },
      { id: 2, name: "Jane Smith", role: "Developer", status: "active", avatar: "" },
      { id: 3, name: "Mike Johnson", role: "Designer", status: "offline", avatar: "" },
      { id: 4, name: "Sarah Williams", role: "Developer", status: "active", avatar: "" },
    ],
  };

  const judges = [
    { id: 1, name: "Dr. Sarah Johnson", designation: "Senior Mentor", avatar: "" },
    { id: 2, name: "Prof. Michael Chen", designation: "Tech Lead", avatar: "" },
    { id: 3, name: "Sir", designation: "Event Coordinator", avatar: "" },
  ];

  const allTasks = [
    {
      id: 1,
      name: "Team Name & Logo",
      description: "Create your team identity with a unique name and logo",
      timeLimit: "30 mins",
      status: "completed",
      points: 10,
      feedback: "Great creativity! Logo looks professional.",
      scheduledStart: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: 2,
      name: "Team Slogan",
      description: "Craft an inspiring slogan that represents your team's mission",
      timeLimit: "15 mins",
      status: "completed",
      points: 5,
      feedback: "",
      scheduledStart: new Date(Date.now() - 2400000), // 40 mins ago
    },
    {
      id: 3,
      name: "Team Intro Video",
      description: "Record a 2-minute video introducing your team members",
      timeLimit: "1 hour",
      status: "in-progress",
      points: 15,
      feedback: "",
      scheduledStart: new Date(Date.now() - 1800000), // 30 mins ago
    },
    {
      id: 4,
      name: "Problem Statement",
      description: "Define the problem you're solving with detailed analysis",
      timeLimit: "45 mins",
      status: "not-started",
      points: 20,
      feedback: "",
      scheduledStart: new Date(Date.now() + 300000), // 5 mins from now
    },
    {
      id: 5,
      name: "Solution",
      description: "Present your innovative solution to the problem",
      timeLimit: "1 hour",
      status: "not-started",
      points: 25,
      feedback: "",
      scheduledStart: new Date(Date.now() + 1800000), // 30 mins from now
    },
    {
      id: 6,
      name: "Prototype Drawing",
      description: "Create detailed sketches or wireframes of your solution",
      timeLimit: "1.5 hours",
      status: "not-started",
      points: 20,
      feedback: "",
      scheduledStart: new Date(Date.now() + 3600000), // 1 hour from now
    },
    {
      id: 7,
      name: "Presentation",
      description: "Prepare a comprehensive presentation of your project",
      timeLimit: "2 hours",
      status: "not-started",
      points: 30,
      feedback: "",
      scheduledStart: new Date(Date.now() + 7200000), // 2 hours from now
    },
    {
      id: 8,
      name: "Final Submission",
      description: "Submit all deliverables and create your LinkedIn post",
      timeLimit: "30 mins",
      status: "not-started",
      points: 20,
      feedback: "",
      scheduledStart: new Date(Date.now() + 10800000), // 3 hours from now
    },
  ];

  // Show all tasks
  const tasks = allTasks;

  // Helper function to check if task is available
  const isTaskAvailable = (task: typeof allTasks[0]) => {
    const now = new Date();
    return task.scheduledStart <= now;
  };

  const leaderboard = [
    { rank: 1, team: "Innovation Squad", points: 145, avatar: "" },
    { rank: 2, team: "Code Warriors", points: 75, avatar: "", isCurrentTeam: true },
    { rank: 3, team: "Tech Titans", points: 70, avatar: "" },
  ];

  const badges = [
    { name: "Early Bird", description: "First to submit Task 1", earned: true },
    { name: "Speed Demon", description: "Fastest Task 2 completion", earned: true },
    { name: "Team Player", description: "All members contributed", earned: false },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Timer className="h-5 w-5 text-warning" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/20 text-success-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-warning/20 text-warning-foreground">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const handleFileUpload = (taskId: number) => {
    if (!uploadFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "File uploaded successfully",
      description: `Task ${taskId} file has been submitted`,
    });
    setUploadFile(null);
    setSelectedTask(null);
  };

  const handleSendMessage = (recipientName: string) => {
    if (!chatMessage.trim()) return;

    toast({
      title: "Message sent",
      description: `Your message to ${recipientName} has been sent`,
    });
    setChatMessage("");
  };

  const handleMentorshipRequest = () => {
    if (!mentorshipMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please describe what you need help with",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mentorship request sent",
      description: "Sir will review your request and get back to you soon",
    });
    setMentorshipMessage("");
  };

  // Separate available and locked tasks
  const availableTasks = tasks.filter((task) => isTaskAvailable(task));
  const lockedTasks = tasks.filter((task) => !isTaskAvailable(task));

  // Render a single task card
  const renderTaskCard = (task: typeof allTasks[0], isBlurred: boolean = false) => (
    <div key={task.id} className={`p-5 border border-border rounded-lg transition-all ${isBlurred ? "blur-sm pointer-events-none opacity-60" : "hover:border-primary/50"}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">{getStatusIcon(task.status)}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-lg">
                  Task {task.id}: {task.name}
                </h3>
                {getStatusBadge(task.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {task.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {task.timeLimit}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {task.points} points
                </span>
              </div>
            </div>
          </div>

          {task.feedback && (
            <div className="mt-3 p-3 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-sm font-semibold mb-1 text-success-foreground">
                Judge Feedback:
              </p>
              <p className="text-sm text-muted-foreground">{task.feedback}</p>
            </div>
          )}

          {!isBlurred && (
            <div className="flex gap-2 mt-4">
              {task.status === "completed" ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Submission
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Task {task.id} Submission</DialogTitle>
                        <DialogDescription>
                          Your submitted work for {task.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-muted/20">
                          <p className="text-sm">
                            Submission details would appear here
                          </p>
                        </div>
                        {task.feedback && (
                          <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                            <p className="text-sm font-semibold mb-1">
                              Judge Feedback:
                            </p>
                            <p className="text-sm">{task.feedback}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Resubmit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Resubmit Task {task.id}</DialogTitle>
                        <DialogDescription>
                          Upload a new submission for {task.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Upload File</Label>
                          <Input
                            type="file"
                            onChange={(e) =>
                              setUploadFile(e.target.files?.[0] || null)
                            }
                          />
                        </div>
                        <Button
                          onClick={() => handleFileUpload(task.id)}
                          className="w-full"
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  <Dialog
                    open={selectedTask === task.id}
                    onOpenChange={(open) => {
                      setSelectedTask(open ? task.id : null);
                      if (!open) setUploadFile(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Upload className="h-4 w-4 mr-2" />
                        {task.status === "in-progress" ? "Continue" : "Start Task"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Task {task.id}: {task.name}</DialogTitle>
                        <DialogDescription>{task.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.timeLimit}
                          </Badge>
                          <Badge variant="outline">
                            <Trophy className="h-3 w-3 mr-1" />
                            {task.points} points
                          </Badge>
                        </div>
                        <div>
                          <Label>Upload Your Work</Label>
                          <Input
                            type="file"
                            onChange={(e) =>
                              setUploadFile(e.target.files?.[0] || null)
                            }
                          />
                          {uploadFile && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Selected: {uploadFile.name}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={() => handleFileUpload(task.id)}
                          className="w-full"
                        >
                          Submit Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {task.status === "in-progress" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Task Preview</DialogTitle>
                          <DialogDescription>
                            Review your work before final submission
                          </DialogDescription>
                        </DialogHeader>
                        <div className="p-4 border rounded-lg bg-muted/20">
                          <p className="text-sm text-muted-foreground">
                            Preview content would appear here
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard/student")}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            {/* Event Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-success/20 text-success-foreground">
                      {eventData.status === "active" ? "🔴 Live Event" : "Upcoming"}
                    </Badge>
                    <h1 className="text-4xl font-bold mb-3 gradient-text">
                      {eventData.name}
                    </h1>
                    <p className="text-muted-foreground mb-4">{eventData.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{eventData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-warning">{countdown}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text mb-2">
                      {eventData.progress}%
                    </div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event Progress</span>
                    <span className="font-semibold">3 of 8 tasks completed</span>
                  </div>
                  <Progress value={eventData.progress} className="h-3" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Left Column - Team & Judges */}
              <div className="space-y-8">
                {/* Team Section */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      {teamData.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{teamData.name}</h2>
                      <p className="text-sm text-primary italic">&quot;{teamData.slogan}&quot;</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{teamData.description}</p>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Team Members
                      </h3>
                      <Badge variant="outline">{teamData.members.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {teamData.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-border">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              member.status === "active" ? "bg-success" : "bg-muted"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Team Chat
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Team Chat</DialogTitle>
                          <DialogDescription>
                            Collaborate with your team members in real-time
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="h-[300px] border rounded-lg p-4 overflow-y-auto bg-muted/20">
                            <p className="text-sm text-muted-foreground text-center py-8">
                              No messages yet. Start the conversation!
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Type your message..."
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSendMessage("Team");
                                }
                              }}
                            />
                            <Button onClick={() => handleSendMessage("Team")}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Shared Files
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Shared Files</DialogTitle>
                          <DialogDescription>
                            Upload and access team files
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-4">
                              Drag and drop files here or click to browse
                            </p>
                            <Input type="file" className="max-w-xs mx-auto" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold">Recent Files</p>
                            <p className="text-sm text-muted-foreground">No files uploaded yet</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Judges & Admin */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Judges & Mentors
                  </h3>
                  <div className="space-y-3">
                    {judges.map((judge) => (
                      <div key={judge.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={judge.avatar} />
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                            {judge.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{judge.name}</p>
                          <p className="text-xs text-muted-foreground">{judge.designation}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Message {judge.name}</DialogTitle>
                              <DialogDescription>
                                Send a message to your judge
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Type your message..."
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                rows={4}
                              />
                              <Button
                                onClick={() => handleSendMessage(judge.name)}
                                className="w-full"
                              >
                                Send Message
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points & Badges */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Points & Badges
                  </h3>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold gradient-text mb-1">75</div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    {badges.map((badge, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          badge.earned
                            ? "border-primary/50 bg-primary/5"
                            : "border-border bg-muted/20"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Award
                            className={`h-4 w-4 ${
                              badge.earned ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          <span
                            className={`font-semibold text-sm ${
                              badge.earned ? "" : "text-muted-foreground"
                            }`}
                          >
                            {badge.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard Snapshot */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    Leaderboard
                  </h3>
                  <div className="space-y-3 mb-4">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          entry.isCurrentTeam
                            ? "bg-primary/10 border border-primary/50"
                            : "bg-muted/30"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            entry.rank === 1
                              ? "bg-yellow-500 text-white"
                              : entry.rank === 2
                              ? "bg-gray-400 text-white"
                              : entry.rank === 3
                              ? "bg-orange-600 text-white"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{entry.team}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{entry.points}</p>
                          <p className="text-xs text-muted-foreground">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Leaderboard",
                        description: "Full leaderboard feature coming soon!",
                      });
                    }}
                  >
                    View Full Leaderboard
                  </Button>
                </div>
              </div>

              {/* Right Column - Tasks */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Event Tasks</h2>
                    <Badge variant="outline">
                      {tasks.filter((t) => t.status === "completed").length} / {tasks.length}{" "}
                      Completed
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Available Tasks */}
                    {availableTasks.map((task) => (
                      <div key={task.id}>
                        {renderTaskCard(task, false)}
                      </div>
                    ))}

                    {/* Locked Tasks Section */}
                    {lockedTasks.length > 0 && (
                      <div className="relative">
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                          <div className="glass-card rounded-xl px-6 py-4 border-2 border-primary/30 bg-primary/5">
                            <p className="text-sm font-semibold text-primary flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Other tasks will unlock upon completion of previous tasks
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {lockedTasks.map((task) => (
                            <div key={task.id}>
                              {renderTaskCard(task, true)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mentorship & Support */}
                <div className="glass-card rounded-xl p-6 mt-8">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Need Help?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="h-auto py-4 flex-col gap-2" variant="outline">
                          <MessageSquare className="h-6 w-6" />
                          <div>
                            <p className="font-semibold">Request Mentorship</p>
                            <p className="text-xs text-muted-foreground">
                              Schedule a session with Sir
                            </p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Mentorship</DialogTitle>
                          <DialogDescription>
                            Tell us what you need help with and we&apos;ll schedule a session
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>What do you need help with?</Label>
                            <Textarea
                              placeholder="Describe your challenge or question..."
                              value={mentorshipMessage}
                              onChange={(e) => setMentorshipMessage(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label>Preferred Time</Label>
                            <Input type="datetime-local" />
                          </div>
                          <Button onClick={handleMentorshipRequest} className="w-full">
                            Send Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="h-auto py-4 flex-col gap-2" variant="outline">
                          <FileText className="h-6 w-6" />
                          <div>
                            <p className="font-semibold">Event Resources</p>
                            <p className="text-xs text-muted-foreground">
                              Guidelines & materials
                            </p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Event Resources</DialogTitle>
                          <DialogDescription>
                            Download helpful materials and guidelines
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3">
                          {[
                            { name: "Event Guidelines", type: "PDF" },
                            { name: "Task Templates", type: "ZIP" },
                            { name: "Presentation Template", type: "PPTX" },
                            { name: "Judging Criteria", type: "PDF" },
                          ].map((resource, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium text-sm">{resource.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {resource.type} Document
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentEventDashboard;
