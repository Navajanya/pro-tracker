import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import LoginPage from "@/components/LoginPage";
import SchoolHeader from "@/components/SchoolHeader";
import SchoolSidebar from "@/components/SchoolSidebar";
import StudentSidebar from "@/components/StudentSidebar";
import TeacherSidebar from "@/components/TeacherSidebar";
import Dashboard from "@/components/Dashboard";
import StudentManagement from "@/components/StudentManagement";
import AttendanceMarking from "@/components/AttendanceMarking";
import GradeManagement from "@/components/GradeManagement";
import FeeManagement from "@/components/modules/FeeManagement";
import StaffManagement from "@/components/modules/StaffManagement";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{type: string, data: any} | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (userType: string, credentials: any) => {
    setCurrentUser({ type: userType, data: credentials });
    // Set appropriate dashboard based on user type
    switch (userType) {
      case 'school':
        setCurrentView('dashboard');
        break;
      case 'student':
        setCurrentView('student-dashboard');
        break;
      case 'teacher':
        setCurrentView('teacher-dashboard');
        break;
      case 'parent':
        setCurrentView('parent-dashboard');
        break;
      default:
        setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const renderSidebar = () => {
    if (!currentUser) return null;
    
    switch (currentUser.type) {
      case 'school':
        return <SchoolSidebar currentView={currentView} onViewChange={setCurrentView} />;
      case 'student':
      case 'parent':
        return <StudentSidebar currentView={currentView} onViewChange={setCurrentView} />;
      case 'teacher':
        return <TeacherSidebar currentView={currentView} onViewChange={setCurrentView} />;
      default:
        return <SchoolSidebar currentView={currentView} onViewChange={setCurrentView} />;
    }
  };

  const renderCurrentView = () => {
    if (!currentUser) return null;

    // School Admin Views
    if (currentUser.type === 'school') {
      switch (currentView) {
        case 'dashboard':
          return <Dashboard />;
        case 'students':
          return <StudentManagement />;
        case 'staff':
          return <StaffManagement />;
        case 'attendance':
          return <AttendanceMarking />;
        case 'grades':
          return <GradeManagement />;
        case 'fees':
          return <FeeManagement />;
        case 'timetable':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Timetable Management</h1><p className="text-muted-foreground">Timetable scheduling coming soon...</p></div></div>;
        case 'exams':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Exam Management</h1><p className="text-muted-foreground">Exam scheduling and management coming soon...</p></div></div>;
        case 'certificates':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Certificate Management</h1><p className="text-muted-foreground">Certificate generation coming soon...</p></div></div>;
        case 'transport':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Transport Management</h1><p className="text-muted-foreground">Transport tracking coming soon...</p></div></div>;
        case 'library':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Library Management</h1><p className="text-muted-foreground">Library system coming soon...</p></div></div>;
        case 'reports':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Reports & Analytics</h1><p className="text-muted-foreground">Comprehensive reports coming soon...</p></div></div>;
        default:
          return <Dashboard />;
      }
    }

    // Student Views
    if (currentUser.type === 'student' || currentUser.type === 'parent') {
      switch (currentView) {
        case 'student-dashboard':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Student Dashboard</h1><p className="text-muted-foreground">Welcome to your student portal!</p></div></div>;
        case 'student-attendance':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">My Attendance</h1><p className="text-muted-foreground">View your attendance records...</p></div></div>;
        case 'student-timetable':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">My Timetable</h1><p className="text-muted-foreground">View your class schedule...</p></div></div>;
        case 'student-marks':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Exam Marks</h1><p className="text-muted-foreground">View your exam results...</p></div></div>;
        case 'student-fees':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Fee Report</h1><p className="text-muted-foreground">View your fee status...</p></div></div>;
        default:
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Student Dashboard</h1><p className="text-muted-foreground">Welcome to your student portal!</p></div></div>;
      }
    }

    // Teacher Views
    if (currentUser.type === 'teacher') {
      switch (currentView) {
        case 'teacher-dashboard':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Teacher Dashboard</h1><p className="text-muted-foreground">Welcome to your teacher portal!</p></div></div>;
        case 'teacher-attendance':
          return <AttendanceMarking />;
        case 'teacher-grades':
          return <GradeManagement />;
        case 'teacher-timetable':
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">My Timetable</h1><p className="text-muted-foreground">View your teaching schedule...</p></div></div>;
        default:
          return <div className="min-h-screen bg-gradient-subtle p-6"><div className="mx-auto max-w-7xl"><h1 className="text-3xl font-bold text-foreground mb-4">Teacher Dashboard</h1><p className="text-muted-foreground">Welcome to your teacher portal!</p></div></div>;
      }
    }

    return <Dashboard />;
  };

  // Show login page if no user is logged in
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {renderSidebar()}
        <div className="flex-1 flex flex-col">
          <SchoolHeader userType={currentUser.type} onLogout={handleLogout} />
          <main className="flex-1">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
