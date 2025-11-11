import { useState } from "react";
import { Search, Upload, Image, FileText, Video, Folder, Trash2, Download, Eye } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockMedia = [
  {
    id: 1,
    name: "hackathon-2024-hero.jpg",
    type: "image",
    size: "2.4 MB",
    category: "events",
    uploadedBy: "Admin",
    uploadDate: "2024-01-15",
    url: "/placeholder.svg"
  },
  {
    id: 2,
    name: "course-react-thumbnail.png",
    type: "image",
    size: "1.8 MB",
    category: "courses",
    uploadedBy: "Admin",
    uploadDate: "2024-01-14",
    url: "/placeholder.svg"
  },
  {
    id: 3,
    name: "event-schedule.pdf",
    type: "document",
    size: "345 KB",
    category: "events",
    uploadedBy: "Admin",
    uploadDate: "2024-01-13",
    url: "#"
  },
  {
    id: 4,
    name: "intro-video.mp4",
    type: "video",
    size: "15.2 MB",
    category: "courses",
    uploadedBy: "Admin",
    uploadDate: "2024-01-12",
    url: "#"
  },
  {
    id: 5,
    name: "certificate-template.png",
    type: "image",
    size: "890 KB",
    category: "certificates",
    uploadedBy: "Admin",
    uploadDate: "2024-01-11",
    url: "/placeholder.svg"
  },
  {
    id: 6,
    name: "student-guidelines.pdf",
    type: "document",
    size: "523 KB",
    category: "general",
    uploadedBy: "Admin",
    uploadDate: "2024-01-10",
    url: "#"
  },
];

const mockStats = [
  { label: "Total Files", value: 156, icon: FileText },
  { label: "Images", value: 89, icon: Image },
  { label: "Videos", value: 23, icon: Video },
  { label: "Documents", value: 44, icon: FileText },
];

const AdminMedia = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredMedia = mockMedia.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || file.category === filterCategory;
    const matchesTab = activeTab === "all" || file.type === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-8 w-8 text-blue-500" />;
      case "video": return <Video className="h-8 w-8 text-purple-500" />;
      case "document": return <FileText className="h-8 w-8 text-orange-500" />;
      default: return <FileText className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Media Library</h1>
        <p className="text-muted-foreground">Manage all media files, images, videos, and documents</p>
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

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="certificates">Certificates</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredMedia.length === 0 ? (
                <div className="text-center py-12">
                  <Folder className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No files found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedia.map((file) => (
                    <Card key={file.id} className="border">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* File Preview */}
                          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                            {file.type === "image" ? (
                              <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              getFileIcon(file.type)
                            )}
                          </div>

                          {/* File Info */}
                          <div>
                            <h4 className="font-medium text-sm truncate mb-1">{file.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {file.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            <p>Uploaded by {file.uploadedBy}</p>
                            <p>{file.uploadDate}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;
