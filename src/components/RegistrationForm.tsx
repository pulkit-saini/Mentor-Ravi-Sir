import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, CheckCircle2, Users, Calendar, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";

const EVENTS_LIST = [
  "Sky High (Tower Making Challenge)",
  "Bridge Building Competition",
  "3D Anatomical & Physiological Care Model",
  "Clinical Skill Obstacle Task",
  "Reel Making",
  "Poster in Motion (Medical-themed 3D Poster)",
  "Reverse SharkTank",
  "Brand Revival Challenge",
  "Web Maze",
  "Code Relay",
  "CP Contest",
  "DeepRoots: ML/DL/NLP Hack",
  "Generative AI & Agents Challenge",
  "Battle on Breadboard",
  "Robo Race – The Ultimate Track Challenge",
  "Robo War – The Ultimate Fight Challenge",
  "Multi-Stage Water Rocket",
  "Robotics Football Game",
  "Science Safari - The Ultimate Treasure Hunt",
  "Science Quiz",
  "Science Model Exhibition",
  "Fest-O-Fun: The Ultimate Fun Zone",
  "Formulation Designing Competition",
  "Pharma Product Advertisement Competition",
  "Science Charades",
  "Battle of the Bands",
  "Photography Contest",
  "Robo OFF - Road Car Race",
  "Ad-Mad Show Contest",
  "Short Film Making Contest",
  "Battle Era 2.0 (Free Fire & PUBG)",
  "Abhivyakti",
];

const teamMemberSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  course: z.string().trim().min(2, "Course/School is required").max(200),
  contactNumber: z.string().trim().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  parentName: z.string().trim().max(100).optional().or(z.literal('')),
  parentContact: z.string().trim().regex(/^[0-9]{10}$/, "Must be valid 10-digit number").optional().or(z.literal('')),
  studentIdFile: z.any().optional(),
  aadhaarNumber: z.string().trim().regex(/^[0-9]{12}$/, "Must be a valid 12-digit Aadhaar number"),
  aadhaarFile: z.any().optional(),
});

const formSchema = z.object({
  selectedEvents: z.array(z.string()).min(1, "Please select at least one event"),
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
  teamLeader: teamMemberSchema,
  teamMembers: z.array(teamMemberSchema).max(3),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [additionalMembers, setAdditionalMembers] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showAuthModal, setShowAuthModal, executeProtectedAction, completePendingAction } = useProtectedAction();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedEvents: [],
      teamName: "",
      teamLeader: {
        fullName: "",
        course: "",
        contactNumber: "",
        parentName: "",
        parentContact: "",
        aadhaarNumber: "",
      },
      teamMembers: [],
    },
  });

  const uploadFile = async (file: File, userId: string, type: string, index: number) => {
    if (!file || !file.name) {
      return null;
    }
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${type}_${index}_${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('registration-documents')
        .upload(fileName, file, {
          upsert: false
        });
      
      if (error) {
        console.error('File upload error:', error);
        throw new Error(`Failed to upload ${type}: ${error.message}`);
      }
      return fileName;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  };

  const handleRegistration = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to register for events.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Upload leader files
      const leaderData: any = { 
        fullName: data.teamLeader.fullName.trim(),
        course: data.teamLeader.course.trim(),
        contactNumber: data.teamLeader.contactNumber.trim(),
        parentName: data.teamLeader.parentName?.trim() || null,
        parentContact: data.teamLeader.parentContact?.trim() || null,
        aadhaarNumber: data.teamLeader.aadhaarNumber.trim(),
      };
      
      if (data.teamLeader.studentIdFile instanceof File && data.teamLeader.studentIdFile.name) {
        const path = await uploadFile(data.teamLeader.studentIdFile, user.id, 'student_id', 0);
        if (path) leaderData.studentIdPath = path;
      }
      if (data.teamLeader.aadhaarFile instanceof File && data.teamLeader.aadhaarFile.name) {
        const path = await uploadFile(data.teamLeader.aadhaarFile, user.id, 'aadhaar', 0);
        if (path) leaderData.aadhaarPath = path;
      }

      // Upload team members files
      const membersData = await Promise.all(
        data.teamMembers.map(async (member, index) => {
          const memberData: any = {
            fullName: member.fullName.trim(),
            course: member.course.trim(),
            contactNumber: member.contactNumber.trim(),
            parentName: member.parentName?.trim() || null,
            parentContact: member.parentContact?.trim() || null,
            aadhaarNumber: member.aadhaarNumber.trim(),
          };
          
          if (member.studentIdFile instanceof File && member.studentIdFile.name) {
            const path = await uploadFile(member.studentIdFile, user.id, 'student_id', index + 1);
            if (path) memberData.studentIdPath = path;
          }
          if (member.aadhaarFile instanceof File && member.aadhaarFile.name) {
            const path = await uploadFile(member.aadhaarFile, user.id, 'aadhaar', index + 1);
            if (path) memberData.aadhaarPath = path;
          }
          return memberData;
        })
      );

      // Insert registration
      const { error: insertError } = await supabase
        .from('event_registrations')
        .insert({
          user_id: user.id,
          team_name: data.teamName.trim(),
          selected_events: data.selectedEvents,
          team_leader: leaderData,
          team_members: membersData,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(`Registration failed: ${insertError.message}`);
      }

      toast({
        title: "Registration Successful!",
        description: "Your team has been registered for the selected events. Redirecting to your dashboard...",
      });

      setShowSuccess(true);

      // Redirect to student dashboard after successful registration
      setTimeout(() => {
        navigate('/dashboard/student');
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    executeProtectedAction(
      'register_event',
      data,
      () => handleRegistration(data)
    );
  };

  useEffect(() => {
    if (user) {
      completePendingAction((action) => {
        if (action.type === 'register_event' && action.data) {
          handleRegistration(action.data);
        }
      });
    }
  }, [user]);

  const addTeamMember = () => {
    if (additionalMembers < 3) {
      setAdditionalMembers(prev => prev + 1);
      form.setValue('teamMembers', [
        ...form.getValues('teamMembers'),
        {
          fullName: "",
          course: "",
          contactNumber: "",
          parentName: "",
          parentContact: "",
          aadhaarNumber: "",
        },
      ]);
    }
  };

  const removeTeamMember = (index: number) => {
    const currentMembers = form.getValues('teamMembers');
    const updatedMembers = currentMembers.filter((_, i) => i !== index);
    form.setValue('teamMembers', updatedMembers);
    setAdditionalMembers(prev => prev - 1);
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-primary animate-in zoom-in duration-500" />
            <h2 className="text-3xl font-bold mb-4">Registration Submitted Successfully!</h2>
            <p className="text-muted-foreground text-lg mb-8">
              We'll contact you with further event details.
            </p>
            <Button onClick={() => setShowSuccess(false)} size="lg">
              Register Another Team
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Event Registration
        </h2>
        <p className="text-muted-foreground text-lg">
          Join us at Prayukti Fest 2025 - Register your team now!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Event Selection */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Choose Your Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="selectedEvents"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {EVENTS_LIST.map((event) => (
                        <FormField
                          key={event}
                          control={form.control}
                          name="selectedEvents"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(event)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, event])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== event)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {event}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Section 2: Team Details */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Team Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your team name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Team Leader (Member 1)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="teamLeader.fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course / School *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter course or school" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.aadhaarNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aadhaar Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="12-digit Aadhaar number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Parent's name (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.parentContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Parent's contact (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="teamLeader.studentIdFile"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Student ID *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              className="cursor-pointer"
                            />
                            <Upload className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamLeader.aadhaarFile"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Aadhaar Card *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
                              className="cursor-pointer"
                            />
                            <Upload className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Additional Team Members */}
          {additionalMembers > 0 && (
            <div className="space-y-6">
              {Array.from({ length: additionalMembers }).map((_, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300 relative">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Team Member {index + 2}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.course`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course / School *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter course or school" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.contactNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.aadhaarNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aadhaar Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="12-digit Aadhaar number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.parentName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Parent's name (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.parentContact`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Parent's contact (optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.studentIdFile`}
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Upload Student ID *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => onChange(e.target.files?.[0])}
                                  {...field}
                                  className="cursor-pointer"
                                />
                                <Upload className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.aadhaarFile`}
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Upload Aadhaar Card *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => onChange(e.target.files?.[0])}
                                  {...field}
                                  className="cursor-pointer"
                                />
                                <Upload className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {additionalMembers < 3 && (
            <Button
              type="button"
              variant="outline"
              onClick={addTeamMember}
              className="w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member ({additionalMembers + 1}/4 added)
            </Button>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </form>
      </Form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        message="Please sign in to register for the event"
      />
    </div>
  );
}