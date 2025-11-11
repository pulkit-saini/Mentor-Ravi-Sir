import { useState } from "react";
import { Search, Download, Eye, FileText, Award, Share2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";

const mockCertificates = [
  {
    id: 1,
    name: "Hackathon 2024 Winner",
    type: "event",
    recipients: 12,
    issued: "2024-01-15",
    template: "winner_template",
    linkedInShares: 8,
    status: "active"
  },
  {
    id: 2,
    name: "React Mastery Course",
    type: "course",
    recipients: 45,
    issued: "2024-01-10",
    template: "course_template",
    linkedInShares: 32,
    status: "active"
  },
  {
    id: 3,
    name: "AI Workshop Completion",
    type: "event",
    recipients: 28,
    issued: "2024-01-08",
    template: "workshop_template",
    linkedInShares: 15,
    status: "active"
  },
  {
    id: 4,
    name: "Design Sprint Champion",
    type: "event",
    recipients: 8,
    issued: "2024-01-05",
    template: "champion_template",
    linkedInShares: 6,
    status: "draft"
  },
];

const mockTemplates = [
  { id: "winner_template", name: "Winner Template", color: "Gold" },
  { id: "course_template", name: "Course Completion", color: "Blue" },
  { id: "workshop_template", name: "Workshop Template", color: "Purple" },
  { id: "champion_template", name: "Champion Template", color: "Red" },
];

const mockStats = [
  { label: "Total Issued", value: 93, icon: FileText },
  { label: "LinkedIn Shares", value: 61, icon: Share2 },
  { label: "Active Templates", value: 4, icon: Award },
];

const AdminCertificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || cert.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Certificates Dashboard</h1>
        <p className="text-muted-foreground">Create, manage, and track certificate distribution</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="course">Course</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create New Certificate</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Certificate</DialogTitle>
                  <DialogDescription>
                    Design a new certificate template
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Certificate Name</Label>
                    <Input placeholder="e.g. Hackathon 2024 Winner" />
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
                        <SelectItem value="achievement">Achievement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Certificate description for LinkedIn..." />
                  </div>
                </div>
                <Button className="w-full">Create Certificate</Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Manage Templates</Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={cert.type === "event" ? "default" : "secondary"}>
                      {cert.type}
                    </Badge>
                    <Badge variant={cert.status === "active" ? "default" : "outline"}>
                      {cert.status}
                    </Badge>
                  </div>
                </div>
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recipients</span>
                  <span className="font-medium">{cert.recipients} students</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Issued Date</span>
                  <span className="font-medium">{cert.issued}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Template</span>
                  <span className="font-medium">
                    {mockTemplates.find(t => t.id === cert.template)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">LinkedIn Shares</span>
                  <span className="font-medium flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    {cert.linkedInShares} / {cert.recipients}
                  </span>
                </div>

                <div className="flex gap-2 pt-3 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCertificates;
