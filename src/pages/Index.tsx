import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import StudentManagement from "@/components/StudentManagement";
import AttendanceMarking from "@/components/AttendanceMarking";
import GradeManagement from "@/components/GradeManagement";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceMarking />;
      case 'grades':
        return <GradeManagement />;
      case 'reports':
        return (
          <div className="min-h-screen bg-gradient-subtle p-6 lg:pl-70">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-3xl font-bold text-foreground mb-4">Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive reports and analytics coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="lg:pl-64">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default Index;
