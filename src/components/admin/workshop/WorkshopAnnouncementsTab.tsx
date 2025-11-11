import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Megaphone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Announcement {
  id: string;
  message: string;
  created_at: string;
  created_by: string | null;
}

const WorkshopAnnouncementsTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAnnouncements();

    // Real-time subscription
    const channel = supabase
      .channel('workshop-announcements-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchAnnouncements()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId]);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAnnouncements(data);
    }
  };

  const handleSendAnnouncement = async () => {
    if (!message.trim()) {
      toast({ title: "Message cannot be empty", variant: "destructive" });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('announcements')
      .insert([{
        workshop_id: workshopId,
        message: message.trim(),
        created_by: user?.id
      }]);

    if (error) {
      toast({ title: "Error sending announcement", variant: "destructive" });
    } else {
      toast({ title: "Announcement sent! 📢" });
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Announcements</h2>
        <p className="text-muted-foreground">Broadcast updates to all participants</p>
      </div>

      {/* Send Announcement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Post New Announcement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Type your announcement here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAnnouncement()}
            />
            <Button onClick={handleSendAnnouncement}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No announcements yet</p>
          ) : (
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 border rounded-lg bg-muted/50"
                >
                  <p className="font-medium">{announcement.message}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {formatDistanceToNow(new Date(announcement.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopAnnouncementsTab;
