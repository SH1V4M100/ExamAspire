import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download } from "lucide-react";
import { Navbar } from "@/components/dashboard/navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
// Dummy data for results
const examResults = [
  {
    id: 1,
    exam: "Advanced Mathematics",
    dateAttempted: "May 3, 2025",
    score: 92,
  },
  {
    id: 2,
    exam: "Database Systems",
    dateAttempted: "Apr 28, 2025",
    score: 85,
  },
  {
    id: 3,
    exam: "UI/UX Design Principles",
    dateAttempted: "Apr 20, 2025",
    score: 79,
  },
  {
    id: 4,
    exam: "JavaScript Advanced Concepts",
    dateAttempted: "Apr 15, 2025",
    score: 95,
  },
  {
    id: 5,
    exam: "Mobile App Development",
    dateAttempted: "Apr 10, 2025",
    score: 65,
  },
];
// Dummy data for student results
export default function ResultsPage() {
  const examResults = [
    {
      id: 1,
      exam: "Advanced Mathematics",
      dateAttempted: "May 3, 2025",
      score: 92,
    },
    {
      id: 2,
      exam: "Database Systems",
      dateAttempted: "Apr 28, 2025",
      score: 85,
    },
    {
      id: 3,
      exam: "UI/UX Design Principles",
      dateAttempted: "Apr 20, 2025",
      score: 79,
    },
    {
      id: 4,
      exam: "JavaScript Advanced Concepts",
      dateAttempted: "Apr 15, 2025",
      score: 95,
    },
    {
      id: 5,
      exam: "Mobile App Development",
      dateAttempted: "Apr 10, 2025",
      score: 65,
    },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Results</h1>
                <p className="text-muted-foreground">
                  Review your examination performance
                </p>
              </div>
              <Button variant="outline" className="shrink-0">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Exam History</CardTitle>
                <CardDescription>
                  Your past exam attempts and scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {examResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 md:flex-row md:items-center md:justify-between md:space-y-0"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{result.exam}</h3>
                      <p className="text-sm text-muted-foreground">
                        Attempted on: {result.dateAttempted}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="font-medium">{result.score}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
