import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkshopOverviewTab from "@/components/admin/workshop/WorkshopOverviewTab";
import WorkshopTasksTab from "@/components/admin/workshop/WorkshopTasksTab";
import WorkshopGroupsTab from "@/components/admin/workshop/WorkshopGroupsTab";
import WorkshopParticipantsTab from "@/components/admin/workshop/WorkshopParticipantsTab";
import WorkshopJudgesTab from "@/components/admin/workshop/WorkshopJudgesTab";
import WorkshopLeaderboardTab from "@/components/admin/workshop/WorkshopLeaderboardTab";
import WorkshopAnnouncementsTab from "@/components/admin/workshop/WorkshopAnnouncementsTab";
import WorkshopSettingsTab from "@/components/admin/workshop/WorkshopSettingsTab";

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  banner_url: string | null;
  created_at: string | null;
  status: string | null;
}

const AdminWorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchWorkshop();
    }

    // Real-time subscription for workshop status changes
    const channel = supabase
      .channel('workshop-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workshops',
          filter: `id=eq.${id}`
        },
        () => fetchWorkshop()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const fetchWorkshop = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({ title: "Error fetching workshop", variant: "destructive" });
      navigate('/admin/workshops');
    } else {
      setWorkshop(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/workshops')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!workshop) return null;

  const getStatusBadge = () => {
    switch (workshop.status) {
      case 'live':
        return <Badge className="bg-green-600 text-white text-lg px-4 py-1">🔴 Live</Badge>;
      case 'completed':
        return <Badge className="bg-gray-600 text-white text-lg px-4 py-1">✅ Completed</Badge>;
      default:
        return <Badge variant="outline" className="text-lg px-4 py-1">📝 Draft</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate('/admin/workshops')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workshops
        </Button>

        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{workshop.title}</h1>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground">{workshop.description || 'No description'}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Manage Tasks</TabsTrigger>
          <TabsTrigger value="groups">Groups & Codes</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="judges">Judges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <WorkshopOverviewTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="tasks">
          <WorkshopTasksTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="groups">
          <WorkshopGroupsTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="participants">
          <WorkshopParticipantsTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="judges">
          <WorkshopJudgesTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="leaderboard">
          <WorkshopLeaderboardTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="announcements">
          <WorkshopAnnouncementsTab workshopId={workshop.id} />
        </TabsContent>

        <TabsContent value="settings">
          <WorkshopSettingsTab workshopId={workshop.id} workshop={workshop} onUpdate={fetchWorkshop} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminWorkshopDetail;
