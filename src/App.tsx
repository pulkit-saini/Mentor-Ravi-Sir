import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineIndicator from "./components/OfflineIndicator";
import { PageLoadingFallback } from "./components/LoadingFallback";

// Eagerly load home page
import Index from "./pages/Index";
import CoursesPage from "./pages/Courses";
import EventsGallery from "./pages/EventsGallery";

// Lazy load essential pages only
const EventsPage = lazy(() => import("./pages/Events"));
const Career = lazy(() => import("./pages/Career"));
const MangalmayInternshipDetail = lazy(() => import("./pages/MangalmayInternshipDetail"));
const InternshipDetail = lazy(() => import("./pages/InternshipDetail"));
const AboutPage = lazy(() => import("./pages/About"));
const LearningPath = lazy(() => import("./pages/LearningPath"));
const Engagements = lazy(() => import("./pages/Engagements"));
const Workshop = lazy(() => import("./pages/Workshop"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const Projects = lazy(() => import("./pages/Projects"));
const Hackathons = lazy(() => import("./pages/Hackathons"));
const PlacementSupport = lazy(() => import("./pages/PlacementSupport"));
const Research = lazy(() => import("./pages/Research"));

// Domain pages
const WebDevDomain = lazy(() => import("./pages/domains/WebDevDomain"));
const AIDomain = lazy(() => import("./pages/domains/AIDomain"));
const DataScienceDomain = lazy(() => import("./pages/domains/DataScienceDomain"));
const MobileDomain = lazy(() => import("./pages/domains/MobileDomain"));
const GameDevDomain = lazy(() => import("./pages/domains/GameDevDomain"));
const BlockchainDomain = lazy(() => import("./pages/domains/BlockchainDomain"));
const CloudDomain = lazy(() => import("./pages/domains/CloudDomain"));
const CybersecurityDomain = lazy(() => import("./pages/domains/CybersecurityDomain"));
const IoTDomain = lazy(() => import("./pages/domains/IoTDomain"));
const ARVRDomain = lazy(() => import("./pages/domains/ARVRDomain"));
const UIUXDomain = lazy(() => import("./pages/domains/UIUXDomain"));
const DevOpsDomain = lazy(() => import("./pages/domains/DevOpsDomain"));

// Student pages - simplified
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const StudentEvents = lazy(() => import("./pages/StudentEventDashboard"));
const StudentInternships = lazy(() => import("./pages/StudentInternships"));

// Admin pages - essential only
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminWorkshops = lazy(() => import("./pages/admin/AdminWorkshops"));
const AdminInternships = lazy(() => import("./pages/admin/AdminInternships"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <OfflineIndicator />
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/learning-path" element={<LearningPath />} />
                <Route path="/learning-path/web-dev" element={<WebDevDomain />} />
                <Route path="/learning-path/ai" element={<AIDomain />} />
                <Route path="/learning-path/data-science" element={<DataScienceDomain />} />
                <Route path="/learning-path/mobile" element={<MobileDomain />} />
                <Route path="/learning-path/game-dev" element={<GameDevDomain />} />
                <Route path="/learning-path/blockchain" element={<BlockchainDomain />} />
                <Route path="/learning-path/cloud" element={<CloudDomain />} />
                <Route path="/learning-path/cybersecurity" element={<CybersecurityDomain />} />
                <Route path="/learning-path/iot" element={<IoTDomain />} />
                <Route path="/learning-path/arvr" element={<ARVRDomain />} />
                <Route path="/learning-path/uiux" element={<UIUXDomain />} />
                <Route path="/learning-path/devops" element={<DevOpsDomain />} />
                <Route path="/more" element={<Engagements />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/mentorship" element={<Mentorship />} />
                <Route path="/career" element={<Career />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/hackathons" element={<Hackathons />} />
                <Route path="/placement-support" element={<PlacementSupport />} />
                <Route path="/research" element={<Research />} />
                <Route path="/mangalmay-internship" element={<MangalmayInternshipDetail />} />
                <Route path="/internship/:id" element={<InternshipDetail />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/training" element={<CoursesPage />} />
                <Route path="/prayukti-fest" element={<EventsGallery />} />

                {/* Student protected routes */}
                <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/student/events" element={<ProtectedRoute><StudentEvents /></ProtectedRoute>} />
                <Route path="/dashboard/student/internships" element={<ProtectedRoute><StudentInternships /></ProtectedRoute>} />
                
                {/* Admin protected routes */}
                <Route path="/admin" element={<AdminProtectedRoute><AdminLayout><AdminOverview /></AdminLayout></AdminProtectedRoute>} />
                <Route path="/admin/events" element={<AdminProtectedRoute><AdminLayout><AdminEvents /></AdminLayout></AdminProtectedRoute>} />
                <Route path="/admin/workshops" element={<AdminProtectedRoute><AdminLayout><AdminWorkshops /></AdminLayout></AdminProtectedRoute>} />
                <Route path="/admin/internships" element={<AdminProtectedRoute><AdminLayout><AdminInternships /></AdminLayout></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute><AdminLayout><AdminUsers /></AdminLayout></AdminProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
