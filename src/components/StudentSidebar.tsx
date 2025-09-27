import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  BookOpen,
  GraduationCap,
  Users,
  UserCheck,
  Gift,
  Camera,
  DollarSign,
  CalendarDays,
  FileText,
  Clock
} from "lucide-react";

interface StudentSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const StudentSidebar = ({ currentView, onViewChange }: StudentSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const studentMenuItems = [
    {
      label: "Academic",
      items: [
        { title: "Dashboard", view: "student-dashboard", icon: LayoutDashboard },
        { title: "Attendance", view: "student-attendance", icon: ClipboardList },
        { title: "Timetable", view: "student-timetable", icon: Clock },
        { title: "Course Schedule", view: "student-schedule", icon: Calendar },
        { title: "Syllabus", view: "student-syllabus", icon: BookOpen },
        { title: "Exam Marks", view: "student-marks", icon: GraduationCap },
        { title: "Homework", view: "student-homework", icon: FileText },
        { title: "Date Sheet", view: "student-datesheet", icon: CalendarDays },
      ]
    },
    {
      label: "Social",
      items: [
        { title: "Classmates", view: "student-classmates", icon: Users },
        { title: "Teachers", view: "student-teachers", icon: UserCheck },
        { title: "Birthdays", view: "student-birthdays", icon: Gift },
        { title: "Photo Gallery", view: "student-gallery", icon: Camera },
      ]
    },
    {
      label: "Other",
      items: [
        { title: "Fee Report", view: "student-fees", icon: DollarSign },
        { title: "Holiday List", view: "student-holidays", icon: Calendar },
        { title: "Activity Calendar", view: "student-activities", icon: CalendarDays },
      ]
    }
  ];

  const isActive = (view: string) => currentView === view;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        {studentMenuItems.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={isActive(item.view) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                    >
                      <button
                        onClick={() => onViewChange(item.view)}
                        className="w-full flex items-center"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default StudentSidebar;