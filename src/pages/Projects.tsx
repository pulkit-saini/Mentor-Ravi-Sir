import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Code, Users, Trophy } from "lucide-react";

const projects = [
  {
    title: "AI Chatbot",
    description: "Build an intelligent conversational AI",
    tech: "Python, TensorFlow",
    difficulty: "Advanced",
  },
  {
    title: "E-commerce Platform",
    description: "Create a full-stack shopping website",
    tech: "React, Node.js",
    difficulty: "Intermediate",
  },
  {
    title: "IoT Home Automation",
    description: "Smart home control system",
    tech: "Arduino, MQTT",
    difficulty: "Intermediate",
  },
  {
    title: "Blockchain Wallet",
    description: "Secure cryptocurrency wallet app",
    tech: "Solidity, Web3",
    difficulty: "Advanced",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Build real-world solutions and showcase your skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {projects.map((project, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="w-5 h-5 text-primary" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code className="w-4 h-4" />
                      <span>Tech: {project.tech}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span>Level: {project.difficulty}</span>
                    </div>
                  </div>
                  <Button className="w-full">Start Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Submit Your Project</CardTitle>
              <CardDescription>
                Share your innovative projects with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full">Submit Project</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
