'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Result = {
  id: number;
  user: {
    name: string;
    email?: string;
  };
  exam: {
    title: string;
  };
  score: number;
  totalMarks: number;
  submittedAt: string;
};

function getScoreColor(score: number) {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 75) return 'bg-blue-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-rose-500';
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function RecentResults() {
  const [recentResults, setRecentResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/exam-attempts/recent');
        const data = await res.json();
        setRecentResults(data.recentAttempts || []);
      } catch (err) {
        console.error('Failed to fetch recent attempts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
        <CardDescription>Latest student examination results</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
            {!loading && recentResults.length === 0 && (
              <p className="text-sm text-muted-foreground">No recent attempts found.</p>
            )}
            {!loading &&
              recentResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between space-x-4 rounded-md border p-4 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>{getInitials(result.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{result.user.name}</p>
                      <p className="text-xs text-muted-foreground">{result.exam.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-right">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">
                          {result.score}/{result.totalMarks}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full ${getScoreColor(
                            (result.score / result.totalMarks) * 100
                          )}`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </p>
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
