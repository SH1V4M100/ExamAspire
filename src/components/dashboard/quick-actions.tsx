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
          className="w-full"
        >
          <Button className="justify-start w-full" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Start Practice Test
          </Button>
        </a>

        <a
          href="https://docs.google.com/spreadsheets/d/1d-iHOb-gGHsOgk-zxsq_nJQYTQZiC4ZNb23RhtBzh_I/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="outline" className="justify-start w-full" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Exam Schedule
          </Button>
        </a>

        <a
          href="https://drive.google.com/drive/folders/1fxRP1gts5ZHA5RjZdrkqpiOyZEV_FI1P"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="outline" className="justify-start w-full" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Study Materials
          </Button>
        </a>

        <a
          href="/exams/results"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="outline"
            className="justify-start w-full"
            size="sm"
          >
            <History className="mr-2 h-4 w-4" />
            Past Exam Reviews
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
