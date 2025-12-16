import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { BookOpen, Clock, Users, Star } from "lucide-react";

const CourseEnrollment = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated] = useState(false); // This will be connected to actual auth later

  const availableCourses = [
    {
      id: 1,
      title: "AgriTech Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      students: "500+",
      rating: 4.8,
      description: "Learn the fundamentals of agricultural technology and innovation.",
    },
    {
      id: 2,
      title: "EdTech Leadership",
      level: "Intermediate",
      duration: "8 weeks",
      students: "300+",
      rating: 4.9,
      description: "Master leadership skills for educational technology ventures.",
    },
    {
      id: 3,
      title: "Startup Incubation Masterclass",
      level: "Advanced",
      duration: "12 weeks",
      students: "200+",
      rating: 5.0,
      description: "From idea to market: Complete startup incubation program.",
    },
    {
      id: 4,
      title: "Digital Marketing for Tech Startups",
      level: "Intermediate",
      duration: "5 weeks",
      students: "400+",
      rating: 4.7,
      description: "Growth hacking and marketing strategies for tech companies.",
    },
    {
      id: 5,
      title: "Product Management Essentials",
      level: "Beginner",
      duration: "7 weeks",
      students: "350+",
      rating: 4.6,
      description: "Build products that customers love with proven frameworks.",
    },
    {
      id: 6,
      title: "Innovation & Design Thinking",
      level: "All Levels",
      duration: "4 weeks",
      students: "600+",
      rating: 4.9,
      description: "Apply design thinking to solve complex business challenges.",
    },
  ];

  const handleEnroll = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Handle enrollment for authenticated users
      console.log("Enrolling in course...");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6 py-12">
            <h1 className="text-5xl md:text-6xl font-bold">
              Enroll in <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access expert-led courses, gain practical skills, and earn professional certifications. 
              Sign in to start your learning journey.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {availableCourses.map((course, index) => (
              <div
                key={course.id}
                className="glass-card rounded-2xl p-6 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm">{course.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.students} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 fill-current text-accent" />
                      <span>{course.rating} rating</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-primary"
                    onClick={handleEnroll}
                  >
                    {isAuthenticated ? "Enroll Now" : "Sign In to Enroll"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          {!isAuthenticated && (
            <div className="max-w-2xl mx-auto mt-16 text-center glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Start Your Learning Journey</h2>
              <p className="text-muted-foreground mb-6">
                Create an account to access all courses, track your progress, and earn certifications.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-primary"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In / Sign Up
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default CourseEnrollment;
