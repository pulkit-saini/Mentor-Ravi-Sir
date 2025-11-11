import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Users, ClipboardCheck, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoadingFallback } from "@/components/LoadingFallback";
import { format } from "date-fns";

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  status: string;
  banner_url: string | null;
  created_at: string;
}

const JudgeDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkshops();
    }
  }, [user]);

  const fetchWorkshops = async () => {
    if (!user) return;

    try {
      // Fetch workshops where this judge is assigned
      const { data: judgeAssignments, error: judgeError } = await supabase
        .from('workshop_judges')
        .select('workshop_id')
        .eq('user_id', user.id);

      if (judgeError) throw judgeError;

      const workshopIds = judgeAssignments?.map(j => j.workshop_id) || [];

      if (workshopIds.length === 0) {
        setWorkshops([]);
        setLoading(false);
        return;
      }

      const { data: workshopsData, error: workshopsError } = await supabase
        .from('workshops')
        .select('*')
        .in('id', workshopIds)
        .order('created_at', { ascending: false });

      if (workshopsError) throw workshopsError;

      setWorkshops(workshopsData || []);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return <PageLoadingFallback />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Judge Dashboard</h1>
            <p className="text-muted-foreground mt-2">Evaluate team submissions and track progress</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map(workshop => (
            <Card 
              key={workshop.id} 
              className="hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate(`/dashboard/judge/workshops/${workshop.id}`)}
            >
              <CardHeader>
                {workshop.banner_url && (
                  <img 
                    src={workshop.banner_url} 
                    alt={workshop.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-start justify-between">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {workshop.title}
                  </CardTitle>
                  <Badge variant={workshop.status === 'active' ? 'default' : 'secondary'}>
                    {workshop.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {workshop.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {workshop.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(workshop.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Evaluate Workshop
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {workshops.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Workshops Assigned</h3>
              <p className="text-muted-foreground">
                You haven't been assigned to any workshops yet. Contact the admin for assistance.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JudgeDashboard;
