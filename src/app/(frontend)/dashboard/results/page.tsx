import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download } from "lucide-react";

// Dummy data for results
const examResults = [
  {
    id: 1,
    exam: "Advanced Mathematics",
    date: "May 3, 2025",
    participants: 42,
    avgScore: 78,
    passRate: 85,
  },
  {
    id: 2,
    exam: "Database Systems",
    date: "Apr 28, 2025",
    participants: 38,
    avgScore: 75,
    passRate: 82,
  },
  {
    id: 3,
    exam: "UI/UX Design Principles",
    date: "Apr 20, 2025",
    participants: 35,
    avgScore: 82,
    passRate: 91,
  },
  {
    id: 4,
    exam: "JavaScript Advanced Concepts",
    date: "Apr 15, 2025",
    participants: 45,
    avgScore: 72,
    passRate: 78,
  },
  {
    id: 5,
    exam: "Mobile App Development",
    date: "Apr 10, 2025",
    participants: 40,
    avgScore: 79,
    passRate: 85,
  },
];

// Dummy student results
const studentResults = [
  {
    id: 1,
    studentName: "Alex Johnson",
    avatarUrl: "",
    exam: "Advanced Mathematics",
    score: 92,
    maxScore: 100,
    passStatus: true,
    date: "May 3, 2025",
  },
  {
    id: 2,
    studentName: "Samantha Lee",
    avatarUrl: "",
    exam: "Database Systems",
    score: 85,
    maxScore: 100,
    passStatus: true,
    date: "Apr 28, 2025",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    avatarUrl: "",
    exam: "UI/UX Design Principles",
    score: 79,
    maxScore: 100,
    passStatus: true,
    date: "Apr 20, 2025",
  },
  {
    id: 4,
    studentName: "Emma Wilson",
    avatarUrl: "",
    exam: "JavaScript Advanced Concepts",
    score: 95,
    maxScore: 100,
    passStatus: true,
    date: "Apr 15, 2025",
  },
  {
    id: 5,
    studentName: "Ryan Garcia",
    avatarUrl: "",
    exam: "Mobile App Development",
    score: 65,
    maxScore: 100,
    passStatus: false,
    date: "Apr 10, 2025",
  },
  {
    id: 6,
    studentName: "Olivia Martinez",
    avatarUrl: "",
    exam: "Advanced Mathematics",
    score: 62,
    maxScore: 100,
    passStatus: false,
    date: "May 3, 2025",
  },
  {
    id: 7,
    studentName: "David Kim",
    avatarUrl: "",
    exam: "Database Systems",
    score: 88,
    maxScore: 100,
    passStatus: true,
    date: "Apr 28, 2025",
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

export default function ResultsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Results</h1>
          <p className="text-muted-foreground">
            Analyze and manage examination results
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Export Results
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search results by exam or student..."
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
          <CardDescription>
            Review performance across all examinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="byExam" className="space-y-4">
            <TabsList>
              <TabsTrigger value="byExam">By Exam</TabsTrigger>
              <TabsTrigger value="byStudent">By Student</TabsTrigger>
            </TabsList>
            <TabsContent value="byExam" className="space-y-4">
              {examResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 md:flex-row md:items-center md:justify-between md:space-y-0"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{result.exam}</h3>
                    <p className="text-sm text-muted-foreground">
                      Date: {result.date} • {result.participants} participants
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Avg. Score</p>
                      <p className="font-medium">{result.avgScore}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Pass Rate</p>
                      <p className="font-medium">{result.passRate}%</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="byStudent" className="space-y-4">
              {studentResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 md:flex-row md:items-center md:justify-between md:space-y-0"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={result.avatarUrl} />
                      <AvatarFallback>{getInitials(result.studentName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{result.studentName}</h3>
                      <p className="text-sm text-muted-foreground">{result.exam}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium">
                        {result.score}/{result.maxScore}
                      </span>
                      <Badge variant={result.passStatus ? "default" : "destructive"}>
                        {result.passStatus ? "Pass" : "Fail"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.date}</p>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}