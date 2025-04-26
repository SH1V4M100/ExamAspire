'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Dummy exam data
const exams = [
  {
    id: 1,
    title: "Advanced Mathematics",
    subject: "Mathematics",
    duration: "3 hours",
    questions: 50,
    lastUpdated: "May 10, 2025",
    status: "published",
  },
  {
    id: 2,
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    duration: "2 hours",
    questions: 40,
    lastUpdated: "May 8, 2025",
    status: "published",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    duration: "2.5 hours",
    questions: 35,
    lastUpdated: "May 7, 2025",
    status: "draft",
  },
  {
    id: 4,
    title: "Introduction to AI",
    subject: "Artificial Intelligence",
    duration: "2 hours",
    questions: 45,
    lastUpdated: "May 5, 2025",
    status: "published",
  },
  {
    id: 5,
    title: "Modern Physics",
    subject: "Physics",
    duration: "3 hours",
    questions: 55,
    lastUpdated: "May 3, 2025",
    status: "draft",
  },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">
            Manage your examinations and question banks
          </p>
        </div>
        <Button className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exams..."
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam Library</CardTitle>
          <CardDescription>
            All exams in your library, sorted by last updated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Exams</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{exam.title}</h3>
                      <Badge variant={exam.status === "published" ? "default" : "secondary"}>
                        {exam.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Subject: {exam.subject}</p>
                      <p>
                        {exam.duration} • {exam.questions} questions • Last updated: {exam.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="published" className="space-y-4">
              {exams
                .filter((exam) => exam.status === "published")
                .map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{exam.title}</h3>
                        <Badge>Published</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Subject: {exam.subject}</p>
                        <p>
                          {exam.duration} • {exam.questions} questions • Last updated: {exam.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="draft" className="space-y-4">
              {exams
                .filter((exam) => exam.status === "draft")
                .map((exam) => (
                  <div
                    key={exam.id}
                    className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{exam.title}</h3>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Subject: {exam.subject}</p>
                        <p>
                          {exam.duration} • {exam.questions} questions • Last updated: {exam.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
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