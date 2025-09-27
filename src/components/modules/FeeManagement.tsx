import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Download, Send, Plus, CreditCard, AlertCircle } from "lucide-react";

const FeeManagement = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const feeStructure = [
    { class: "1", tuition: 5000, transport: 1500, library: 300, lab: 200, activity: 500 },
    { class: "2", tuition: 5500, transport: 1500, library: 300, lab: 200, activity: 500 },
    { class: "3", tuition: 6000, transport: 1500, library: 300, lab: 300, activity: 600 },
    { class: "4", tuition: 6500, transport: 1500, library: 300, lab: 300, activity: 600 },
    { class: "5", tuition: 7000, transport: 1500, library: 400, lab: 400, activity: 700 },
  ];

  const feeRecords = [
    { 
      id: 1, 
      studentName: "Rahul Sharma", 
      class: "5", 
      rollNo: "05001", 
      month: "January 2025", 
      amount: 9500, 
      paid: 9500, 
      due: 0, 
      status: "paid", 
      dueDate: "2025-01-10",
      paymentDate: "2025-01-08"
    },
    { 
      id: 2, 
      studentName: "Priya Patel", 
      class: "4", 
      rollNo: "04015", 
      month: "January 2025", 
      amount: 8700, 
      paid: 5000, 
      due: 3700, 
      status: "partial", 
      dueDate: "2025-01-10",
      paymentDate: null
    },
    { 
      id: 3, 
      studentName: "Amit Kumar", 
      class: "3", 
      rollNo: "03022", 
      month: "January 2025", 
      amount: 8200, 
      paid: 0, 
      due: 8200, 
      status: "pending", 
      dueDate: "2025-01-10",
      paymentDate: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "success";
      case "partial": return "warning";
      case "pending": return "danger";
      default: return "secondary";
    }
  };

  const generateFeeDemand = () => {
    console.log("Generating fee demand bills...");
  };

  const sendPaymentReminders = () => {
    console.log("Sending payment reminders...");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
            <p className="text-muted-foreground">Manage student fees, payments, and billing</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={generateFeeDemand} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Generate Bills</span>
            </Button>
            <Button variant="outline" onClick={sendPaymentReminders} className="flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Reminders</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹2,45,000</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <AlertCircle className="h-4 w-4 text-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger">₹1,85,000</div>
              <p className="text-xs text-muted-foreground">Total outstanding</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">345</div>
              <p className="text-xs text-muted-foreground">Out of 500 students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">69%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="records">Fee Records</TabsTrigger>
            <TabsTrigger value="structure">Fee Structure</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Fee Records</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-48">
                  <Label>Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>Class {num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 min-w-48">
                  <Label>Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan">January 2025</SelectItem>
                      <SelectItem value="feb">February 2025</SelectItem>
                      <SelectItem value="mar">March 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            {/* Fee Records Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Fee Records</CardTitle>
                <CardDescription>Track fee payments and outstanding amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Month</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Paid</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{record.studentName}</div>
                              <div className="text-sm text-muted-foreground">Roll: {record.rollNo}</div>
                            </div>
                          </TableCell>
                          <TableCell>{record.class}</TableCell>
                          <TableCell>{record.month}</TableCell>
                          <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                          <TableCell>₹{record.paid.toLocaleString()}</TableCell>
                          <TableCell>₹{record.due.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(record.status)}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.dueDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm">Pay</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fee Structure</CardTitle>
                <CardDescription>Manage fee components for each class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Tuition Fee</TableHead>
                        <TableHead>Transport</TableHead>
                        <TableHead>Library</TableHead>
                        <TableHead>Lab Fee</TableHead>
                        <TableHead>Activity Fee</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeStructure.map((fee) => {
                        const total = fee.tuition + fee.transport + fee.library + fee.lab + fee.activity;
                        return (
                          <TableRow key={fee.class}>
                            <TableCell>Class {fee.class}</TableCell>
                            <TableCell>₹{fee.tuition.toLocaleString()}</TableCell>
                            <TableCell>₹{fee.transport.toLocaleString()}</TableCell>
                            <TableCell>₹{fee.library.toLocaleString()}</TableCell>
                            <TableCell>₹{fee.lab.toLocaleString()}</TableCell>
                            <TableCell>₹{fee.activity.toLocaleString()}</TableCell>
                            <TableCell className="font-bold">₹{total.toLocaleString()}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">Edit</Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Collection Reports</CardTitle>
                  <CardDescription>Generate fee collection reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Monthly Collection Report</Button>
                  <Button className="w-full" variant="outline">Class-wise Report</Button>
                  <Button className="w-full" variant="outline">Outstanding Report</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fee Due Reports</CardTitle>
                  <CardDescription>Track pending payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">Overdue Payments</Button>
                  <Button className="w-full" variant="outline">Defaulter List</Button>
                  <Button className="w-full" variant="outline">Payment History</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeeManagement;