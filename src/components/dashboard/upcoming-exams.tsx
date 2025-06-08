'use client';

import { useEffect, useState } from 'react';
import { stringify } from 'qs-esm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";

type Exam = {
  id: number;
  title: string;
  startDate: string;
  _status: 'published' | 'draft';
};

export function UpcomingExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [tab, setTab] = useState<'all' | 'scheduled' | 'draft'>('all');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const now = new Date().toISOString();

        const query = stringify({
          where: {
            startDate: { greater_than: now }
          }
        }, { addQueryPrefix: true });

        const res = await fetch(`/api/exams${query}`, {
          credentials: 'include',
        });

        const data = await res.json();
        setExams(data.docs);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
    };

    fetchExams();
  }, []);

  const getFilteredExams = () => {
    if (tab === 'scheduled') return exams.filter(e => e._status === 'published');
    if (tab === 'draft') return exams.filter(e => e._status === 'draft');
    return exams;
  };

  const renderExamCard = (exam: Exam) => (
    <div
      key={exam.id}
      className="flex flex-col space-y-2 rounded-md border p-4 transition-all hover:bg-accent/50"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{exam.title}</h3>
        <Badge variant={exam._status === "published" ? "default" : "secondary"}>
          {exam._status === "published" ? "Scheduled" : "Draft"}
        </Badge>
      </div>
      <div className="flex flex-col space-y-2 text-sm text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(exam.startDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          {new Date(exam.startDate).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );

  const filteredExams = getFilteredExams();

  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Exams</CardTitle>
        <CardDescription>
          Manage and monitor your scheduled examinations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(val) => setTab(val as any)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {tab === 'all' && filteredExams.map(renderExamCard)}
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4">
            {tab === 'scheduled' && filteredExams.map(renderExamCard)}
          </TabsContent>
          <TabsContent value="draft" className="space-y-4">
            {tab === 'draft' && filteredExams.map(renderExamCard)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
