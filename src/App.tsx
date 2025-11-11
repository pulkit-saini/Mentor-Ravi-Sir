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
import JudgeProtectedRoute from "./components/JudgeProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineIndicator from "./components/OfflineIndicator";
import { PageLoadingFallback } from "./components/LoadingFallback";

// Eagerly load home page for best first visit
import Index from "./pages/Index";

// Lazy load all other pages
const EventsPage = lazy(() => import("./pages/Events"));
const EventsGallery = lazy(() => import("./pages/EventsGallery"));
const Gallery = lazy(() => import("./pages/Gallery"));
const LearningPath = lazy(() => import("./pages/LearningPath"));
const Career = lazy(() => import("./pages/Career"));
const InternshipDetail = lazy(() => import("./pages/InternshipDetail"));
const AIMLIntern = lazy(() => import("./pages/career/AIMLIntern"));
const FullStackIntern = lazy(() => import("./pages/career/FullStackIntern"));
const GoogleWorkspaceIntern = lazy(() => import("./pages/career/GoogleWorkspaceIntern"));
const Engagements = lazy(() => import("./pages/Engagements"));
const Workshop = lazy(() => import("./pages/Workshop"));
const Mentorship = lazy(() => import("./pages/Mentorship"));
const Projects = lazy(() => import("./pages/Projects"));
const Hackathons = lazy(() => import("./pages/Hackathons"));
const PlacementSupport = lazy(() => import("./pages/PlacementSupport"));
const Research = lazy(() => import("./pages/Research"));
const CoursesPage = lazy(() => import("./pages/Courses"));
const AboutPage = lazy(() => import("./pages/About"));
const ConnectNow = lazy(() => import("./pages/ConnectNow"));
const EventRegistration = lazy(() => import("./pages/EventRegistration"));
const CourseEnrollment = lazy(() => import("./pages/CourseEnrollment"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const StudentEventDashboard = lazy(() => import("./pages/StudentEventDashboard"));
const StudentEventDetails = lazy(() => import("./pages/StudentEventDetails"));
const StudentCoursesDashboard = lazy(() => import("./pages/StudentCoursesDashboard"));
const StudentCoursePage = lazy(() => import("./pages/StudentCoursePage"));
const StudentInternships = lazy(() => import("./pages/StudentInternships"));
const StudentInternshipDetails = lazy(() => import("./pages/StudentInternshipDetails"));
const StudentEvents = lazy(() => import("./pages/StudentEvents"));
const StudentWorkshops = lazy(() => import("./pages/StudentWorkshops"));
const StudentWorkshopDetail = lazy(() => import("./pages/StudentWorkshopDetail"));
const StudentCoursesAll = lazy(() => import("./pages/StudentCoursesAll"));
const StudentCertificates = lazy(() => import("./pages/StudentCertificates"));
const JudgeDashboard = lazy(() => import("./pages/JudgeDashboard"));
const JudgeWorkshopDetail = lazy(() => import("./pages/JudgeWorkshopDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminCourses = lazy(() => import("./pages/admin/AdminCourses"));
const AdminTasks = lazy(() => import("./pages/admin/AdminTasks"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminChat = lazy(() => import("./pages/admin/AdminChat"));
const AdminMentorship = lazy(() => import("./pages/admin/AdminMentorship"));
const AdminLeaderboard = lazy(() => import("./pages/admin/AdminLeaderboard"));
const AdminCertificates = lazy(() => import("./pages/admin/AdminCertificates"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminWorkshops = lazy(() => import("./pages/admin/AdminWorkshops"));
const AdminWorkshopDetail = lazy(() => import("./pages/admin/AdminWorkshopDetail"));
const AdminInternships = lazy(() => import("./pages/admin/AdminInternships"));
const AdminQueries = lazy(() => import("./pages/admin/AdminQueries"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AIDomain = lazy(() => import("./pages/domains/AIDomain"));
const WebDevDomain = lazy(() => import("./pages/domains/WebDevDomain"));
const CybersecurityDomain = lazy(() => import("./pages/domains/CybersecurityDomain"));
const BlockchainDomain = lazy(() => import("./pages/domains/BlockchainDomain"));
const CloudDomain = lazy(() => import("./pages/domains/CloudDomain"));
const DataScienceDomain = lazy(() => import("./pages/domains/DataScienceDomain"));
const MobileDomain = lazy(() => import("./pages/domains/MobileDomain"));
const DevOpsDomain = lazy(() => import("./pages/domains/DevOpsDomain"));
const GameDevDomain = lazy(() => import("./pages/domains/GameDevDomain"));
const IoTDomain = lazy(() => import("./pages/domains/IoTDomain"));
const UIUXDomain = lazy(() => import("./pages/domains/UIUXDomain"));
const ARVRDomain = lazy(() => import("./pages/domains/ARVRDomain"));
const DiscoverYourself = lazy(() => import("./pages/DiscoverYourself"));
const Vault = lazy(() => import("./pages/Vault"));

// Optimized QueryClient with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
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
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/prayukti-fest" element={<EventsGallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/learning-path/ai" element={<AIDomain />} />
          <Route path="/learning-path/webdev" element={<WebDevDomain />} />
          <Route path="/learning-path/cybersecurity" element={<CybersecurityDomain />} />
          <Route path="/learning-path/blockchain" element={<BlockchainDomain />} />
          <Route path="/learning-path/cloud" element={<CloudDomain />} />
          <Route path="/learning-path/datascience" element={<DataScienceDomain />} />
          <Route path="/learning-path/mobile" element={<MobileDomain />} />
          <Route path="/learning-path/devops" element={<DevOpsDomain />} />
          <Route path="/learning-path/gamedev" element={<GameDevDomain />} />
          <Route path="/learning-path/iot" element={<IoTDomain />} />
          <Route path="/learning-path/uiux" element={<UIUXDomain />} />
          <Route path="/learning-path/arvr" element={<ARVRDomain />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/ai-ml" element={<AIMLIntern />} />
          <Route path="/career/full-stack" element={<FullStackIntern />} />
          <Route path="/career/google-workspace" element={<GoogleWorkspaceIntern />} />
          <Route path="/internship/:id" element={<InternshipDetail />} />
          <Route path="/engagements" element={<Engagements />} />
          <Route path="/more" element={<Engagements />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/training" element={<CoursesPage />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/placement-support" element={<PlacementSupport />} />
          <Route path="/research" element={<Research />} />
          <Route path="/discover-yourself" element={<DiscoverYourself />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/connect" element={<ConnectNow />} />
          <Route path="/events/register" element={<ProtectedRoute><EventRegistration /></ProtectedRoute>} />
          <Route path="/courses/enroll" element={<ProtectedRoute><CourseEnrollment /></ProtectedRoute>} />
          <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/student/events" element={<ProtectedRoute><StudentEvents /></ProtectedRoute>} />
          <Route path="/dashboard/student/workshops" element={<ProtectedRoute><StudentWorkshops /></ProtectedRoute>} />
          <Route path="/dashboard/student/workshops/:id" element={<ProtectedRoute><StudentWorkshopDetail /></ProtectedRoute>} />
          <Route path="/dashboard/student/courses-all" element={<ProtectedRoute><StudentCoursesAll /></ProtectedRoute>} />
          <Route path="/dashboard/student/certificates" element={<ProtectedRoute><StudentCertificates /></ProtectedRoute>} />
          <Route path="/dashboard/student/courses" element={<ProtectedRoute><StudentCoursesDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/student/course/:courseId" element={<ProtectedRoute><StudentCoursePage /></ProtectedRoute>} />
          <Route path="/dashboard/student/internships" element={<ProtectedRoute><StudentInternships /></ProtectedRoute>} />
          <Route path="/dashboard/student/internship/:internshipId" element={<ProtectedRoute><StudentInternshipDetails /></ProtectedRoute>} />
          <Route path="/dashboard/student/event/:eventId" element={<ProtectedRoute><StudentEventDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/student/event-details/:eventId" element={<ProtectedRoute><StudentEventDetails /></ProtectedRoute>} />
          <Route path="/dashboard/judge" element={<JudgeProtectedRoute><JudgeDashboard /></JudgeProtectedRoute>} />
          <Route path="/dashboard/judge/workshops/:id" element={<JudgeProtectedRoute><JudgeWorkshopDetail /></JudgeProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout><AdminOverview /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/panel" element={<AdminProtectedRoute><AdminLayout><AdminOverview /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/events" element={<AdminProtectedRoute><AdminLayout><AdminEvents /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/workshops" element={<AdminProtectedRoute><AdminLayout><AdminWorkshops /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/workshops/:id" element={<AdminProtectedRoute><AdminLayout><AdminWorkshopDetail /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/internships" element={<AdminProtectedRoute><AdminLayout><AdminInternships /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/queries" element={<AdminProtectedRoute><AdminLayout><AdminQueries /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/courses" element={<AdminProtectedRoute><AdminLayout><AdminCourses /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/tasks" element={<AdminProtectedRoute><AdminLayout><AdminTasks /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/users" element={<AdminProtectedRoute><AdminLayout><AdminUsers /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/chat" element={<AdminProtectedRoute><AdminLayout><AdminChat /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/mentorship" element={<AdminProtectedRoute><AdminLayout><AdminMentorship /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/leaderboard" element={<AdminProtectedRoute><AdminLayout><AdminLeaderboard /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/certificates" element={<AdminProtectedRoute><AdminLayout><AdminCertificates /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/media" element={<AdminProtectedRoute><AdminLayout><AdminMedia /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/analytics" element={<AdminProtectedRoute><AdminLayout><AdminAnalytics /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/notifications" element={<AdminProtectedRoute><AdminLayout><AdminNotifications /></AdminLayout></AdminProtectedRoute>} />
          <Route path="/admin/settings" element={<AdminProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></AdminProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
