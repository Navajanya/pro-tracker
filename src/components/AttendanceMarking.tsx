import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, UserCheck, UserX, Clock, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | null;
  parentPhone: string;
}

const AttendanceMarking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Alice Johnson",
      rollNumber: "10A-001",
      status: null,
      parentPhone: "+1-555-0123"
    },
    {
      id: "2",
      name: "Michael Chen",
      rollNumber: "10A-002",
      status: null,
      parentPhone: "+1-555-0124"
    },
    {
      id: "3",
      name: "Sarah Williams",
      rollNumber: "10A-003",
      status: null,
      parentPhone: "+1-555-0125"
    },
    {
      id: "4",
      name: "David Brown",
      rollNumber: "10A-004",
      status: null,
      parentPhone: "+1-555-0126"
    },
    {
      id: "5",
      name: "Emma Davis",
      rollNumber: "10A-005",
      status: null,
      parentPhone: "+1-555-0127"
    },
    {
      id: "6",
      name: "James Wilson",
      rollNumber: "10A-006",
      status: null,
      parentPhone: "+1-555-0128"
    }
  ]);

  const classes = ["Grade 9-A", "Grade 9-B", "Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B", "Grade 11-C"];

  const updateAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'danger';
      case 'late': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'present': return <UserCheck className="h-4 w-4" />;
      case 'absent': return <UserX className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    const unmarked = students.filter(s => s.status === null).length;

    return { total, present, absent, late, unmarked };
  };

  const stats = getAttendanceStats();
  const absentStudents = students.filter(s => s.status === 'absent');

  const handleSaveAttendance = () => {
    // Here you would save to database
    console.log("Saving attendance for", selectedDate, selectedClass, students);
  };

  const handleSendNotifications = () => {
    // Here you would send notifications to parents
    console.log("Sending notifications to parents of absent students:", absentStudents);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
            <p className="text-muted-foreground mt-2">Record daily student attendance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveAttendance}>
              <Save className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
            <Button 
              className="gradient-primary text-primary-foreground shadow-medium"
              onClick={handleSendNotifications}
              disabled={absentStudents.length === 0}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Notifications ({absentStudents.length})
            </Button>
          </div>
        </div>

        {/* Date and Class Selection */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Select Date</CardTitle>
              <CardDescription>Choose the date for attendance marking</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Select Class</CardTitle>
              <CardDescription>Choose the class for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Stats */}
        {selectedClass && (
          <div className="grid gap-4 md:grid-cols-5">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{stats.present}</div>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-danger">{stats.absent}</div>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{stats.late}</div>
                  <p className="text-xs text-muted-foreground">Late</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-muted-foreground">{stats.unmarked}</div>
                  <p className="text-xs text-muted-foreground">Unmarked</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Student Attendance Grid */}
        {selectedClass && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Student Attendance - {selectedClass}</CardTitle>
              <CardDescription>
                {format(selectedDate, "EEEE, MMMM do, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <Card key={student.id} className="shadow-soft border-2 hover:shadow-medium transition-smooth">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar>
                          <AvatarImage src={`/api/placeholder/40/40`} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                        </div>
                        {student.status && (
                          <Badge variant={getStatusColor(student.status) as any} className="flex items-center gap-1">
                            {getStatusIcon(student.status)}
                            {student.status}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={student.status === 'present' ? 'success' : 'outline'}
                          size="sm"
                          onClick={() => updateAttendance(student.id, 'present')}
                          className="text-xs"
                        >
                          <UserCheck className="h-3 w-3 mr-1" />
                          Present
                        </Button>
                        <Button
                          variant={student.status === 'late' ? 'warning' : 'outline'}
                          size="sm"
                          onClick={() => updateAttendance(student.id, 'late')}
                          className="text-xs"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Late
                        </Button>
                        <Button
                          variant={student.status === 'absent' ? 'danger' : 'outline'}
                          size="sm"
                          onClick={() => updateAttendance(student.id, 'absent')}
                          className="text-xs"
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AttendanceMarking;