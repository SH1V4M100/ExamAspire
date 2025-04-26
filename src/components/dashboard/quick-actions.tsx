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
        <Button className="justify-start" size="sm">
          <BookOpen className="mr-2 h-4 w-4" />
          Start Practice Test
        </Button>
        <Button variant="outline" className="justify-start" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Exam Schedule
        </Button>
        <Button variant="outline" className="justify-start" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          Set Study Timer
        </Button>
        <Button variant="outline" className="justify-start" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          View Study Materials
        </Button>
        <Button variant="outline" className="justify-start" size="sm">
          <History className="mr-2 h-4 w-4" />
          Past Exam Reviews
        </Button>
      </CardContent>
    </Card>
  );
}