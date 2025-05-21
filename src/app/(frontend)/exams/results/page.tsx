'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download } from "lucide-react";
import { Navbar } from "@/components/dashboard/navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import React, { useEffect, useState } from 'react';

interface ExamAttempt {
  id: number;
  exam: {
    title: string;
  };
  score: number;
  totalMarks: number;
  submittedAt: string;
}

export default function ResultsPage() {
  const [examResults, setExamResults] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    const fetchUserExamAttempts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/exam-attempts/user-exam-attempts`, {
          credentials: 'include',
        });
        const data = await response.json();
        console.log('User Exam Attempts:', data);
        setExamResults(data.attempts || []);
      } catch (error) {
        console.error('Error fetching user exam attempts:', error);
      }
    };

    fetchUserExamAttempts();
  }, []);

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
                {examResults.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/50 md:flex-row md:items-center md:justify-between md:space-y-0"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{attempt.exam.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Attempted on: {new Date(attempt.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="font-medium">{((attempt.score / attempt.totalMarks) * 100).toFixed(2)}%</p>
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
