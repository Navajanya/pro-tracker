import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Phone, Mail, User } from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  parentName: string;
  parentPhone: string;
  email: string;
  attendance: number;
  status: 'active' | 'inactive';
}

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const students: Student[] = [
    {
      id: "1",
      name: "Alice Johnson",
      class: "Class 10",
      rollNumber: "10-001",
      parentName: "Robert Johnson",
      parentPhone: "+91-9876543210",
      email: "alice.johnson@school.edu",
      attendance: 96.5,
      status: 'active'
    },
    {
      id: "2",
      name: "Michael Chen",
      class: "Class 9",
      rollNumber: "9-015",
      parentName: "Wei Chen",
      parentPhone: "+91-9876543211",
      email: "michael.chen@school.edu",
      attendance: 89.2,
      status: 'active'
    },
    {
      id: "3",
      name: "Sarah Williams",
      class: "Class 8",
      rollNumber: "8-008",
      parentName: "David Williams",
      parentPhone: "+91-9876543212",
      email: "sarah.williams@school.edu",
      attendance: 98.1,
      status: 'active'
    },
    {
      id: "4",
      name: "David Brown", 
      class: "Class 7",
      rollNumber: "7-022",
      parentName: "Lisa Brown",
      parentPhone: "+91-9876543213",
      email: "david.brown@school.edu",
      attendance: 92.7,
      status: 'active'
    },
    {
      id: "5",
      name: "Emma Davis",
      class: "Class 6",
      rollNumber: "6-012",
      parentName: "Mark Davis",
      parentPhone: "+91-9876543214",
      email: "emma.davis@school.edu",
      attendance: 94.3,
      status: 'active'
    },
    {
      id: "6",
      name: "James Wilson",
      class: "Class 5",
      rollNumber: "5-045",
      parentName: "Susan Wilson",
      parentPhone: "+91-9876543215",
      email: "james.wilson@school.edu",
      attendance: 91.8,
      status: 'active'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classes = ["all", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return "success";
    if (attendance >= 85) return "warning";
    return "danger";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
            <p className="text-muted-foreground mt-2">Manage student records and contact information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-primary-foreground shadow-medium">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student's information and parent contact details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">Class</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-1">Class 1</SelectItem>
                      <SelectItem value="class-2">Class 2</SelectItem>
                      <SelectItem value="class-3">Class 3</SelectItem>
                      <SelectItem value="class-4">Class 4</SelectItem>
                      <SelectItem value="class-5">Class 5</SelectItem>
                      <SelectItem value="class-6">Class 6</SelectItem>
                      <SelectItem value="class-7">Class 7</SelectItem>
                      <SelectItem value="class-8">Class 8</SelectItem>
                      <SelectItem value="class-9">Class 9</SelectItem>
                      <SelectItem value="class-10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="roll" className="text-right">Roll No.</Label>
                  <Input id="roll" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parent" className="text-right">Parent Name</Label>
                  <Input id="parent" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Save Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Search & Filter</CardTitle>
            <CardDescription>Find students by name, roll number, or class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls === "all" ? "All Classes" : cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table - Desktop */}
        <Card className="shadow-soft hidden md:block">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Students ({filteredStudents.length})
            </CardTitle>
            <CardDescription>Manage student information and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Parent Contact</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/api/placeholder/40/40`} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.class}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">{student.parentName}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {student.parentPhone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getAttendanceColor(student.attendance) as any}>
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Students Cards - Mobile */}
        <div className="grid gap-4 md:hidden">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`/api/placeholder/40/40`} />
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <Badge variant="outline" className="mt-1">{student.class}</Badge>
                    </div>
                  </div>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roll Number:</span>
                    <span className="font-mono">{student.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parent:</span>
                    <span>{student.parentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {student.parentPhone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground">Attendance:</span>
                    <Badge variant={getAttendanceColor(student.attendance) as any}>
                      {student.attendance}%
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;