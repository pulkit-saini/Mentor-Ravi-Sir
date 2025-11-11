import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Search, CalendarDays, Clock, Users, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
type EventStatus = "going" | "interested" | "pending";
type TabType = "upcoming" | "past";
interface Event {
  id: number;
  title: string;
  organizer: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date: string;
  time: string;
  location: string;
  tags: string[];
  status: EventStatus;
  attendees: {
    avatar: string;
    name: string;
  }[];
  additionalAttendees: number;
  image: string;
  description?: string;
  agenda?: string[];
  requirements?: string[];
  benefits?: string[];
}
import eventPrayuktiBanner from "@/assets/event-prayukti-banner.png";
import eventBattleBands from "@/assets/event-battle-bands.jpg";
const upcomingEvents: Event[] = [{
  id: 1,
  title: "PRAYUKTI - TECH FEST 2025",
  organizer: {
    name: "Graphic Era Hill University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GEHU",
    bio: "Graphic Era Hill University - Nurturing Dreams into Reality. Premier institution in Dehradun, Bhimtal, and Haldwani"
  },
  date: "2025-11-13",
  time: "9:00 AM Onwards",
  location: "Graphic Era Hill University, Bhimtal Campus",
  tags: ["prayukti 2025", "engineering", "competition", "robotics", "coding", "technical fest"],
  status: "pending",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student1",
    name: "Rahul"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student2",
    name: "Priya"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student3",
    name: "Amit"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student4",
    name: "Neha"
  }],
  additionalAttendees: 146,
  image: eventPrayuktiBanner,
  description: "PRAYUKTI 2025 - Learn, Apply, Excel! Join us for an incredible two-day technical fest featuring multiple competitions including Sky High Tower Challenge, Battle of the Bands, Robo Car Race, Code Relay, Photography Contest, Robo War, and Echoes of Intellect. Total prize pool of ₹5,00,000+ with cash prizes, merchandise, and recognition!",
  agenda: ["Day 1 (Nov 13) - 9:00 AM: Registration & Opening Ceremony", "10:00 AM: Battle of the Bands Begins", "11:00 AM: Sky High Tower Challenge - Design Phase", "12:30 PM: Lunch & Networking Break", "1:30 PM: Robo Car Race Preliminary Rounds", "3:00 PM: Code Relay Competition", "5:00 PM: Photography Contest Submissions", "Day 2 (Nov 14) - 9:00 AM: Robo War Competition", "11:00 AM: Echoes of Intellect - Quiz Competition", "2:00 PM: Final Rounds & Judging", "4:00 PM: Prize Distribution & Closing Ceremony"],
  requirements: ["Students from any engineering/technical background", "Teams of 2-4 members (varies by event)", "Valid college ID for registration", "Passion for technology, innovation, and competition"],
  benefits: ["Total Prize Pool: ₹5,00,000+ across all events", "Cash prizes, merchandise, and recognition", "Participation certificates for all participants", "Hands-on experience in technical competitions", "Networking with 150+ students and industry professionals", "Recognition in PRAYUKTI 2025 technical fest", "Platform to showcase technical and creative skills"]
}, {
  id: 2,
  title: "Battle of the Bands",
  organizer: {
    name: "Graphic Era Hill University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GEHU",
    bio: "Graphic Era Hill University, Bhimtal Campus - Nurturing Dreams into Reality"
  },
  date: "2025-11-13",
  time: "To Be Announced",
  location: "Open Air Theatre (OAT), Graphic Era Hill University, Bhimtal Campus",
  tags: ["music competition", "band battle", "cultural fest", "live performance", "prayukti 2025"],
  status: "pending",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Music1",
    name: "Jasraj"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Music2",
    name: "Tanay"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Music3",
    name: "Vishwajeet"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Music4",
    name: "Ravi"
  }],
  additionalAttendees: 85,
  image: eventBattleBands,
  description: "Battle of the Bands is a flagship music event of Prayukti 2025, hosted by Graphic Era Hill University, Bhimtal Campus. The competition will take place on November 13 & 14, 2025, at the Open Air Theatre (OAT). Talented student bands from across India will compete live for a ₹40,000 prize pool. The event promises high-energy performances, electrifying music, and an unforgettable cultural experience.",
  agenda: ["Day 1 (Nov 13) - Band Registration & Sound Check", "Opening Performance & Competition Rounds Begin", "Live Performances by Participating Bands", "Day 2 (Nov 14) - Final Round Performances", "Judges' Evaluation & Audience Voting", "Winner Announcement & Prize Distribution"],
  requirements: ["Band must have 3-6 members", "Original compositions encouraged", "All genres welcome (Rock, Pop, Fusion, etc.)", "Valid student ID required for registration", "Bring your own instruments (basic sound system provided)"],
  benefits: ["Prize Pool: ₹40,000", "Platform to showcase musical talent", "Networking with musicians and music enthusiasts", "Participation certificates for all bands", "Opportunity to perform at Prayukti 2025", "Exposure to industry professionals", "Professional sound and lighting setup"]
}, {
  id: 3,
  title: "Women in Tech Mentorship Program Kickoff",
  organizer: {
    name: "Dr. Maya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    bio: "Tech Entrepreneur & Advocate for Women in STEM. Founded 3 successful startups and mentored 200+ women in tech."
  },
  date: "2025-11-22",
  time: "10:00 AM",
  location: "Tech Hub, Silicon Valley",
  tags: ["tech", "women in tech", "mentorship", "career growth"],
  status: "pending",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    name: "Sophia"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    name: "Olivia"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    name: "Ava"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    name: "Mia"
  }],
  additionalAttendees: 116,
  image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80",
  description: "Launch event for our 6-month mentorship program designed to support and accelerate the careers of women in technology. Connect with industry leaders, find your mentor, and join a supportive community of tech professionals.",
  agenda: ["10:00 AM - Welcome & Program Overview", "10:45 AM - Panel Discussion: Breaking Barriers in Tech", "11:30 AM - Networking Brunch", "12:15 PM - Mentor-Mentee Speed Matching", "1:30 PM - Breakout Sessions by Tech Domain", "2:30 PM - Program Guidelines & Next Steps"],
  requirements: ["Currently working in or aspiring to work in tech", "Commitment to 6-month program duration", "Willingness to participate in monthly meetups"],
  benefits: ["Paired with experienced tech mentor", "Access to exclusive workshops and events", "Career guidance and technical skill development", "Join community of 120+ women in tech"]
}, {
  id: 4,
  title: "Career Transitions: Finding Your Path",
  organizer: {
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Career Strategist & Executive Coach. Helped 500+ professionals navigate successful career transitions."
  },
  date: "2025-12-05",
  time: "7:00 PM",
  location: "Community Hall, Westside",
  tags: ["career transition", "strategy", "networking", "professional development"],
  status: "interested",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    name: "Liam"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    name: "Noah"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    name: "Ethan"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    name: "Lucas"
  }],
  additionalAttendees: 61,
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  description: "Navigate your career transition with confidence. Whether you're switching industries, seeking advancement, or exploring entrepreneurship, this event provides actionable strategies and insights from professionals who've successfully made the leap.",
  agenda: ["7:00 PM - Registration & Light Refreshments", "7:20 PM - Keynote: Embracing Change in Your Career", "8:00 PM - Workshop: Identifying Your Transferable Skills", "8:30 PM - Panel: Career Transition Success Stories", "9:15 PM - Networking Session", "9:45 PM - Closing & Resource Sharing"],
  requirements: ["Open mind and willingness to explore new possibilities", "Resume or CV (optional but recommended)", "Career goals or challenges to discuss"],
  benefits: ["Personalized career transition roadmap", "Resume review checklist", "Access to job transition resources", "Connect with career counselors and recruiters"]
}];
const pastEvents: Event[] = [{
  id: 5,
  title: "Innovation Lab 2024",
  organizer: {
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  },
  date: "2024-12-10",
  time: "9:00 AM",
  location: "Tech Park, Downtown",
  tags: ["innovation", "startup", "technology"],
  status: "going",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    name: "Tom"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    name: "Lisa"
  }],
  additionalAttendees: 248,
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
}, {
  id: 6,
  title: "Agritech Expo 2024",
  organizer: {
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  date: "2024-11-15",
  time: "10:00 AM",
  location: "Exhibition Center",
  tags: ["agritech", "innovation", "farming"],
  status: "going",
  attendees: [{
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    name: "Raj"
  }, {
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    name: "Anita"
  }],
  additionalAttendees: 398,
  image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80"
}];
const EventsPage = () => {
  const navigate = useNavigate();
  const {
    showAuthModal,
    setShowAuthModal,
    executeProtectedAction,
    completePendingAction,
    clearPendingAction
  } = useProtectedAction();
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [imagePopup, setImagePopup] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Handle pending action after login
  useEffect(() => {
    completePendingAction(action => {
      if (action.type === 'register_event' && action.data) {
        // Navigate to event registration page
        navigate(`/event-registration?eventId=${action.data.id}`);
      }
    });
  }, [completePendingAction, navigate]);

  // Filter events based on search query and status
  const getFilteredEvents = () => {
    let events = activeTab === "upcoming" ? upcomingEvents : pastEvents;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      events = events.filter(event => event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query) || event.organizer.name.toLowerCase().includes(query) || event.tags.some(tag => tag.toLowerCase().includes(query)));
    }

    // Apply status filter
    if (statusFilter !== "all") {
      events = events.filter(event => event.status === statusFilter);
    }

    // Apply sorting
    events = [...events].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "attendees":
          const totalA = a.attendees.length + a.additionalAttendees;
          const totalB = b.attendees.length + b.additionalAttendees;
          return totalB - totalA;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return events;
  };
  const currentEvents = getFilteredEvents();
  const eventCount = currentEvents.length;
  const statusColors = {
    going: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50",
    interested: "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/50",
    pending: "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/50"
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', {
      month: 'short'
    });
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-US', {
      weekday: 'long'
    });
    return {
      month,
      day,
      dayName
    };
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">All Events</h1>
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6">
            <Button variant={activeTab === "upcoming" ? "default" : "ghost"} onClick={() => setActiveTab("upcoming")} className={activeTab === "upcoming" ? "bg-primary text-primary-foreground" : ""}>
              Upcoming
            </Button>
            <Button variant={activeTab === "past" ? "default" : "ghost"} onClick={() => setActiveTab("past")} className={activeTab === "past" ? "bg-primary text-primary-foreground" : ""}>
              Past
            </Button>
            
            
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search events, location, or organizer..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="going">Going</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="attendees">Attendees</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="relative space-y-4 md:space-y-8">
          {currentEvents.slice(0, 1).map((event, index) => {
          const {
            month,
            day,
            dayName
          } = formatDate(event.date);
          return <div key={event.id} className="flex gap-3 md:gap-6 relative" onClick={() => window.location.href = '/prayukti-fest'} style={{
            cursor: 'pointer'
          }}>
                {/* Date Column */}
                <div className="flex-shrink-0 w-16 md:w-24 text-center relative">
                  <div className="relative z-10 py-2">
                    {index === 0 ? <>
                        <div className="text-lg md:text-2xl font-bold">13 & 14</div>
                        <div className="text-xs md:text-sm text-muted-foreground">Nov 25</div>
                      </> : <>
                        <div className="text-lg md:text-2xl font-bold">{month} {day}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{dayName}</div>
                      </>}
                  </div>
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in" onClick={e => {
              if (index === 0) {
                // First card redirects to /prayukti-fest
                return;
              }
              e.stopPropagation();
              setSelectedEvent(event);
            }}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Event Details */}
                  <div className="flex-1 space-y-3 md:space-y-4">
                      {index === 0 && <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                          Graphic Era Fest
                        </Badge>}
                      <div className="text-xs md:text-sm text-muted-foreground">{event.time}</div>
                      
                      <h3 className="text-xl md:text-2xl font-bold">{event.title}</h3>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5 md:w-6 md:h-6">
                          <AvatarImage src={event.organizer.avatar} />
                          <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs md:text-sm text-muted-foreground">By {event.organizer.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {event.tags.slice(0, 3).map((tag, index) => <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>)}
                        {event.tags.length > 3 && <Badge variant="secondary" className="text-xs">
                            +{event.tags.length - 3}
                          </Badge>}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                        
                        
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((attendee, index) => <Avatar key={index} className="w-6 h-6 md:w-8 md:h-8 border-2 border-background">
                                <AvatarImage src={attendee.avatar} />
                                <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                              </Avatar>)}
                          </div>
                          {event.additionalAttendees > 0 && <span className="ml-2 text-xs md:text-sm font-semibold text-muted-foreground">
                              +{event.additionalAttendees}
                            </span>}
                        </div>
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="w-full md:w-48 h-40 md:h-48 rounded-lg overflow-hidden flex-shrink-0 hover-scale bg-muted/30 cursor-pointer" onClick={e => {
                  e.stopPropagation();
                  setImagePopup({
                    src: event.image,
                    alt: event.title
                  });
                }}>
                      <img src={event.image} alt={event.title} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && <>
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold pr-8">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={selectedEvent.organizer.avatar} />
                      <AvatarFallback>{selectedEvent.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>Organized by {selectedEvent.organizer.name}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 md:space-y-6 mt-4">
                {/* Event Image */}
                <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-muted/30 flex items-center justify-center" onClick={() => setImagePopup({
              src: selectedEvent.image,
              alt: selectedEvent.title
            })}>
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-contain" />
                </div>

                {/* Organizer Info */}
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedEvent.organizer.avatar} />
                      <AvatarFallback>{selectedEvent.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{selectedEvent.organizer.name}</h3>
                      {selectedEvent.organizer.bio && <p className="text-sm text-muted-foreground">{selectedEvent.organizer.bio}</p>}
                    </div>
                  </div>
                </div>

                {/* Event Description */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">About this event</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedEvent.description || "Join us for an incredible learning opportunity where industry experts share their insights and experiences. This event is designed to help you grow professionally, network with peers, and gain valuable knowledge that you can apply in your career journey."}
                  </p>
                </div>

                {/* Agenda */}
                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Event Agenda
                    </h3>
                    <div className="space-y-2">
                      {selectedEvent.agenda.map((item, index) => <div key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </div>)}
                    </div>
                  </div>}

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <CalendarDays className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">Date & Time</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                      </div>
                      <div className="text-sm text-muted-foreground">{selectedEvent.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">Location</div>
                      <div className="text-sm text-muted-foreground truncate">{selectedEvent.location}</div>
                      <Button variant="link" className="h-auto p-0 text-xs text-primary">
                        View on map
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">Attendees</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedEvent.attendees.length + selectedEvent.additionalAttendees} people attending
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.floor(Math.random() * 20) + 5} spots remaining
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">Your Status</div>
                      <Badge className={statusColors[selectedEvent.status]}>
                        {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        Registration closes 24h before
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                {selectedEvent.requirements && selectedEvent.requirements.length > 0 && <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-primary">📋</span>
                      Requirements
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {selectedEvent.requirements.map((item, index) => <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>)}
                    </ul>
                  </div>}

                {/* Benefits */}
                {selectedEvent.benefits && selectedEvent.benefits.length > 0 && <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-primary">✨</span>
                      What You'll Get
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {selectedEvent.benefits.map((item, index) => <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>)}
                    </ul>
                  </div>}

                {/* Tags */}
                <div>
                  <div className="font-semibold mb-3">Topics</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>)}
                  </div>
                </div>

                {/* Attendees Preview */}
                <div>
                  <div className="font-semibold mb-3">Attendees</div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {selectedEvent.attendees.map((attendee, index) => <Avatar key={index} className="w-10 h-10 border-2 border-background">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>)}
                    </div>
                    {selectedEvent.additionalAttendees > 0 && <span className="text-sm font-semibold text-muted-foreground">
                        +{selectedEvent.additionalAttendees} others
                      </span>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <Button className="w-full" size="lg" onClick={() => {
                if (selectedEvent.status === "going") {
                  // Already registered
                  return;
                }
                executeProtectedAction('register_event', selectedEvent, () => {
                  // Navigate to event registration
                  navigate(`/event-registration?eventId=${selectedEvent.id}`);
                });
              }}>
                    {selectedEvent.status === "going" ? "You're Going" : selectedEvent.status === "interested" ? "Mark as Going" : "Register Now"}
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Share Event
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      {selectedEvent.status === "interested" ? "Not Interested" : "Mark Interested"}
                    </Button>
                  </div>
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>

      {/* Image Popup */}
      <Dialog open={!!imagePopup} onOpenChange={() => setImagePopup(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-transparent border-0 shadow-none">
          {imagePopup && <div className="relative w-full h-full flex items-center justify-center">
              {/* Backdrop with 30% opacity */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30 rounded-lg" />
              
              {/* Image */}
              <div className="relative z-10 w-full max-h-[90vh] flex items-center justify-center p-4">
                <img src={imagePopup.src} alt={imagePopup.alt} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
              </div>
              
              {/* Close Button */}
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-20 bg-background/80 hover:bg-background backdrop-blur-sm" onClick={() => setImagePopup(null)}>
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>}
        </DialogContent>
      </Dialog>

      <Footer />
      
      <AuthModal isOpen={showAuthModal} onClose={clearPendingAction} message="Please sign in to continue with your registration 🚀" />
    </div>;
};
export default EventsPage;