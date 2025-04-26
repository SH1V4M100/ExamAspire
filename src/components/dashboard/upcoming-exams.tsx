'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users } from "lucide-react";

// Dummy data for upcoming exams
const upcomingExams = [
  {
    id: 1,
    title: "Advanced Mathematics",
    date: "May 15, 2025",
    time: "10:00 AM",
    participants: 42,
    status: "scheduled",
  },
  {
    id: 2,
    title: "Computer Science Fundamentals",
    date: "May 18, 2025",
    time: "2:00 PM",
    participants: 38,
    status: "scheduled",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    date: "May 20, 2025",
    time: "11:30 AM",
    participants: 35,
    status: "draft",
  },
  {
    id: 4,
    title: "Introduction to AI",
    date: "May 25, 2025",
    time: "9:00 AM",
    participants: 51,
    status: "scheduled",
  },
];

export function UpcomingExams() {
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Exams</CardTitle>
        <CardDescription>
          Manage and monitor your scheduled examinations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="flex flex-col space-y-2 rounded-md border p-4 transition-all hover:bg-accent/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{exam.title}</h3>
                  <Badge variant={exam.status === "scheduled" ? "default" : "secondary"}>
                    {exam.status === "scheduled" ? "Scheduled" : "Draft"}
                  </Badge>
                </div>
                <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {exam.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {exam.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {exam.participants} students
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4">
            {upcomingExams
              .filter((exam) => exam.status === "scheduled")
              .map((exam) => (
                <div
                  key={exam.id}
                  className="flex flex-col space-y-2 rounded-md border p-4 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{exam.title}</h3>
                    <Badge>Scheduled</Badge>
                  </div>
                  <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {exam.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {exam.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {exam.participants} students
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="draft" className="space-y-4">
            {upcomingExams
              .filter((exam) => exam.status === "draft")
              .map((exam) => (
                <div
                  key={exam.id}
                  className="flex flex-col space-y-2 rounded-md border p-4 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{exam.title}</h3>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {exam.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {exam.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {exam.participants} students
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}