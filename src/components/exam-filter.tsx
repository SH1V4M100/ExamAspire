"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Exam, ExamStatus } from "@/lib/types";
import { getExamStatus } from "@/lib/utils";

interface ExamFilterProps {
  exams: Exam[];
  onFilterChange: (filtered: Exam[]) => void;
}

export function ExamFilter({ exams, onFilterChange }: ExamFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [attemptedFilter, setAttemptedFilter] = useState<string>("all");

  const applyFilters = () => {
    let filtered = [...exams];
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(exam => 
        getExamStatus(exam) === statusFilter
      );
    }
    
    // Apply attempted filter
    if (attemptedFilter !== "all") {
      const isAttempted = attemptedFilter === "attempted";
      filtered = filtered.filter(exam => exam.attempted === isAttempted);
    }
    
    onFilterChange(filtered);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setTimeout(applyFilters, 300);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setTimeout(applyFilters, 100);
  };
  
  const handleAttemptedChange = (value: string) => {
    setAttemptedFilter(value);
    setTimeout(applyFilters, 100);
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setAttemptedFilter("all");
    onFilterChange(exams);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={attemptedFilter} onValueChange={handleAttemptedChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Progress" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Progress</SelectItem>
              <SelectItem value="attempted">Attempted</SelectItem>
              <SelectItem value="not-attempted">Not Attempted</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset filters">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}