import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Youtube, FileText, Wrench, Briefcase, Brain, Sparkles, Search, Heart, ExternalLink, Trophy, Code, Palette, Cloud, Shield, Smartphone, Database, Lightbulb, Rocket, ChevronRight } from "lucide-react";
const Vault = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [{
    icon: BookOpen,
    title: "📚 Courses & Learning Paths",
    description: "Handpicked courses from platforms like Coursera, Udemy, Khan Academy",
    color: "from-blue-400/20 to-purple-400/20",
    borderColor: "border-blue-400/30",
    topics: ["AI", "Web Dev", "Cloud", "Design"]
  }, {
    icon: Youtube,
    title: "🎥 YouTube Playlists",
    description: "Curated playlists for hands-on learning from top creators",
    color: "from-red-400/20 to-pink-400/20",
    borderColor: "border-red-400/30",
    topics: ["Traversy Media", "CodeWithHarry", "FreeCodeCamp"]
  }, {
    icon: FileText,
    title: "🧠 Study Guides & PDFs",
    description: "Downloadable roadmaps, cheat sheets, and concept notes",
    color: "from-green-400/20 to-teal-400/20",
    borderColor: "border-green-400/30",
    topics: ["MERN Roadmap", "Python Basics"]
  }, {
    icon: Wrench,
    title: "🧰 Tools & Utilities",
    description: "All-in-one tools for coding, design, productivity, and AI",
    color: "from-orange-400/20 to-amber-400/20",
    borderColor: "border-orange-400/30",
    topics: ["Figma", "Notion", "ChatGPT", "CodePen"]
  }, {
    icon: Briefcase,
    title: "💼 Career & Internship Hub",
    description: "Real-world projects, hackathons, and internship opportunities",
    color: "from-indigo-400/20 to-blue-400/20",
    borderColor: "border-indigo-400/30",
    topics: ["Devfolio", "Internshala", "LinkedIn"]
  }, {
    icon: Brain,
    title: "🧘 Mindset & Growth",
    description: "Motivational books, mental health, focus, and personal development",
    color: "from-purple-400/20 to-pink-400/20",
    borderColor: "border-purple-400/30",
    topics: ["Atomic Habits", "Deep Work", "Podcasts"]
  }, {
    icon: Sparkles,
    title: "⚙️ AI Tools Zone",
    description: "Explore AI tools for students, creators, and coders",
    color: "from-cyan-400/20 to-blue-400/20",
    borderColor: "border-cyan-400/30",
    topics: ["Canva Magic Studio", "Perplexity", "Notion AI"]
  }];
  const featuredCollections = [{
    title: "Top Free Courses for Beginners 🚀",
    count: 25,
    color: "from-blue-500 to-purple-500"
  }, {
    title: "Must-Have Tools for Every Student 💡",
    count: 18,
    color: "from-green-500 to-teal-500"
  }, {
    title: "Learn Web Dev the Smart Way 🌐",
    count: 32,
    color: "from-orange-500 to-red-500"
  }];
  const resources = [{
    id: 1,
    title: "Complete Web Development Bootcamp",
    platform: "Udemy",
    category: "Web Dev",
    level: "Beginner",
    type: "Free",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    thumbnail: "🌐",
    link: "#",
    loves: 234
  }, {
    id: 2,
    title: "Machine Learning A-Z",
    platform: "Coursera",
    category: "AI",
    level: "Intermediate",
    type: "Paid",
    description: "Hands-on Python & R in Data Science",
    thumbnail: "🤖",
    link: "#",
    loves: 189
  }, {
    id: 3,
    title: "JavaScript Mastery",
    platform: "YouTube",
    category: "Web Dev",
    level: "All Levels",
    type: "Free",
    description: "Complete JavaScript tutorial playlist",
    thumbnail: "💻",
    link: "#",
    loves: 456
  }];
  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          {/* Floating Sparkles - Hidden on mobile for performance */}
          <div className="hidden md:block">
            {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-2 h-2 bg-primary/30 rounded-full" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }} animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }} transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }} />)}
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
            {/* Treasure Chest Animation */}
            <motion.div initial={{
            scale: 0.8,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            duration: 0.5
          }} className="text-6xl sm:text-7xl md:text-8xl">
              💎
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">खजाना Vault</motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Your one-stop treasure of curated courses, tools, and resources to
              supercharge your learning journey.
            </motion.p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="pt-4">
              <Button size="lg" onClick={scrollToCategories} className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Start Exploring 🚀
              </Button>
            </motion.div>

            {/* Floating Icons */}
            <motion.div className="flex justify-center gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-12 text-3xl sm:text-4xl" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }}>
              {["📚", "💻", "🎯", "✨"].map((icon, i) => <motion.span key={i} animate={{
              y: [0, -15, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}>
                  {icon}
                </motion.span>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Explore the Treasure 🧭
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Choose your path to knowledge and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => {
            const Icon = category.icon;
            return <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }} whileHover={{
              y: -8,
              scale: 1.02
            }} className="group">
                  <Card className={`h-full border-2 ${category.borderColor} bg-gradient-to-br ${category.color} backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                    <CardHeader>
                      <div className="w-14 h-14 rounded-full bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.topics.map((topic, i) => <Badge key={i} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>)}
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Explore <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>;
          })}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Featured Collections ⭐
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Editor's picks curated by mentors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCollections.map((collection, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.05
          }}>
                <Card className="relative overflow-hidden group cursor-pointer border-2 hover:shadow-2xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-8 h-8 text-primary" />
                      <Badge variant="secondary">{collection.count} Resources</Badge>
                    </div>
                    <CardTitle className="text-2xl">{collection.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      View Collection
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Browse Resources 📚
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Find exactly what you need to level up
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="text" placeholder="Search courses, tools, resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 py-6 text-lg" />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant={selectedCategory === "all" ? "default" : "outline"} onClick={() => setSelectedCategory("all")} size="sm">
                  All
                </Button>
                <Button variant={selectedCategory === "courses" ? "default" : "outline"} onClick={() => setSelectedCategory("courses")} size="sm">
                  Courses
                </Button>
                <Button variant={selectedCategory === "tools" ? "default" : "outline"} onClick={() => setSelectedCategory("tools")} size="sm">
                  Tools
                </Button>
                <Button variant={selectedCategory === "free" ? "default" : "outline"} onClick={() => setSelectedCategory("free")} size="sm">
                  Free Only
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {resources.map((resource, index) => <motion.div key={resource.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5
          }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-5xl">{resource.thumbnail}</div>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{resource.platform}</Badge>
                      <Badge variant={resource.type === "Free" ? "default" : "outline"}>
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{resource.level}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                        {resource.loves}
                      </span>
                    </div>
                    <Button className="w-full" variant="outline">
                      Open Resource <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Student Favorites */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Loved by Learners 💖
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Most popular resources from our community
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Community Favorites</h3>
                  <p className="text-muted-foreground">Top rated by students</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Save and bookmark resources to your profile to keep track of your learning journey!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center max-w-3xl mx-auto space-y-6">
            <div className="text-5xl sm:text-6xl mb-4">🌱</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Keep Exploring. Keep Growing.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              The more you learn, the more your vault grows.
            </p>
            <Button size="lg" variant="outline" onClick={() => window.location.href = "/learning-path"} className="text-lg px-8 py-6">
              Return to Learning Garden 🌿
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Vault;