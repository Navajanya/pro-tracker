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
  ClipboardList,
  Calendar,
  CalendarDays,
  BookOpen,
  FileText,
  Clock,
  Users,
  GraduationCap,
  MessageCircle
} from "lucide-react";

interface TeacherSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const TeacherSidebar = ({ currentView, onViewChange }: TeacherSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const teacherMenuItems = [
    {
      label: "Teaching",
      items: [
        { title: "Dashboard", view: "teacher-dashboard", icon: LayoutDashboard },
        { title: "Student Attendance", view: "teacher-attendance", icon: ClipboardList },
        { title: "Timetable", view: "teacher-timetable", icon: Clock },
        { title: "My Classes", view: "teacher-classes", icon: Users },
        { title: "Grades & Marks", view: "teacher-grades", icon: GraduationCap },
      ]
    },
    {
      label: "Content",
      items: [
        { title: "Homework", view: "teacher-homework", icon: FileText },
        { title: "Syllabus", view: "teacher-syllabus", icon: BookOpen },
        { title: "Lesson Plans", view: "teacher-lessons", icon: BookOpen },
        { title: "Messages", view: "teacher-messages", icon: MessageCircle },
      ]
    },
    {
      label: "Calendar",
      items: [
        { title: "Activity Calendar", view: "teacher-activities", icon: CalendarDays },
        { title: "Holiday List", view: "teacher-holidays", icon: Calendar },
        { title: "Exam Schedule", view: "teacher-exams", icon: Calendar },
      ]
    }
  ];

  const isActive = (view: string) => currentView === view;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        {teacherMenuItems.map((section) => (
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

export default TeacherSidebar;