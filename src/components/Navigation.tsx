import { Button } from "@/components/ui/button";
import { Menu, X, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/mentor-ravi-logo.png";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userName, setUserName] = useState<string>("");
  const location = useLocation();
  const {
    user,
    userRole,
    signOut
  } = useAuth();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const {
          data
        } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data?.full_name) {
          setUserName(data.full_name.split(' ')[0]); // Get first name
        }
      } else {
        setUserName("");
      }
    };
    fetchUserProfile();
  }, [user]);

  // Get the appropriate dashboard route based on user role
  const getDashboardRoute = () => {
    // Check if user is admin or superadmin
    if (userRole === 'admin' || userRole === 'superadmin') {
      return '/admin';
    }
    // All other users go to student dashboard
    return '/dashboard/student';
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "explore", "features", "events", "courses"];
      const scrollPosition = window.scrollY + 100;
      const currentScrollY = window.scrollY;

      // Section tracking (only on home page)
      if (location.pathname === '/') {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const {
              offsetTop,
              offsetHeight
            } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }

      // Scroll behavior - optimized with requestAnimationFrame
      requestAnimationFrame(() => {
        // Check if scrolled past 50px to change width and background
        if (currentScrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        // Check scroll direction and hide/show navbar
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          // Scrolling down and past 200px - hide navbar
          setIsNavbarHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsNavbarHidden(false);
        }
        setLastScrollY(currentScrollY);
      });
    };
    
    // Debounced scroll handler for better performance
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };
    
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, location.pathname]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <nav 
      className={`fixed top-0 z-50 w-full left-0 right-0 transition-all duration-300 ease-in-out overflow-x-hidden ${isScrolled ? 'backdrop-blur-md bg-background/80 shadow-lg scale-[0.98]' : 'bg-background shadow-md scale-100'} ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`} 
      style={{
        transformOrigin: 'top center'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full px-4 py-4 max-w-full">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="MentorRaviRautela Logo" 
              className="h-10 w-auto object-contain md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            <Link 
              to="/" 
              className={`hover:text-primary transition-colors ${location.pathname === "/" ? "text-primary" : "text-foreground/80"}`}
              aria-label="Home"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              <Home size={20} aria-hidden="true" />
            </Link>

<Link 
              to="/events" 
              className={`hover:text-primary transition-colors ${location.pathname === "/events" ? "text-primary" : "text-foreground/80"}`}
              aria-current={location.pathname === "/events" ? "page" : undefined}
            >
              Events
            </Link>

            <Link 
              to="/learning-path" 
              className={`hover:text-primary transition-colors ${location.pathname === "/learning-path" || location.pathname.startsWith("/learning-path/") ? "text-primary" : "text-foreground/80"}`}
              aria-current={location.pathname.startsWith("/learning-path") ? "page" : undefined}
            >
              Learning Path
            </Link>
            <Link 
              to="/career" 
              className={`hover:text-primary transition-colors ${location.pathname === "/career" ? "text-primary" : "text-foreground/80"}`}
              aria-current={location.pathname === "/career" ? "page" : undefined}
            >
              Internships
            </Link>
            
            <Link 
              to="/more" 
              className={`hover:text-primary transition-colors ${location.pathname === "/more" ? "text-primary" : "text-foreground/80"}`}
              aria-current={location.pathname === "/more" ? "page" : undefined}
            >
              More
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? <Button size="sm" variant="outline" asChild>
                <Link to={getDashboardRoute()}>
                  Dashboard
                </Link>
              </Button> : <Button size="sm" className="bg-gradient-primary hover:shadow-primary" onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </Button>}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div 
          id="mobile-menu"
          className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in"
          role="menu"
        >
            <Link to="/" className={`flex items-center gap-2 hover:text-primary transition-colors ${location.pathname === "/" ? "text-primary" : "text-foreground/80"}`} onClick={() => setIsMenuOpen(false)}>
              <Home size={20} /> Home
            </Link>
            <Link to="/learning-path" className={`block hover:text-primary transition-colors ${location.pathname === "/learning-path" || location.pathname.startsWith("/learning-path/") ? "text-primary" : "text-foreground/80"}`} onClick={() => setIsMenuOpen(false)}>
              Learning Path
            </Link>
            <Link to="/career" className={`block hover:text-primary transition-colors ${location.pathname === "/career" ? "text-primary" : "text-foreground/80"}`} onClick={() => setIsMenuOpen(false)}>
              Career
            </Link>
            <Link to="/events" className={`block hover:text-primary transition-colors ${location.pathname === "/events" ? "text-primary" : "text-foreground/80"}`} onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link to="/more" className={`block hover:text-primary transition-colors ${location.pathname === "/more" ? "text-primary" : "text-foreground/80"}`} onClick={() => setIsMenuOpen(false)}>
              More
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              {user ? <Button size="sm" variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to={getDashboardRoute()}>
                    Dashboard
                  </Link>
                </Button> : <Button size="sm" className="bg-gradient-primary hover:shadow-primary" onClick={() => {
            setIsMenuOpen(false);
            setIsAuthModalOpen(true);
          }}>
                  Sign In
                </Button>}
            </div>
          </div>}
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>;
};
export default Navigation;