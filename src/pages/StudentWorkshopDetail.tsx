import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Users, Trophy, Clock, Upload, Send, 
  CheckCircle2, Lock, UserCheck, Star, MessageSquare 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Workshop {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  duration: string;
}

interface Group {
  id: string;
  group_name: string;
  group_code: string;
  logo_url: string | null;
  slogan: string | null;
}

interface GroupMember {
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  task_order: number;
  points: number;
  timer_minutes: number | null;
  is_active: boolean;
  start_time: string | null;
}

interface Submission {
  id: string;
  task_id: string;
  text_submission: string | null;
  file_urls: string[] | null;
  status: string;
  score: number | null;
  submitted_at: string;
}

interface LeaderboardEntry {
  id: string;
  rank: number | null;
  total_score: number;
  tasks_completed: number;
  workshop_groups: {
    group_name: string;
    logo_url: string | null;
  };
}

interface Judge {
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
}

export default function StudentWorkshopDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [myGroup, setMyGroup] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  
  const [groupCode, setGroupCode] = useState("");
  const [joiningGroup, setJoiningGroup] = useState(false);
  
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackSuggestions, setFeedbackSuggestions] = useState("");
  
  const [showMentorship, setShowMentorship] = useState(false);
  const [mentorshipTitle, setMentorshipTitle] = useState("");
  const [mentorshipDescription, setMentorshipDescription] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchWorkshopData();
    setupRealtimeSubscriptions();
  }, [user, id]);

  const fetchWorkshopData = async () => {
    if (!user || !id) return;

    try {
      setLoading(true);

      // Fetch workshop details
      const { data: workshopData, error: workshopError } = await supabase
        .from("workshops")
        .select("*")
        .eq("id", id)
        .single();

      if (workshopError) throw workshopError;
      setWorkshop(workshopData);

      // Check if user is in a group
      const { data: memberData, error: memberError } = await supabase
        .from("group_members")
        .select(`
          group_id,
          workshop_groups!inner(
            id,
            group_name,
            group_code,
            logo_url,
            slogan,
            workshop_id
          )
        `)
        .eq("user_id", user.id);

      if (!memberError && memberData && memberData.length > 0) {
        const userGroups = memberData.filter(
          (m: any) => m.workshop_groups.workshop_id === id
        );
        
        if (userGroups.length > 0) {
          setMyGroup(userGroups[0].workshop_groups);
          await fetchGroupMembers(userGroups[0].group_id);
          await fetchTasks();
          await fetchSubmissions(userGroups[0].group_id);
        }
      }

      // Fetch leaderboard
      await fetchLeaderboard();

      // Fetch judges
      await fetchJudges();

    } catch (error) {
      console.error("Error fetching workshop data:", error);
      toast.error("Failed to load workshop data");
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupMembers = async (groupId: string) => {
    const { data, error } = await supabase
      .from("group_members")
      .select(`
        user_id,
        profiles(full_name, avatar_url)
      `)
      .eq("group_id", groupId);

    if (!error && data) {
      setGroupMembers(data as any);
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("workshop_tasks")
      .select("*")
      .eq("workshop_id", id)
      .order("task_order");

    if (!error && data) {
      setTasks(data);
      // Find first active task
      const activeTask = data.find(t => t.is_active);
      if (activeTask) setActiveTaskId(activeTask.id);
    }
  };

  const fetchSubmissions = async (groupId: string) => {
    const { data, error } = await supabase
      .from("team_task_submissions")
      .select("*")
      .eq("group_id", groupId);

    if (!error && data) {
      setSubmissions(data);
    }
  };

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from("workshop_leaderboard")
      .select(`
        id,
        rank,
        total_score,
        tasks_completed,
        workshop_groups(group_name, logo_url)
      `)
      .eq("workshop_id", id)
      .order("rank", { ascending: true });

    if (!error && data) {
      setLeaderboard(data as any);
    }
  };

  const fetchJudges = async () => {
    const { data, error } = await supabase
      .from("workshop_judges")
      .select(`
        user_id,
        profiles(full_name, avatar_url)
      `)
      .eq("workshop_id", id);

    if (!error && data) {
      setJudges(data as any);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user || !id) return;

    const channel = supabase
      .channel(`workshop-${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workshop_tasks",
          filter: `workshop_id=eq.${id}`,
        },
        () => fetchTasks()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "workshop_leaderboard",
          filter: `workshop_id=eq.${id}`,
        },
        () => fetchLeaderboard()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team_task_submissions",
        },
        () => {
          if (myGroup) fetchSubmissions(myGroup.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleJoinGroup = async () => {
    if (!user || !groupCode.trim()) {
      toast.error("Please enter a group code");
      return;
    }

    try {
      setJoiningGroup(true);

      // Find group by code
      const { data: groupData, error: groupError } = await supabase
        .from("workshop_groups")
        .select("*")
        .eq("group_code", groupCode.trim())
        .eq("workshop_id", id)
        .single();

      if (groupError || !groupData) {
        toast.error("Invalid group code");
        return;
      }

      // Check if already in a group
      const { data: existingMember } = await supabase
        .from("group_members")
        .select("id")
        .eq("user_id", user.id)
        .eq("group_id", groupData.id)
        .single();

      if (existingMember) {
        toast.info("You're already in this group");
        return;
      }

      // Join group
      const { error: joinError } = await supabase
        .from("group_members")
        .insert({
          group_id: groupData.id,
          user_id: user.id,
        });

      if (joinError) throw joinError;

      toast.success("Successfully joined the group!");
      setMyGroup(groupData);
      await fetchGroupMembers(groupData.id);
      await fetchTasks();
      await fetchSubmissions(groupData.id);
      setGroupCode("");
    } catch (error) {
      console.error("Error joining group:", error);
      toast.error("Failed to join group");
    } finally {
      setJoiningGroup(false);
    }
  };

  const handleSubmitTask = async (taskId: string) => {
    if (!myGroup || !user) return;

    if (!submissionText.trim()) {
      toast.error("Please provide a submission");
      return;
    }

    try {
      setUploading(true);

      const { error } = await supabase
        .from("team_task_submissions")
        .insert({
          group_id: myGroup.id,
          task_id: taskId,
          text_submission: submissionText,
          status: "pending",
        });

      if (error) throw error;

      toast.success("Task submitted successfully!");
      setSubmissionText("");
      await fetchSubmissions(myGroup.id);
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Failed to submit task");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!user || !id) return;

    try {
      const { error } = await supabase
        .from("feedback")
        .insert({
          user_id: user.id,
          workshop_id: id,
          rating: feedbackRating,
          content: feedbackContent,
          suggestions: feedbackSuggestions,
        });

      if (error) throw error;

      toast.success("Feedback submitted! Thank you 🎉");
      setShowFeedback(false);
      setFeedbackContent("");
      setFeedbackSuggestions("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  const handleSubmitMentorship = async () => {
    if (!user || !mentorshipTitle.trim() || !mentorshipDescription.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { error } = await supabase
        .from("mentorship_requests")
        .insert({
          user_id: user.id,
          workshop_id: id,
          idea_title: mentorshipTitle,
          idea_description: mentorshipDescription,
        });

      if (error) throw error;

      toast.success("Mentorship request submitted! We'll reach out soon 🌱");
      setShowMentorship(false);
      setMentorshipTitle("");
      setMentorshipDescription("");
    } catch (error) {
      console.error("Error submitting mentorship request:", error);
      toast.error("Failed to submit request");
    }
  };

  const getTaskStatus = (taskId: string) => {
    const submission = submissions.find(s => s.task_id === taskId);
    if (submission) return submission.status;
    return "not_started";
  };

  const isTaskUnlocked = (task: Task) => {
    return task.is_active;
  };

  const allTasksCompleted = tasks.length > 0 && 
    tasks.every(task => getTaskStatus(task.id) === "completed");

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-64 w-full" />
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-96 md:col-span-2" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Workshop Not Found</h3>
            <p className="text-muted-foreground mb-4">
              This workshop doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate("/dashboard/student/workshops")}>
              Back to Workshops
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/student/workshops")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshops
          </Button>
        </div>

        {/* Workshop Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            {workshop.banner_url && (
              <div className="h-64 overflow-hidden">
                <img
                  src={workshop.banner_url}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-2">{workshop.title}</h1>
              <p className="text-muted-foreground mb-4">{workshop.description}</p>
              {workshop.duration && (
                <Badge variant="outline" className="gap-2">
                  <Clock className="w-3 h-3" />
                  {workshop.duration}
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Group Joining Section */}
        {!myGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join Your Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter the group code provided by your workshop coordinator to join your team.
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Group Code"
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleJoinGroup()}
                  />
                  <Button onClick={handleJoinGroup} disabled={joiningGroup}>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Join Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content - Only show if user is in a group */}
        {myGroup && (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column - Tasks */}
            <div className="md:col-span-2 space-y-6">
              {/* Team Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{myGroup.group_name}</h2>
                        {myGroup.slogan && (
                          <p className="opacity-90 mb-4">{myGroup.slogan}</p>
                        )}
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {groupMembers.length} {groupMembers.length === 1 ? "Member" : "Members"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {groupMembers.map((member) => (
                            <div
                              key={member.user_id}
                              className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={member.profiles?.avatar_url || undefined} />
                                <AvatarFallback className="text-xs">
                                  {member.profiles?.full_name?.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.profiles?.full_name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {myGroup.logo_url && (
                        <img
                          src={myGroup.logo_url}
                          alt="Team Logo"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tasks Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Workshop Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence mode="wait">
                    {tasks.map((task, index) => {
                      const status = getTaskStatus(task.id);
                      const unlocked = isTaskUnlocked(task);
                      const submission = submissions.find(s => s.task_id === task.id);

                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card className={`${
                            !unlocked ? "opacity-50" : ""
                          } ${status === "completed" ? "border-green-500" : ""}`}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">Task {task.task_order}</Badge>
                                    {status === "completed" && (
                                      <Badge className="bg-green-500">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Completed
                                      </Badge>
                                    )}
                                    {status === "pending" && (
                                      <Badge variant="secondary">Under Review</Badge>
                                    )}
                                    {!unlocked && (
                                      <Badge variant="destructive">
                                        <Lock className="w-3 h-3 mr-1" />
                                        Locked
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="text-lg font-semibold">{task.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Trophy className="w-4 h-4" />
                                    <span>{task.points} pts</span>
                                  </div>
                                  {task.timer_minutes && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{task.timer_minutes} min</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardHeader>

                            {unlocked && status !== "completed" && (
                              <CardContent className="space-y-4">
                                <Separator />
                                {status === "pending" ? (
                                  <div className="text-center py-4">
                                    <p className="text-sm text-muted-foreground">
                                      Your submission is under review by judges
                                    </p>
                                  </div>
                                ) : (
                                  <>
                                    <Textarea
                                      placeholder="Enter your submission details, links, or notes..."
                                      value={activeTaskId === task.id ? submissionText : ""}
                                      onChange={(e) => {
                                        setActiveTaskId(task.id);
                                        setSubmissionText(e.target.value);
                                      }}
                                      rows={4}
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => handleSubmitTask(task.id)}
                                        disabled={uploading || !submissionText.trim()}
                                        className="flex-1"
                                      >
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Task
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </CardContent>
                            )}

                            {submission && submission.score !== null && (
                              <CardContent>
                                <Separator className="mb-4" />
                                <div className="bg-muted p-4 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold">Score:</span>
                                    <span className="text-xl font-bold text-primary">
                                      {submission.score} / {task.points}
                                    </span>
                                  </div>
                                  {submission.score && (
                                    <p className="text-sm text-muted-foreground">
                                      Judge's Comment: Great work!
                                    </p>
                                  )}
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {tasks.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No tasks available yet. Check back soon!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Post-Workshop Actions */}
              {allTasksCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card className="border-green-500/50 bg-green-500/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Workshop Completed! 🎉
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Congratulations on completing all tasks! Now you can:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowFeedback(true)}
                          className="w-full"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Give Feedback
                        </Button>
                        <Button
                          onClick={() => setShowMentorship(true)}
                          className="w-full"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Request Mentorship
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Column - Leaderboard & Judges */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Leaderboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          entry.workshop_groups.group_name === myGroup?.group_name
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1 ? "bg-yellow-500 text-white" :
                          entry.rank === 2 ? "bg-gray-400 text-white" :
                          entry.rank === 3 ? "bg-orange-600 text-white" :
                          "bg-muted-foreground/20"
                        }`}>
                          {entry.rank || "-"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate text-sm">
                            {entry.workshop_groups.group_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.tasks_completed} tasks • {entry.total_score} pts
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {leaderboard.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No rankings yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Judges */}
              {judges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Judges & Mentors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {judges.map((judge) => (
                        <div key={judge.user_id} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={judge.profiles?.avatar_url || undefined} />
                            <AvatarFallback>
                              {judge.profiles?.full_name?.charAt(0) || "J"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {judge.profiles?.full_name}
                            </p>
                            <p className="text-xs text-muted-foreground">Judge</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowFeedback(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="w-full max-w-lg">
                <CardHeader>
                  <CardTitle>Workshop Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Rating (1-5 stars)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant={feedbackRating >= star ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFeedbackRating(star)}
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      What did you learn?
                    </label>
                    <Textarea
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder="Share your experience..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Suggestions for improvement
                    </label>
                    <Textarea
                      value={feedbackSuggestions}
                      onChange={(e) => setFeedbackSuggestions(e.target.value)}
                      placeholder="How can we make it better?"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitFeedback} className="flex-1">
                      Submit Feedback
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowFeedback(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Mentorship Modal */}
        {showMentorship && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMentorship(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="w-full max-w-lg">
                <CardHeader>
                  <CardTitle>Request Mentorship 🌱</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Share your idea and we'll connect you with mentors who can help you grow!
                  </p>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Idea Title
                    </label>
                    <Input
                      value={mentorshipTitle}
                      onChange={(e) => setMentorshipTitle(e.target.value)}
                      placeholder="e.g., AI-powered study assistant"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Describe Your Idea
                    </label>
                    <Textarea
                      value={mentorshipDescription}
                      onChange={(e) => setMentorshipDescription(e.target.value)}
                      placeholder="Tell us about your project, startup idea, or what you want to build..."
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSubmitMentorship} className="flex-1">
                      Submit Request
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowMentorship(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
