'use client';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export function FilterControls() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by test name..." className="pl-10" />
      </div>
      <div className="flex gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exams</SelectItem>
            <SelectItem value="upsc">UPSC</SelectItem>
            <SelectItem value="ssc">SSC</SelectItem>
            <SelectItem value="banking">Banking</SelectItem>
            <SelectItem value="gate">GATE</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="relevance">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="difficulty-asc">Difficulty: Low to High</SelectItem>
            <SelectItem value="difficulty-desc">Difficulty: High to Low</SelectItem>
            <SelectItem value="duration-asc">Duration: Short to Long</SelectItem>
            <SelectItem value="duration-desc">Duration: Long to Short</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
