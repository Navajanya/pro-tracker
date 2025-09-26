import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Save, TrendingUp, Calculator } from "lucide-react";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  subject: string;
  testType: 'weekly' | 'assessment' | 'quarterly' | 'halfyearly' | 'annual';
  marks: number;
  totalMarks: number;
  percentage: number;
  date: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  averages: {
    weekly: number;
    monthly: number;
    quarterly: number;
    overall: number;
  };
}

const GradeManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTestType, setSelectedTestType] = useState<Grade['testType']>('weekly');

  const students: Student[] = [
    {
      id: "1",
      name: "Alice Johnson",
      rollNumber: "10A-001",
      class: "Grade 10-A",
      averages: { weekly: 85.2, monthly: 87.1, quarterly: 88.5, overall: 86.9 }
    },
    {
      id: "2",
      name: "Michael Chen",
      rollNumber: "10A-002",
      class: "Grade 10-A",
      averages: { weekly: 78.9, monthly: 82.3, quarterly: 85.1, overall: 82.1 }
    },
    {
      id: "3",
      name: "Sarah Williams",
      rollNumber: "10A-003",
      class: "Grade 10-A",
      averages: { weekly: 92.4, monthly: 90.8, quarterly: 91.2, overall: 91.5 }
    },
    {
      id: "4",
      name: "David Brown",
      rollNumber: "10A-004",
      class: "Grade 10-A",
      averages: { weekly: 81.6, monthly: 79.4, quarterly: 83.7, overall: 81.9 }
    }
  ];

  const grades: Grade[] = [
    {
      id: "1",
      studentId: "1",
      studentName: "Alice Johnson",
      rollNumber: "10A-001",
      subject: "Mathematics",
      testType: "weekly",
      marks: 85,
      totalMarks: 100,
      percentage: 85,
      date: "2024-01-15"
    },
    {
      id: "2",
      studentId: "2",
      studentName: "Michael Chen",
      rollNumber: "10A-002",
      subject: "Mathematics",
      testType: "weekly",
      marks: 78,
      totalMarks: 100,
      percentage: 78,
      date: "2024-01-15"
    }
  ];

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology"];
  const testTypes = [
    { value: 'weekly', label: 'Weekly Test' },
    { value: 'assessment', label: 'Monthly Assessment' },
    { value: 'quarterly', label: 'Quarterly Exam' },
    { value: 'halfyearly', label: 'Half Yearly Exam' },
    { value: 'annual', label: 'Annual Exam' }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 80) return 'default';
    if (percentage >= 70) return 'warning';
    return 'danger';
  };

  const calculateClassAverage = (testType: string) => {
    const relevantGrades = grades.filter(g => g.testType === testType);
    if (relevantGrades.length === 0) return 0;
    const sum = relevantGrades.reduce((acc, grade) => acc + grade.percentage, 0);
    return (sum / relevantGrades.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grade Management</h1>
            <p className="text-muted-foreground mt-2">Manage student grades and academic performance</p>
          </div>
          <Button className="gradient-secondary text-secondary-foreground shadow-medium">
            <Plus className="mr-2 h-4 w-4" />
            Add Grades
          </Button>
        </div>

        <Tabs defaultValue="entry" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entry">Grade Entry</TabsTrigger>
            <TabsTrigger value="overview">Student Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="space-y-6">
            {/* Grade Entry Form */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Enter Grades
                </CardTitle>
                <CardDescription>Add new test scores and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedTestType} onValueChange={(v) => setSelectedTestType(v as Grade['testType'])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Test Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {testTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input placeholder="Total Marks" type="number" />
                </div>
              </CardContent>
            </Card>

            {/* Grade Entry Table */}
            {selectedClass && selectedSubject && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    {selectedSubject} - {testTypes.find(t => t.value === selectedTestType)?.label}
                  </CardTitle>
                  <CardDescription>{selectedClass}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Marks Obtained</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/api/placeholder/32/32`} />
                                <AvatarFallback className="text-xs">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                          <TableCell>
                            <Input type="number" placeholder="0" className="w-20" />
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">--%</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">--</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end gap-3">
                    <Button variant="outline">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Grades
                    </Button>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Grades
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            {/* Student Performance Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Student Performance Overview</CardTitle>
                <CardDescription>Individual student averages and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Weekly Avg</TableHead>
                      <TableHead>Monthly Avg</TableHead>
                      <TableHead>Quarterly Avg</TableHead>
                      <TableHead>Overall Avg</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/api/placeholder/32/32`} />
                              <AvatarFallback className="text-xs">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getGradeColor(student.averages.weekly) as any}>
                            {student.averages.weekly}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getGradeColor(student.averages.monthly) as any}>
                            {student.averages.monthly}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getGradeColor(student.averages.quarterly) as any}>
                            {student.averages.quarterly}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getGradeColor(student.averages.overall) as any}>
                            {student.averages.overall}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`h-4 w-4 ${student.averages.overall >= 85 ? 'text-success' : student.averages.overall >= 70 ? 'text-warning' : 'text-danger'}`} />
                            <span className="text-sm text-muted-foreground">
                              {student.averages.overall >= 85 ? 'Excellent' : student.averages.overall >= 70 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Class Analytics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{calculateClassAverage('weekly')}%</div>
                  <p className="text-xs text-muted-foreground">Class Average</p>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{calculateClassAverage('assessment')}%</div>
                  <p className="text-xs text-muted-foreground">Class Average</p>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Quarterly Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{calculateClassAverage('quarterly')}%</div>
                  <p className="text-xs text-muted-foreground">Class Average</p>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Overall Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">84.2%</div>
                  <p className="text-xs text-muted-foreground">School Average</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Improving Students</p>
                      <p className="text-sm text-muted-foreground">Students showing consistent improvement</p>
                    </div>
                    <Badge className="gradient-secondary text-secondary-foreground">67%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">At-Risk Students</p>
                      <p className="text-sm text-muted-foreground">Students requiring additional support</p>
                    </div>
                    <Badge variant="warning">12%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">High Performers</p>
                      <p className="text-sm text-muted-foreground">Students consistently scoring above 90%</p>
                    </div>
                    <Badge variant="success">21%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GradeManagement;