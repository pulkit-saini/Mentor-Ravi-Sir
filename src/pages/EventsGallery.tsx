import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Clock, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";
import eventBanner from "@/assets/event-prayukti-banner.png";
import battleBands from "@/assets/event-battle-bands.png";
import webMaze from "@/assets/event-web-maze.png";
import battleBreadboard from "@/assets/event-battle-breadboard.png";
import roboRace from "@/assets/event-robo-race.png";
import brandRevival from "@/assets/event-brand-revival.png";
import model3D from "@/assets/event-3d-model.png";
import scienceQuiz from "@/assets/event-science-quiz.png";
import scienceExhibition from "@/assets/event-science-exhibition.png";
import skyHigh from "@/assets/event-sky-high-old.png";
import posterMotion from "@/assets/event-poster-motion.png";
import reverseSharkTank from "@/assets/event-reverse-shark-tank.png";
import roboCarRace from "@/assets/event-robo-car-race.png";
import waterRocket from "@/assets/event-water-rocket.png";
import scienceCharades from "@/assets/event-science-charades.png";
import aiChallenges from "@/assets/event-ai-challenges.png";
import reelMaking from "@/assets/event-reel-making.png";
import photography from "@/assets/event-photography.png";
import admadShow from "@/assets/event-admad-show.png";
import scienceCharades2 from "@/assets/event-science-charades-2.png";
import bridgeBuilding from "@/assets/event-bridge-building.png";
import roboWars from "@/assets/event-robo-wars.png";
import roboticsFootball from "@/assets/event-robotics-football.png";
import battleEra from "@/assets/event-battle-era.png";
import codeRelay from "@/assets/event-code-relay.png";
import cpContest from "@/assets/event-cp-contest.png";
import deepRoots from "@/assets/event-deep-roots.png";
import scienceSafari from "@/assets/event-science-safari.png";
import festOFun from "@/assets/event-fest-o-fun.png";
import formulationDesigning from "@/assets/event-formulation-designing.png";
import pharmaAd from "@/assets/event-pharma-ad.png";
import shortFilm from "@/assets/event-short-film.png";
import clinicalSkill from "@/assets/event-clinical-skill.png";
import memoryRelay from "@/assets/event-memory-relay.png";
import echoesIntellect from "@/assets/event-echoes-intellect.png";
const EventsGallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [imagePopup, setImagePopup] = useState<{ src: string; alt: string } | null>(null);
  const eventCategories = [{
    label: "All",
    count: 0
  }];
  const galleryEvents = [{
    id: 1,
    title: "Battle of the Bands",
    category: "All",
    image: battleBands
  }, {
    id: 2,
    title: "Web Maze",
    category: "All",
    image: webMaze
  }, {
    id: 3,
    title: "Battle on Breadboard",
    category: "All",
    image: battleBreadboard
  }, {
    id: 4,
    title: "Robo Off-Road Car Race",
    category: "All",
    image: roboRace
  }, {
    id: 5,
    title: "Brand Revival Challenge",
    category: "All",
    image: brandRevival
  }, {
    id: 6,
    title: "3D Anatomical & Physiological Care Model",
    category: "All",
    image: model3D
  }, {
    id: 7,
    title: "Science Quiz",
    category: "All",
    image: scienceQuiz
  }, {
    id: 8,
    title: "Science Model Exhibition",
    category: "All",
    image: scienceExhibition
  }, {
    id: 9,
    title: "Sky High",
    category: "All",
    image: skyHigh
  }, {
    id: 10,
    title: "Poster in Motion",
    category: "All",
    image: posterMotion
  }, {
    id: 11,
    title: "Reverse Shark Tank",
    category: "All",
    image: reverseSharkTank
  }, {
    id: 12,
    title: "Robo Car Race",
    category: "All",
    image: roboCarRace
  }, {
    id: 13,
    title: "Sky Dream Multi-Stage Water Rocket",
    category: "All",
    image: waterRocket
  }, {
    id: 14,
    title: "Science Charades",
    category: "All",
    image: scienceCharades
  }, {
    id: 15,
    title: "Generative AI & Agent Challenges",
    category: "All",
    image: aiChallenges
  }, {
    id: 16,
    title: "Reel Making Challenge",
    category: "All",
    image: reelMaking
  }, {
    id: 17,
    title: "Photography Contest",
    category: "All",
    image: photography
  }, {
    id: 18,
    title: "Ad-Mad Show Contest",
    category: "All",
    image: admadShow
  }, {
    id: 19,
    title: "Science Charades",
    category: "All",
    image: scienceCharades2
  }, {
    id: 20,
    title: "Bridge Building Competition",
    category: "All",
    image: bridgeBuilding
  }, {
    id: 21,
    title: "Robo Wars - The Ultimate Fight Challenge",
    category: "All",
    image: roboWars
  }, {
    id: 22,
    title: "Robotics Football Game",
    category: "All",
    image: roboticsFootball
  }, {
    id: 23,
    title: "BGMI x Free Fire Battle Era 2.0",
    category: "All",
    image: battleEra
  }, {
    id: 24,
    title: "Code Relay",
    category: "All",
    image: codeRelay
  }, {
    id: 25,
    title: "CP Contest",
    category: "All",
    image: cpContest
  }, {
    id: 26,
    title: "Deep Roots: ML/DL/NLP Hack",
    category: "All",
    image: deepRoots
  }, {
    id: 27,
    title: "Science Safari - The Ultimate Treasure Hunt",
    category: "All",
    image: scienceSafari
  }, {
    id: 28,
    title: "Fest-O-Fun - The Ultimate Fun Zone",
    category: "All",
    image: festOFun
  }, {
    id: 29,
    title: "Formulation Designing Competition",
    category: "All",
    image: formulationDesigning
  }, {
    id: 30,
    title: "Pharma Product Advertisement Competition",
    category: "All",
    image: pharmaAd
  }, {
    id: 31,
    title: "Short Film Making Contest",
    category: "All",
    image: shortFilm
  }, {
    id: 32,
    title: "Clinical Skill Obstacle Task",
    category: "All",
    image: clinicalSkill
  }, {
    id: 33,
    title: "Rearrangement & Memory Relay",
    category: "All",
    image: memoryRelay
  }, {
    id: 34,
    title: "Echoes of Intellect",
    category: "All",
    image: echoesIntellect
  }];

  // Calculate category counts
  const categoriesWithCounts = eventCategories.map(cat => {
    if (cat.label === "All") {
      return {
        ...cat,
        count: galleryEvents.length
      };
    }
    return {
      ...cat,
      count: galleryEvents.filter(event => event.category === cat.label).length
    };
  });

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "All" ? galleryEvents : galleryEvents.filter(event => event.category === selectedCategory);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventBanner} alt="Graphic Era Events" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        </div>
        
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">Graphic Era Hill University</h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              <span className="gradient-text">PRAYUKTI</span> - TECH FEST 2025
            </h2>
            <p className="text-lg md:text-xl mt-4 text-slate-700 font-semibold">
              The Ultimate Tech Fest of GEHU Bhimtal
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in-up" style={{
          animationDelay: '0.1s'
        }}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              GEHU Bhimtal brings together brilliant minds under one roof for Prayukti 2025 a dynamic celebration of technology, creativity, and innovation. The fest features thrilling technical competitions, workshops, exhibitions, and interactive sessions designed to ignite curiosity and inspire the next generation of innovators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:mb-12 animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <Card className="bg-background/80 backdrop-blur border-2">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl gradient-text">💰 Prize Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl md:text-3xl font-bold mb-2">₹5,00,000+</p>
                <p className="text-sm text-muted-foreground">Cash Prizes | Merchandise | Recognition</p>
                <p className="text-sm text-muted-foreground mt-1">Participation Certificates for all</p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur border-2">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl gradient-text">📅 Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm md:text-base">13 & 14 Nov' 25</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm md:text-base">09:00 AM Onwards</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm md:text-base">GEHU, Bhimtal</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur border-2 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl gradient-text">🎯 Key Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>• Battle of Bands</span>
                  <span>• Robo Car Race</span>
                  <span>• Code Relay</span>
                  <span>• Photography</span>
                  <span>• Robo War</span>
                  <span>• Echoes of Intellect</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in-up" style={{
          animationDelay: '0.3s'
        }}>
            <Card className="bg-background/80 backdrop-blur border-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl gradient-text">📱 Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Instagram:</span>
                  <span className="text-sm md:text-base text-indigo-600">prayukti_techfest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">LinkedIn:</span>
                  <span className="text-sm md:text-base font-normal text-indigo-600">prayukti-techfest</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur border-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl gradient-text">👥 Coordinators</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-semibold">Jasraj Singh</p>
                  <p className="text-muted-foreground">8057203404</p>
                </div>
                <div>
                  <p className="font-semibold">Tanay Lohani</p>
                  <p className="text-muted-foreground">7505945285</p>
                </div>
                <div>
                  <p className="font-semibold">Srishti Rautela</p>
                  <p className="text-muted-foreground">9528153698</p>
                </div>
                <div>
                  <p className="font-semibold">Aditya Poudyal</p>
                  <p className="text-muted-foreground">7319157357</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{
          animationDelay: '0.4s'
        }}>
            <Button size="lg" className="bg-gradient-primary hover:shadow-primary text-base md:text-lg px-6 md:px-8" onClick={() => document.getElementById('events-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              🎯 Explore Events
            </Button>
            <Button size="lg" variant="default" className="text-base md:text-lg px-6 md:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" onClick={() => document.getElementById('registration-section')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Register Now
            </Button>
            <Button size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8" onClick={() => window.open('https://drive.google.com/file/d/1WTOKM4oMCgXaEd-ZT_O30fMUnUpFi0jl/view', '_blank')}>
              Brochure
            </Button>
            <Button size="lg" variant="secondary" className="text-base md:text-lg px-6 md:px-8" onClick={() => window.open('https://drive.google.com/drive/folders/1rxS0mFaDBkBnekCZ58uE6w6s0bMClXJp', '_blank')}>
              Rule Book
            </Button>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="events-section" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Event <span className="gradient-text">Details</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore exciting competitions and challenges across all categories. Showcase your skills and compete for amazing prizes!
          </p>
        </div>

        {/* Category Filters */}
        

        {/* Status Bar */}
        

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => <div 
              key={event.id} 
              className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-muted/30 flex items-center justify-center"
              onClick={() => setImagePopup({ src: event.image, alt: event.title })}
            >
              <img src={event.image} alt={event.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>)}
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-section" className="bg-gradient-to-b from-background to-muted/30 py-16">
        <RegistrationForm />
      </section>

      {/* Image Popup */}
      <Dialog open={!!imagePopup} onOpenChange={() => setImagePopup(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-transparent border-0 shadow-none">
          {imagePopup && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Backdrop with 30% opacity */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30 rounded-lg" />
              
              {/* Image */}
              <div className="relative z-10 w-full max-h-[90vh] flex items-center justify-center p-4">
                <img 
                  src={imagePopup.src} 
                  alt={imagePopup.alt} 
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
              </div>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-background backdrop-blur-sm"
                onClick={() => setImagePopup(null)}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>;
};
export default EventsGallery;