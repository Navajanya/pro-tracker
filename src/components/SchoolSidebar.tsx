import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  Bus,
  BookOpen,
  BarChart3,
  Settings,
  CreditCard,
  UserPlus,
  ClipboardList,
  Award,
  Building,
  Calculator,
  HelpCircle
} from "lucide-react";

interface SchoolSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const SchoolSidebar = ({ currentView, onViewChange }: SchoolSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const menuSections = [
    {
      label: "Main",
      items: [
        { title: "Dashboard", view: "dashboard", icon: LayoutDashboard },
        { title: "Students", view: "students", icon: Users },
        { title: "Staff", view: "staff", icon: UserCheck },
        { title: "Attendance", view: "attendance", icon: ClipboardList },
        { title: "Grades", view: "grades", icon: GraduationCap },
      ]
    },
    {
      label: "Academic",
      items: [
        { title: "Timetable", view: "timetable", icon: Calendar },
        { title: "Exams", view: "exams", icon: FileText },
        { title: "Syllabus", view: "syllabus", icon: BookOpen },
        { title: "Certificates", view: "certificates", icon: Award },
      ]
    },
    {
      label: "Finance",
      items: [
        { title: "Fee Management", view: "fees", icon: DollarSign },
        { title: "Payments", view: "payments", icon: CreditCard },
        { title: "Payroll", view: "payroll", icon: Calculator },
        { title: "Accounts", view: "accounts", icon: Building },
      ]
    },
    {
      label: "Operations",
      items: [
        { title: "Transport", view: "transport", icon: Bus },
        { title: "Library", view: "library", icon: BookOpen },
        { title: "Enquiries", view: "enquiries", icon: HelpCircle },
        { title: "Admissions", view: "admissions", icon: UserPlus },
      ]
    },
    {
      label: "Reports",
      items: [
        { title: "Analytics", view: "analytics", icon: BarChart3 },
        { title: "Reports", view: "reports", icon: FileText },
        { title: "Settings", view: "settings", icon: Settings },
      ]
    }
  ];

  const isActive = (view: string) => currentView === view;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        {menuSections.map((section) => (
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

export default SchoolSidebar;