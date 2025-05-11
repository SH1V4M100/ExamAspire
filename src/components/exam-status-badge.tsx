import { Exam, ExamStatus } from "@/lib/types";
import { getExamStatus } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface ExamStatusBadgeProps {
  exam: Exam;
}

export function ExamStatusBadge({ exam }: ExamStatusBadgeProps) {
  const status = getExamStatus(exam);
  
  switch (status) {
    case 'upcoming':
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Upcoming
        </Badge>
      );
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Active
        </Badge>
      );
    case 'expired':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-300 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Expired
        </Badge>
      );
    default:
      return null;
  }
}