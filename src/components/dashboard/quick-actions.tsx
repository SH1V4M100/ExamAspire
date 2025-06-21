'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Calendar, FileText, History } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and activities</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
      <a 
          href="/exams/1/attempt"
          target="_blank"
          rel="noopener noreferrer"
        >
        <Button className="justify-start" size="sm">
          <BookOpen className="mr-2 h-4 w-4" />
          Start Practice Test
        </Button>
        </a>
        <Button variant="outline" className="justify-start" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Exam Schedule
        </Button>
        <a href="https://drive.google.com/drive/folders/1fxRP1gts5ZHA5RjZdrkqpiOyZEV_FI1P"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="justify-start" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Study Materials
          </Button>
        </a>
        <a href="/exams/results"
          target="_blank"
          rel="noopener noreferrer"
        >
        <Button variant="outline" className="justify-start" size="sm" onClick={() => window.location.href = '/exams/results'}>
          <History className="mr-2 h-4 w-4" />
          Past Exam Reviews
        </Button> </a>
      </CardContent>
    </Card>
  );
}
