'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy data for recent results
const recentResults = [
  {
    id: 1,
    studentName: "Alex Johnson",
    avatarUrl: "",
    exam: "Web Development Fundamentals",
    score: 92,
    maxScore: 100,
    date: "May 4, 2025",
  },
  {
    id: 2,
    studentName: "Samantha Lee",
    avatarUrl: "",
    exam: "Database Systems",
    score: 88,
    maxScore: 100,
    date: "May 3, 2025",
  },
  {
    id: 3,
    studentName: "Michael Brown",
    avatarUrl: "",
    exam: "UI/UX Design Principles",
    score: 79,
    maxScore: 100,
    date: "May 3, 2025",
  },
  {
    id: 4,
    studentName: "Emma Wilson",
    avatarUrl: "",
    exam: "JavaScript Advanced Concepts",
    score: 95,
    maxScore: 100,
    date: "May 2, 2025",
  },
  {
    id: 5,
    studentName: "Ryan Garcia",
    avatarUrl: "",
    exam: "Mobile App Development",
    score: 82,
    maxScore: 100,
    date: "May 1, 2025",
  },
];

function getScoreColor(score: number) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 75) return "bg-blue-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-rose-500";
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

export function RecentResults() {
  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
        <CardDescription>
          Latest student examination results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {recentResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between space-x-4 rounded-md border p-4 transition-all hover:bg-accent/50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={result.avatarUrl} />
                    <AvatarFallback>{getInitials(result.studentName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{result.studentName}</p>
                    <p className="text-xs text-muted-foreground">{result.exam}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{result.score}/{result.maxScore}</span>
                      <div className={`h-2 w-2 rounded-full ${getScoreColor(result.score)}`} />
                    </div>
                    <p className="text-xs text-muted-foreground">{result.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}