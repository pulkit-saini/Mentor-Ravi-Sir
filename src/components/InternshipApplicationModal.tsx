import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload } from "lucide-react";

interface InternshipApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internshipId: string;
  internshipTitle: string;
}

const InternshipApplicationModal = ({
  isOpen,
  onClose,
  internshipId,
  internshipTitle,
}: InternshipApplicationModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    resumeUrl: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user already applied
      const { data: existingApplication } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", user.id)
        .eq("internship_id", internshipId)
        .single();

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already submitted an application for this internship.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Insert application
      const { error } = await supabase.from("applications").insert({
        internship_id: internshipId,
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        resume_url: formData.resumeUrl,
        note: formData.note,
      });

      if (error) throw error;

      toast({
        title: "Application Submitted! 🎉",
        description: "Your application has been submitted successfully. We'll review it and get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        resumeUrl: "",
        note: "",
      });

      onClose();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for {internshipTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details below to submit your application
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              placeholder="9876543210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume URL (Google Drive / Dropbox)</Label>
            <div className="flex gap-2">
              <Input
                id="resume"
                type="url"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                placeholder="https://drive.google.com/..."
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Upload your resume to Google Drive and paste the shareable link</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Why do you want to join this internship? *</Label>
            <Textarea
              id="note"
              required
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Tell us about your motivation and what you hope to learn..."
              rows={5}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternshipApplicationModal;
