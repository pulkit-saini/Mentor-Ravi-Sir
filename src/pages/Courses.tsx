import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Award, Star, ArrowRight, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courses = [
  {
    id: 1,
    title: "Startup Incubation Program",
    category: "Entrepreneurship",
    level: "Intermediate",
    duration: "12 Weeks",
    format: "Hybrid",
    price: "₹49,999",
    rating: 4.9,
    reviews: 156,
    students: 850,
    description: "Comprehensive program to turn your startup idea into a fundable business. Learn from industry experts, get personalized mentorship, and pitch to real investors.",
    highlights: [
      "One-on-one mentorship with successful entrepreneurs",
      "Business model canvas and validation",
      "Pitch deck creation and investor readiness",
      "Legal and compliance frameworks",
      "Go-to-market strategy development",
      "Access to investor network"
    ],
    curriculum: [
      "Week 1-3: Idea Validation & Market Research",
      "Week 4-6: Business Model & Revenue Streams",
      "Week 7-9: Product Development & MVP",
      "Week 10-12: Fundraising & Investor Pitch"
    ],
    certification: "Certified Startup Founder - Ravi Rautela Academy",
    gamification: {
      points: 1200,
      badges: ["Startup Visionary", "Pitch Master", "Business Strategist"]
    }
  },
  {
    id: 2,
    title: "AWS Cloud Architecture Mastery",
    category: "Technology",
    level: "Advanced",
    duration: "8 Weeks",
    format: "Online",
    price: "₹39,999",
    rating: 4.8,
    reviews: 203,
    students: 1200,
    description: "Master AWS cloud services and become a certified cloud architect. Hands-on labs, real-world projects, and preparation for AWS certifications.",
    highlights: [
      "Complete AWS services coverage",
      "Architecture design patterns",
      "Security and compliance best practices",
      "Cost optimization strategies",
      "High availability and disaster recovery",
      "AWS certification exam preparation"
    ],
    curriculum: [
      "Week 1-2: Core AWS Services (EC2, S3, VPC)",
      "Week 3-4: Advanced Networking & Security",
      "Week 5-6: Serverless & Microservices",
      "Week 7-8: DevOps & CI/CD on AWS"
    ],
    certification: "AWS Solutions Architect Preparation Certificate",
    gamification: {
      points: 1000,
      badges: ["Cloud Architect", "DevOps Master", "AWS Expert"]
    }
  },
  {
    id: 3,
    title: "AgriTech Innovation & IoT",
    category: "AgriTech",
    level: "Beginner to Intermediate",
    duration: "6 Weeks",
    format: "Hybrid",
    price: "₹29,999",
    rating: 4.9,
    reviews: 134,
    students: 620,
    description: "Learn how to leverage technology to solve agricultural challenges. Explore IoT sensors, data analytics, and sustainable farming solutions.",
    highlights: [
      "IoT devices for precision agriculture",
      "Soil and weather data analytics",
      "Sustainable farming techniques",
      "Drone technology for crop monitoring",
      "Farm management software",
      "Real farm project implementation"
    ],
    curriculum: [
      "Week 1-2: Agriculture Fundamentals & Tech Overview",
      "Week 3-4: IoT Sensors & Data Collection",
      "Week 5-6: Analytics & Decision Making"
    ],
    certification: "Certified AgriTech Specialist",
    gamification: {
      points: 800,
      badges: ["AgriTech Pioneer", "IoT Innovator", "Sustainability Champion"]
    }
  },
  {
    id: 4,
    title: "Digital Marketing & Growth Hacking",
    category: "Marketing",
    level: "Beginner to Advanced",
    duration: "10 Weeks",
    format: "Online",
    price: "₹34,999",
    rating: 4.7,
    reviews: 289,
    students: 1540,
    description: "Master digital marketing strategies that drive real growth. From SEO to social media, email marketing to analytics - become a complete digital marketer.",
    highlights: [
      "SEO and content marketing mastery",
      "Social media marketing & ads",
      "Email marketing automation",
      "Google Analytics & data-driven decisions",
      "Growth hacking techniques",
      "Real campaign projects"
    ],
    curriculum: [
      "Week 1-3: SEO & Content Marketing",
      "Week 4-6: Social Media & Paid Advertising",
      "Week 7-8: Email Marketing & Automation",
      "Week 9-10: Analytics & Growth Strategies"
    ],
    certification: "Certified Digital Marketing Professional",
    gamification: {
      points: 950,
      badges: ["Marketing Maven", "Growth Hacker", "Analytics Expert"]
    }
  },
  {
    id: 5,
    title: "EdTech Product Development",
    category: "EdTech",
    level: "Intermediate",
    duration: "8 Weeks",
    format: "Hybrid",
    price: "₹44,999",
    rating: 4.8,
    reviews: 98,
    students: 450,
    description: "Build educational technology products that make learning engaging and effective. Explore gamification, AI in education, and learning management systems.",
    highlights: [
      "Educational product design principles",
      "Gamification in learning",
      "AI-powered personalized learning",
      "Learning Management Systems (LMS)",
      "Student engagement strategies",
      "EdTech business models"
    ],
    curriculum: [
      "Week 1-2: EdTech Landscape & Trends",
      "Week 3-4: Product Design & UX for Learning",
      "Week 5-6: Technology Stack & Implementation",
      "Week 7-8: Launch & Growth Strategies"
    ],
    certification: "Certified EdTech Product Manager",
    gamification: {
      points: 1100,
      badges: ["EdTech Innovator", "Learning Designer", "Product Guru"]
    }
  },
  {
    id: 6,
    title: "Leadership & Team Management",
    category: "Leadership",
    level: "All Levels",
    duration: "6 Weeks",
    format: "Online",
    price: "₹24,999",
    rating: 4.9,
    reviews: 412,
    students: 2100,
    description: "Develop essential leadership skills to build and manage high-performing teams. Learn from 25+ years of leadership experience across industries.",
    highlights: [
      "Leadership styles and frameworks",
      "Team building and motivation",
      "Conflict resolution strategies",
      "Performance management",
      "Change management",
      "Emotional intelligence for leaders"
    ],
    curriculum: [
      "Week 1-2: Leadership Fundamentals",
      "Week 3-4: Team Dynamics & Communication",
      "Week 5-6: Strategic Leadership & Vision"
    ],
    certification: "Certified Team Leader",
    gamification: {
      points: 750,
      badges: ["Leadership Legend", "Team Builder", "Visionary Leader"]
    }
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, TechStart India",
    course: "Startup Incubation Program",
    image: "PS",
    rating: 5,
    text: "This program transformed my startup idea into a fundable business. The mentorship from Ravi sir was invaluable. We raised our seed round within 3 months of completing the program!"
  },
  {
    name: "Amit Patel",
    role: "Cloud Architect, InfoSys",
    course: "AWS Cloud Architecture Mastery",
    image: "AP",
    rating: 5,
    text: "Best AWS course I've ever taken. The hands-on labs and real-world projects prepared me perfectly for the AWS certification. Got promoted to Senior Architect!"
  },
  {
    name: "Rajesh Kumar",
    role: "Progressive Farmer & AgriTech Entrepreneur",
    course: "AgriTech Innovation & IoT",
    image: "RK",
    rating: 5,
    text: "As a farmer, I never thought I'd understand IoT and sensors. This course made it so practical and easy. Now I'm helping 50+ farmers in my village implement smart farming!"
  }
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-in">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Professional Certifications • Hands-on Learning • Career Growth</span>
            </div>
            <h1 className="animate-fade-in-up">
              <span className="gradient-text">Courses & Training Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              Transform your career with industry-leading courses designed by experts. 
              Earn certifications, build real projects, and unlock your potential.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl text-center hover-lift">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center hover-lift">
              <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-3xl font-bold text-secondary">5000+</div>
              <div className="text-sm text-muted-foreground">Students Trained</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center hover-lift">
              <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-3xl font-bold text-accent">3000+</div>
              <div className="text-sm text-muted-foreground">Certifications Issued</div>
            </div>
            <div className="glass-card p-6 rounded-xl text-center hover-lift">
              <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section with Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="gradient-text mb-4">Our Courses</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our comprehensive range of professional courses
            </p>
          </div>

          <Tabs defaultValue="all" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="entrepreneurship">Startup</TabsTrigger>
              <TabsTrigger value="technology">Tech</TabsTrigger>
              <TabsTrigger value="agritech">AgriTech</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="edtech">EdTech</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            {["Entrepreneurship", "Technology", "AgriTech", "Marketing", "EdTech", "Leadership"].map((category) => (
              <TabsContent key={category.toLowerCase()} value={category.toLowerCase()}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses
                    .filter((course) => course.category === category)
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="gradient-text mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              See how our courses have transformed careers and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">{testimonial.image}</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
                  <Badge variant="outline" className="mt-3">{testimonial.course}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center glass-card p-12 rounded-2xl">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have advanced their careers through our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:shadow-primary group">
                Explore All Courses
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">Schedule a Call</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  return (
    <Card className="hover-lift overflow-hidden flex flex-col">
      <CardHeader className="bg-gradient-subtle">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-4 flex-1">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-muted-foreground">({course.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>{course.format}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">What You'll Learn:</h4>
          <ul className="space-y-1">
            {course.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Certification</p>
              <p className="text-sm font-semibold flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" />
                Included
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Gamification</p>
              <p className="text-sm font-semibold flex items-center gap-1">
                <Zap className="w-4 h-4 text-accent" />
                {course.gamification.points} pts
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-4 border-t">
        <div className="flex items-baseline justify-between w-full">
          <span className="text-2xl font-bold text-primary">{course.price}</span>
          <span className="text-sm text-muted-foreground">One-time payment</span>
        </div>
        <Button className="w-full bg-gradient-primary hover:shadow-primary group">
          Enroll Now
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesPage;
