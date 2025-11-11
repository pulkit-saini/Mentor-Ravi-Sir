import { useState } from "react";
import { Search, Trophy, Award, Medal, TrendingUp, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const mockLeaderboard = [
  {
    rank: 1,
    student: "Alex Chen",
    points: 2850,
    badges: 12,
    eventsCompleted: 8,
    tasksCompleted: 45,
    trend: "up",
    level: "Expert"
  },
  {
    rank: 2,
    student: "Sarah Kim",
    points: 2720,
    badges: 11,
    eventsCompleted: 7,
    tasksCompleted: 42,
    trend: "up",
    level: "Expert"
  },
  {
    rank: 3,
    student: "John Doe",
    points: 2590,
    badges: 10,
    eventsCompleted: 7,
    tasksCompleted: 40,
    trend: "same",
    level: "Advanced"
  },
  {
    rank: 4,
    student: "Emily Brown",
    points: 2430,
    badges: 9,
    eventsCompleted: 6,
    tasksCompleted: 38,
    trend: "up",
    level: "Advanced"
  },
  {
    rank: 5,
    student: "Michael Lee",
    points: 2280,
    badges: 8,
    eventsCompleted: 6,
    tasksCompleted: 35,
    trend: "down",
    level: "Advanced"
  },
];

const mockBadges = [
  { name: "Hackathon Winner", count: 45, icon: Trophy, color: "text-yellow-500" },
  { name: "Course Completion", count: 120, icon: Award, color: "text-blue-500" },
  { name: "Top Performer", count: 32, icon: Medal, color: "text-purple-500" },
  { name: "Team Player", count: 78, icon: TrendingUp, color: "text-green-500" },
];

const AdminLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredLeaderboard = mockLeaderboard.filter(student =>
    student.student.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Leaderboard Dashboard</h1>
        <p className="text-muted-foreground">Track student performance and manage points</p>
      </div>

      {/* Badges Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {mockBadges.map((badge, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{badge.name}</p>
                  <p className="text-2xl font-bold">{badge.count}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Awarded</p>
                </div>
                <badge.icon className={`h-8 w-8 ${badge.color}`} />
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
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="event">By Event</SelectItem>
                <SelectItem value="course">By Course</SelectItem>
                <SelectItem value="level">By Level</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Points (New Season)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLeaderboard.map((student) => (
              <Card key={student.rank} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Rank Badge */}
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                        student.rank === 1 ? "bg-yellow-500 text-white" :
                        student.rank === 2 ? "bg-gray-400 text-white" :
                        student.rank === 3 ? "bg-orange-600 text-white" :
                        "bg-secondary"
                      }`}>
                        {student.rank}
                      </div>

                      {/* Student Info */}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {student.student.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{student.student}</h4>
                          <Badge variant="outline">{student.level}</Badge>
                          {student.trend === "up" && (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{student.eventsCompleted} Events</span>
                          <span>{student.tasksCompleted} Tasks</span>
                          <span>{student.badges} Badges</span>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{student.points}</p>
                        <p className="text-xs text-muted-foreground">Total Points</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                            <Edit2 className="h-4 w-4 mr-1" />
                            Adjust
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adjust Points for {student.student}</DialogTitle>
                            <DialogDescription>
                              Manually adjust points or badges (SuperAdmin only)
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>Add/Remove Points</Label>
                              <Input type="number" placeholder="e.g. +100 or -50" />
                            </div>
                            <div>
                              <Label>Reason</Label>
                              <Input placeholder="Reason for adjustment" />
                            </div>
                          </div>
                          <Button className="w-full">Save Changes</Button>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="ghost">View Profile</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeaderboard;
