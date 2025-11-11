import { useState } from "react";
import { Search, Calendar, Clock, CheckCircle, XCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mockRequests = [
  {
    id: 1,
    student: "Alex Chen",
    topic: "React Performance Optimization",
    description: "Need help understanding React.memo and useMemo for my project",
    status: "pending",
    date: "2024-01-15",
    priority: "high"
  },
  {
    id: 2,
    student: "Sarah Kim",
    topic: "Career Guidance in AI/ML",
    description: "Want to discuss career paths in machine learning and AI",
    status: "approved",
    date: "2024-01-14",
    priority: "medium",
    scheduledDate: "2024-01-20",
    scheduledTime: "2:00 PM"
  },
  {
    id: 3,
    student: "John Doe",
    topic: "Backend Architecture Design",
    description: "Looking for guidance on microservices architecture",
    status: "completed",
    date: "2024-01-10",
    priority: "medium",
    feedback: "Very helpful session! Learned a lot about system design."
  },
  {
    id: 4,
    student: "Emily Brown",
    topic: "UI/UX Design Principles",
    description: "Need mentorship on design systems and component libraries",
    status: "pending",
    date: "2024-01-16",
    priority: "low"
  },
];

const mockStats = [
  { label: "Pending Requests", value: 8, icon: Clock, color: "text-yellow-500" },
  { label: "Scheduled Sessions", value: 12, icon: Calendar, color: "text-blue-500" },
  { label: "Completed", value: 45, icon: CheckCircle, color: "text-green-500" },
  { label: "Total Requests", value: 65, icon: User, color: "text-purple-500" },
];

const AdminMentorship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const filteredRequests = mockRequests.filter(req => {
    const matchesSearch = req.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || req.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mentorship Dashboard</h1>
        <p className="text-muted-foreground">Manage mentorship requests and schedule sessions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student name or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button>Schedule New Session</Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No mentorship requests found
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <Card key={request.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {request.student.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{request.student}</h4>
                              <Badge
                                variant={
                                  request.status === "pending" ? "secondary" :
                                  request.status === "approved" ? "default" :
                                  "outline"
                                }
                              >
                                {request.status}
                              </Badge>
                              <Badge variant="outline">{request.priority} priority</Badge>
                            </div>
                            <p className="text-sm font-medium mb-1">{request.topic}</p>
                            <p className="text-sm text-muted-foreground mb-2">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Requested: {request.date}
                              </span>
                              {request.scheduledDate && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Scheduled: {request.scheduledDate} at {request.scheduledTime}
                                </span>
                              )}
                            </div>
                            {request.feedback && (
                              <div className="mt-2 p-2 bg-secondary rounded text-sm">
                                <strong>Feedback:</strong> {request.feedback}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" onClick={() => setSelectedRequest(request)}>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Schedule Mentorship Session</DialogTitle>
                                    <DialogDescription>
                                      Schedule a session with {request.student}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div>
                                      <Label>Date</Label>
                                      <Input type="date" />
                                    </div>
                                    <div>
                                      <Label>Time</Label>
                                      <Input type="time" />
                                    </div>
                                    <div>
                                      <Label>Notes (Optional)</Label>
                                      <Textarea placeholder="Add any notes for the session..." />
                                    </div>
                                  </div>
                                  <Button className="w-full">Confirm Schedule</Button>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="outline">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status === "approved" && (
                            <Button size="sm" variant="outline">View Details</Button>
                          )}
                          {request.status === "completed" && (
                            <Button size="sm" variant="outline">View Feedback</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMentorship;
