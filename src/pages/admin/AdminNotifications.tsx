import { useState } from "react";
import { Send, Bell, Users, Calendar, BookOpen, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";

const mockNotifications = [
  {
    id: 1,
    title: "Hackathon 2024 Registration Open",
    message: "Join us for the biggest hackathon of the year! Registration closes in 3 days.",
    type: "event",
    audience: "all",
    status: "sent",
    sentDate: "2024-01-15",
    recipients: 234
  },
  {
    id: 2,
    title: "New React Course Available",
    message: "Learn React from basics to advanced. Enroll now and get early bird discount!",
    type: "course",
    audience: "students",
    status: "scheduled",
    scheduledDate: "2024-01-20",
    recipients: 156
  },
  {
    id: 3,
    title: "Mentorship Session Reminder",
    message: "Your mentorship session is scheduled for tomorrow at 2 PM.",
    type: "mentorship",
    audience: "specific",
    status: "draft",
    recipients: 12
  },
  {
    id: 4,
    title: "System Maintenance Notice",
    message: "Platform will be under maintenance on Sunday from 2 AM to 6 AM.",
    type: "announcement",
    audience: "all",
    status: "sent",
    sentDate: "2024-01-10",
    recipients: 456
  },
];

const mockStats = [
  { label: "Total Sent", value: 156, icon: Send },
  { label: "Scheduled", value: 8, icon: Calendar },
  { label: "Drafts", value: 3, icon: Edit },
  { label: "Open Rate", value: "78%", icon: Bell },
];

const AdminNotifications = () => {
  const [selectedType, setSelectedType] = useState("all");

  const filteredNotifications = selectedType === "all" 
    ? mockNotifications 
    : mockNotifications.filter(n => n.type === selectedType);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notifications Dashboard</h1>
        <p className="text-muted-foreground">Send announcements and manage notifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {mockStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Notification */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Notification Title</Label>
                <Input placeholder="Enter notification title..." />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea 
                  placeholder="Enter your message..." 
                  className="min-h-[120px]"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Target Audience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="judges">Judges Only</SelectItem>
                    <SelectItem value="specific">Specific Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Delivery Method</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In-App Notification</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notification</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notification</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <Label>Schedule (Optional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="time" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Notification History</CardTitle>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="mentorship">Mentorship</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <Badge
                          variant={
                            notification.status === "sent" ? "default" :
                            notification.status === "scheduled" ? "secondary" :
                            "outline"
                          }
                        >
                          {notification.status}
                        </Badge>
                        <Badge variant="outline">{notification.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {notification.recipients} recipients
                        </span>
                        {notification.sentDate && (
                          <span>Sent: {notification.sentDate}</span>
                        )}
                        {notification.scheduledDate && (
                          <span>Scheduled: {notification.scheduledDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {notification.status === "draft" && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default AdminNotifications;
