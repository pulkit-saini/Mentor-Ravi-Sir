// Utility functions for managing dashboard data in localStorage

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "judge" | "admin";
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: number;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  eventId: string;
  eventTitle: string;
  submittedAt: string;
  status: "pending" | "evaluated";
  score?: number;
  feedback?: string;
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  status: "in-progress" | "completed";
}

// Initialize default data if not exists
export const initializeDefaultData = () => {
  if (!localStorage.getItem("users")) {
    const defaultUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "student",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "student",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem("events")) {
    const defaultEvents: Event[] = [
      {
        id: "1",
        title: "Innovation Hackathon 25",
        description: "Build innovative solutions to real-world problems",
        date: "March 15-17, 25",
        location: "Online",
        status: "upcoming",
        participants: 250,
      },
      {
        id: "2",
        title: "Design Sprint Challenge",
        description: "Create stunning UI/UX designs for mobile apps",
        date: "March 20-22, 25",
        location: "Hybrid",
        status: "upcoming",
        participants: 180,
      },
    ];
    localStorage.setItem("events", JSON.stringify(defaultEvents));
  }

  if (!localStorage.getItem("submissions")) {
    const defaultSubmissions: Submission[] = [
      {
        id: "1",
        studentId: "1",
        studentName: "John Doe",
        eventId: "1",
        eventTitle: "Innovation Hackathon 25",
        submittedAt: new Date().toISOString(),
        status: "pending",
      },
      {
        id: "2",
        studentId: "2",
        studentName: "Jane Smith",
        eventId: "1",
        eventTitle: "Innovation Hackathon 25",
        submittedAt: new Date().toISOString(),
        status: "pending",
      },
    ];
    localStorage.setItem("submissions", JSON.stringify(defaultSubmissions));
  }
};

// User management
export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const addUser = (user: Omit<User, "id" | "createdAt">) => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
};

export const deleteUser = (userId: string) => {
  const users = getUsers();
  const filteredUsers = users.filter((u) => u.id !== userId);
  localStorage.setItem("users", JSON.stringify(filteredUsers));
};

// Event management
export const getEvents = (): Event[] => {
  const events = localStorage.getItem("events");
  return events ? JSON.parse(events) : [];
};

export const addEvent = (event: Omit<Event, "id">) => {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: Date.now().toString(),
  };
  events.push(newEvent);
  localStorage.setItem("events", JSON.stringify(events));
  return newEvent;
};

export const updateEvent = (eventId: string, updates: Partial<Event>) => {
  const events = getEvents();
  const updatedEvents = events.map((e) =>
    e.id === eventId ? { ...e, ...updates } : e
  );
  localStorage.setItem("events", JSON.stringify(updatedEvents));
};

export const deleteEvent = (eventId: string) => {
  const events = getEvents();
  const filteredEvents = events.filter((e) => e.id !== eventId);
  localStorage.setItem("events", JSON.stringify(filteredEvents));
};

// Submission management
export const getSubmissions = (): Submission[] => {
  const submissions = localStorage.getItem("submissions");
  return submissions ? JSON.parse(submissions) : [];
};

export const getPendingSubmissions = (): Submission[] => {
  return getSubmissions().filter((s) => s.status === "pending");
};

export const evaluateSubmission = (
  submissionId: string,
  score: number,
  feedback: string
) => {
  const submissions = getSubmissions();
  const updatedSubmissions = submissions.map((s) =>
    s.id === submissionId
      ? { ...s, status: "evaluated" as const, score, feedback }
      : s
  );
  localStorage.setItem("submissions", JSON.stringify(updatedSubmissions));
};

// Course management
export const getCourses = (): Course[] => {
  const courses = localStorage.getItem("courses");
  if (!courses) {
    const defaultCourses: Course[] = [
      {
        id: "1",
        title: "Startup Incubation Program",
        progress: 65,
        status: "in-progress",
      },
      {
        id: "2",
        title: "AWS Cloud Architecture Mastery",
        progress: 30,
        status: "in-progress",
      },
      {
        id: "3",
        title: "Leadership & Team Management",
        progress: 100,
        status: "completed",
      },
    ];
    localStorage.setItem("courses", JSON.stringify(defaultCourses));
    return defaultCourses;
  }
  return JSON.parse(courses);
};

export const updateCourseProgress = (courseId: string, progress: number) => {
  const courses = getCourses();
  const updatedCourses = courses.map((c) =>
    c.id === courseId
      ? {
          ...c,
          progress,
          status: progress === 100 ? ("completed" as const) : ("in-progress" as const),
        }
      : c
  );
  localStorage.setItem("courses", JSON.stringify(updatedCourses));
};
