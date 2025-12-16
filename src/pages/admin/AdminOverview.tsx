import { Users, Calendar, BookOpen, Briefcase, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, startOfMonth } from "date-fns";

const AdminOverview = () => {
  // Fetch real data from Supabase
  const { data: eventsCount } = useQuery({
    queryKey: ['admin-events-count'],
    queryFn: async () => {
      const { count } = await supabase.from('events').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: usersCount } = useQuery({
    queryKey: ['admin-users-count'],
    queryFn: async () => {
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: coursesCount } = useQuery({
    queryKey: ['admin-courses-count'],
    queryFn: async () => {
      const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: workshopsCount } = useQuery({
    queryKey: ['admin-workshops-count'],
    queryFn: async () => {
      const { count } = await supabase.from('workshops').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: internshipsCount } = useQuery({
    queryKey: ['admin-internships-count'],
    queryFn: async () => {
      const { count } = await supabase.from('internships').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: registrationsData } = useQuery({
    queryKey: ['admin-registrations-trend'],
    queryFn: async () => {
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const date = subMonths(new Date(), i);
        const monthStart = startOfMonth(date);
        const monthEnd = startOfMonth(subMonths(new Date(), i - 1));
        
        const { count } = await supabase
          .from('event_registrations')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', monthStart.toISOString())
          .lt('created_at', monthEnd.toISOString());
        
        months.push({
          month: format(date, 'MMM'),
          students: count || 0
        });
      }
      return months;
    }
  });

  const { data: courseEnrollments } = useQuery({
    queryKey: ['admin-course-enrollments'],
    queryFn: async () => {
      const { data: courses } = await supabase
        .from('courses')
        .select('title, id');
      
      if (!courses) return [];

      const enrollmentPromises = courses.map(async (course) => {
        const { count } = await supabase
          .from('user_courses')
          .select('*', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        return {
          name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
          value: count || 0
        };
      });

      const enrollments = await Promise.all(enrollmentPromises);
      return enrollments.filter(e => e.value > 0).slice(0, 5);
    }
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['admin-upcoming-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('title, start_at, id')
        .gte('start_at', new Date().toISOString())
        .order('start_at', { ascending: true })
        .limit(3);
      
      if (!data) return [];

      const eventsWithParticipants = await Promise.all(
        data.map(async (event) => {
          const { count } = await supabase
            .from('event_registrations')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id);
          
          return {
            name: event.title,
            date: format(new Date(event.start_at), 'MMM dd, yyyy'),
            participants: count || 0
          };
        })
      );

      return eventsWithParticipants;
    }
  });

  const stats = [
    {
      icon: Calendar,
      label: "Total Events",
      value: eventsCount?.toString() || "0",
      change: "Active events",
      color: "bg-primary",
      link: "/admin/events"
    },
    {
      icon: Users,
      label: "Total Users",
      value: usersCount?.toString() || "0",
      change: "Registered users",
      color: "bg-secondary",
      link: "/admin/users"
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: coursesCount?.toString() || "0",
      change: "Available courses",
      color: "bg-accent",
      link: "/admin/courses"
    },
    {
      icon: Briefcase,
      label: "Internships",
      value: internshipsCount?.toString() || "0",
      change: "Available opportunities",
      color: "bg-success",
      link: "/admin/internships"
    }
  ];

  const participationData = registrationsData || [];
  const courseEnrollmentData = courseEnrollments || [];
  
  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--muted))"];
  
  const recentActivity = [
    {
      action: "Event registrations",
      details: "Students signing up for events",
      time: "Real-time"
    },
    {
      action: "Course enrollments",
      details: "Active course participation",
      time: "Real-time"
    },
    {
      action: "Workshop attendance",
      details: "Students in workshops",
      time: "Real-time"
    }
  ];

  const upcomingEventsData = upcomingEvents || [];
  return <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Link key={index} to={stat.link}>
            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>)}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Participation Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Event Participation Trend</CardTitle>
            <CardDescription>Monthly student participation growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} />
                <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} dot={{
                fill: "hsl(var(--primary))"
              }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Enrollment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollment Distribution</CardTitle>
            <CardDescription>Popular courses breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={courseEnrollmentData} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {courseEnrollmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Section */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Activity className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEventsData.length > 0 ? (
                upcomingEventsData.map((event, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-sm mb-1">{event.name}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>📅 {event.date}</span>
                      <span>👥 {event.participants} participants</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
              )}
            </div>
            <Link to="/admin/events">
              <Button variant="outline" className="w-full mt-4">Manage Events</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/events">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Manage Events
              </Button>
            </Link>
            <Link to="/admin/courses">
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Courses
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/notifications">
              <Button variant="outline" className="w-full">
                <Activity className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default AdminOverview;