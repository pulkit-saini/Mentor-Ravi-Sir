import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Mail, Shield, Award, Eye, Trash2 } from "lucide-react";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("students");

  const mockUsers = {
    students: [
      { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", points: 2450, events: 8, courses: 5, level: "Gold" },
      { id: 2, name: "Mike Chen", email: "mike.c@example.com", points: 2320, events: 7, courses: 4, level: "Gold" },
      { id: 3, name: "Emma Williams", email: "emma.w@example.com", points: 2180, events: 6, courses: 6, level: "Silver" },
    ],
    judges: [
      { id: 1, name: "Dr. Robert Smith", email: "r.smith@example.com", events: 12, specialization: "AI/ML" },
      { id: 2, name: "Prof. Lisa Anderson", email: "l.anderson@example.com", events: 9, specialization: "Web Dev" },
    ],
    admins: [
      { id: 1, name: "Ravi Sir", email: "ravi@example.com", role: "SuperAdmin", lastActive: "2 mins ago" },
      { id: 2, name: "Admin User", email: "admin@example.com", role: "Admin", lastActive: "1 hour ago" },
    ]
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage students, judges, and admins</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="students">Students ({mockUsers.students.length})</TabsTrigger>
          <TabsTrigger value="judges">Judges ({mockUsers.judges.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({mockUsers.admins.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4 mt-6">
          {mockUsers.students.map((student) => (
            <Card key={student.id} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge>{student.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>🏆 {student.points} points</span>
                        <span>📅 {student.events} events</span>
                        <span>📚 {student.courses} courses</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="judges" className="space-y-4 mt-6">
          {mockUsers.judges.map((judge) => (
            <Card key={judge.id} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{judge.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {judge.email}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>📅 {judge.events} events judged</span>
                        <span>🎯 {judge.specialization}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="admins" className="space-y-4 mt-6">
          {mockUsers.admins.map((admin) => (
            <Card key={admin.id} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{admin.name}</h3>
                        <Badge variant={admin.role === "SuperAdmin" ? "default" : "secondary"}>
                          {admin.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {admin.email}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Last active: {admin.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {admin.role !== "SuperAdmin" && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;
