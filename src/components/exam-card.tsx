"use client";

import { useRouter } from 'next/navigation';
import { Exam } from "@/lib/types";
import { formatDuration, formatDate, getExamStatus } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamStatusBadge } from "@/components/exam-status-badge";
import { Clock, Calendar, PlayCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  const router = useRouter();
  const status = getExamStatus(exam);
  const now = new Date();
  const isDisabled = 
  status === 'upcoming' || 
  (exam.attempted && status==='active'); // new condition here
  
  const handleExamAction = () => {
    // Navigate to the exam attempt page
    router.push(`/exams/${exam.id}/attempt`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <ExamStatusBadge exam={exam} />
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatDuration(exam.duration)}</span>
            </div>
          </div>
          <CardTitle>{exam.title}</CardTitle>
          <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Start: {formatDate(exam.startDate)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>End: {formatDate(exam.endDate)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleExamAction}
            disabled={isDisabled}
            className="w-full"
            variant={exam.attempted ? "outline" : "default"}
          >
            {exam.attempted ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Revisit Exam
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Exam
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}