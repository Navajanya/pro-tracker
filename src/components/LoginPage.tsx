import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Users, BookOpen, UserCheck } from "lucide-react";

interface LoginPageProps {
  onLogin: (userType: string, credentials: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    schoolId: "",
    userType: "school"
  });

  const handleLogin = (userType: string) => {
    // Mock login - in real app this would validate credentials
    onLogin(userType, credentials);
  };

  const userTypes = [
    { id: "school", label: "School Admin", icon: GraduationCap, color: "text-primary" },
    { id: "teacher", label: "Teacher", icon: UserCheck, color: "text-secondary" },
    { id: "student", label: "Student", icon: BookOpen, color: "text-accent" },
    { id: "parent", label: "Parent", icon: Users, color: "text-warning" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-strong">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">School Management System</CardTitle>
            <CardDescription>Choose your role and sign in to continue</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={credentials.userType} onValueChange={(value) => setCredentials({...credentials, userType: value})}>
              <TabsList className="grid w-full grid-cols-2 grid-rows-2 h-auto gap-1 p-1">
                {userTypes.map((type) => (
                  <TabsTrigger 
                    key={type.id} 
                    value={type.id}
                    className="flex flex-col items-center gap-1 h-16 text-xs"
                  >
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                    <span>{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {userTypes.map((type) => (
                <TabsContent key={type.id} value={type.id} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                  </div>

                  {type.id !== "school" && (
                    <div className="space-y-2">
                      <Label htmlFor="schoolId">School</Label>
                      <Select value={credentials.schoolId} onValueChange={(value) => setCredentials({...credentials, schoolId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your school" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school1">Delhi Public School</SelectItem>
                          <SelectItem value="school2">St. Mary's High School</SelectItem>
                          <SelectItem value="school3">Modern Public School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleLogin(type.id)}
                    className="w-full"
                    disabled={!credentials.email || !credentials.password || (type.id !== "school" && !credentials.schoolId)}
                  >
                    Sign in as {type.label}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot password?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;