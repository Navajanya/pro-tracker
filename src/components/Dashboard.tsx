import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, BookOpen, TrendingUp, Bell } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      description: "Active enrollments",
      icon: Users,
      trend: "+12 this month",
      color: "primary"
    },
    {
      title: "Present Today",
      value: "1,189",
      description: "95.3% attendance",
      icon: UserCheck,
      trend: "+2.1% from yesterday",
      color: "success"
    },
    {
      title: "Absent Today",
      value: "58",
      description: "4.7% absent rate",
      icon: UserX,
      trend: "-1.2% from yesterday",
      color: "warning"
    },
    {
      title: "Pending Notifications",
      value: "24",
      description: "Parent alerts to send",
      icon: Bell,
      trend: "15 sent today",
      color: "accent"
    }
  ];

  const recentActivity = [
    { student: "Alice Johnson", class: "Grade 10-A", status: "absent", time: "2 hours ago" },
    { student: "Michael Chen", class: "Grade 9-B", status: "late", time: "3 hours ago" },
    { student: "Sarah Williams", class: "Grade 11-C", status: "present", time: "4 hours ago" },
    { student: "David Brown", class: "Grade 10-B", status: "absent", time: "5 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Management Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track attendance, manage grades, and communicate with parents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="gradient-primary text-primary-foreground shadow-medium">
              <Bell className="mr-2 h-4 w-4" />
              Send Notifications
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${
                    stat.color === 'primary' ? 'text-primary' :
                    stat.color === 'success' ? 'text-success' :
                    stat.color === 'warning' ? 'text-warning' :
                    stat.color === 'accent' ? 'text-accent' :
                    'text-muted-foreground'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription>Common daily tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gradient-primary text-primary-foreground" size="sm">
                Mark Attendance
              </Button>
              <Button className="w-full gradient-secondary text-secondary-foreground" size="sm">
                Enter Grades
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                Add New Student
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription>Latest student attendance updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          activity.status === 'present' ? 'default' : 
                          activity.status === 'late' ? 'secondary' : 
                          'destructive'
                        }
                        className="mb-1"
                      >
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Attendance Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Attendance Trends
              </CardTitle>
              <CardDescription>Weekly attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <span className="font-semibold text-success">96.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Week</span>
                  <span className="font-semibold text-foreground">94.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Average</span>
                  <span className="font-semibold text-foreground">95.1%</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-2">
                  <span className="text-sm font-medium text-foreground">Yearly Average</span>
                  <span className="font-bold text-primary">94.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grade Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-secondary" />
                Academic Performance
              </CardTitle>
              <CardDescription>Recent assessment averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Weekly Tests</span>
                  <span className="font-semibold text-success">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Assessments</span>
                  <span className="font-semibold text-foreground">82.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quarterly Exams</span>
                  <span className="font-semibold text-foreground">85.3%</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-2">
                  <span className="text-sm font-medium text-foreground">Overall Average</span>
                  <span className="font-bold text-secondary">81.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;