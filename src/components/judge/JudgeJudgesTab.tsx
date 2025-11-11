import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Judge {
  id: string;
  user_id: string;
  assigned_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

interface JudgeJudgesTabProps {
  workshopId: string;
}

export const JudgeJudgesTab = ({ workshopId }: JudgeJudgesTabProps) => {
  const { user } = useAuth();
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJudges();

    // Realtime subscription
    const channel = supabase
      .channel('workshop-judges-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_judges',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchJudges()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId]);

  const fetchJudges = async () => {
    try {
      const { data: judgesData, error: judgesError } = await supabase
        .from('workshop_judges')
        .select('id, user_id, assigned_at')
        .eq('workshop_id', workshopId)
        .order('assigned_at', { ascending: false });

      if (judgesError) {
        console.error('Error fetching workshop judges:', judgesError);
        throw judgesError;
      }

      if (!judgesData || judgesData.length === 0) {
        setJudges([]);
        return;
      }

      // Fetch profile data separately
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', judgesData.map(j => j.user_id));

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        // Continue with partial data if profiles fetch fails
      }

      // Combine the data
      const combinedData = judgesData.map(judge => ({
        ...judge,
        profiles: profilesData?.find(p => p.id === judge.user_id) || {
          full_name: null,
          email: null,
          avatar_url: null
        }
      }));

      setJudges(combinedData);
    } catch (error) {
      console.error('Error in fetchJudges:', error);
      setJudges([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold gradient-text">Judges for this Workshop</h2>
      </div>

      {judges.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No judges assigned to this workshop yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {judges.map((judge, index) => {
            const isCurrentUser = judge.user_id === user?.id;
            
            return (
              <motion.div
                key={judge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50 bg-gradient-to-br from-card to-card/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                  
                  <CardContent className="pt-6 pb-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={judge.profiles.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
                            {getInitials(judge.profiles.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {judge.profiles.full_name || "Unknown Judge"}
                            </h3>
                            {isCurrentUser && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {judge.profiles.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined {format(new Date(judge.assigned_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
