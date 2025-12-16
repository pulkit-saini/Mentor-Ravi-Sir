import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Settings, Users, Calendar, BarChart3, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  // Fetch registered users
  const { data: profiles = [], isLoading: loadingProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch event registrations with user details
  const { data: registrations = [], isLoading: loadingRegistrations } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      const { data: regs, error } = await supabase
        .from('event_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch user details for each registration
      const withProfiles = await Promise.all(
        (regs || []).map(async (reg) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, mobile_number')
            .eq('id', reg.user_id)
            .single();
          
          return { ...reg, profile };
        })
      );
      
      return withProfiles;
    },
  });

  const handleLogout = async () => {
    await signOut();
  };

  const adminActions = [
    { 
      icon: Users, 
      label: "Total Users", 
      color: "bg-primary",
      value: profiles.length
    },
    { 
      icon: Calendar, 
      label: "Event Registrations", 
      color: "bg-secondary",
      value: registrations.length
    },
    { icon: Settings, label: "Platform Settings", color: "bg-accent" },
    { icon: BarChart3, label: "Analytics", color: "bg-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      Admin Portal 🛡️
                    </h1>
                    <p className="text-muted-foreground">
                      Full platform control and management
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminActions.map((action, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-6"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{action.value || '—'}</h3>
                  <p className="text-sm text-muted-foreground">{action.label}</p>
                </div>
              ))}
            </div>

            {/* Registered Users */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>All users who have signed up on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingProfiles ? (
                  <p className="text-muted-foreground">Loading users...</p>
                ) : profiles.length === 0 ? (
                  <p className="text-muted-foreground">No users registered yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">{profile.full_name || '—'}</TableCell>
                          <TableCell>{profile.email}</TableCell>
                          <TableCell>{profile.mobile_number || '—'}</TableCell>
                          <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Event Registrations */}
            <Card>
              <CardHeader>
                <CardTitle>Event Registrations</CardTitle>
                <CardDescription>All users who have registered for events</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingRegistrations ? (
                  <p className="text-muted-foreground">Loading registrations...</p>
                ) : registrations.length === 0 ? (
                  <p className="text-muted-foreground">No event registrations yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team Name</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell className="font-medium">{reg.team_name}</TableCell>
                          <TableCell>{reg.profile?.full_name || '—'}</TableCell>
                          <TableCell>{reg.profile?.email || '—'}</TableCell>
                          <TableCell>{reg.profile?.mobile_number || '—'}</TableCell>
                          <TableCell>
                            <Badge variant={reg.status === 'pending' ? 'secondary' : 'default'}>
                              {reg.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
