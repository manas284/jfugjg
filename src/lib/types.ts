export interface User {
  name: string;
  avatarUrl: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  explanation: string;
}

export type ExamType = 'UPSC' | 'SSC' | 'Banking' | 'GATE';

export interface Test {
  id: string;
  title: string;
  examType: ExamType;
  duration: number; // in minutes
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number; // 1-5
  coverImageUrl: string;
  imageHint: string;
  questions: Question[];
}

export type QuestionStatus = 'answered' | 'notAnswered' | 'marked' | 'notVisited';

export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  date: string;
  score: number;
  accuracy: number;
  percentile: number;
  timeTaken: number; // in minutes
  subjectWisePerformance: { [subject: string]: { score: number; accuracy: number } };
  answers: { questionId: number, selectedAnswer: number, status: QuestionStatus }[];
}

export interface RecentActivityItem {
  id: string;
  testTitle: string;
  score: number;
  date: string;
}

export type PageProps<T = {}> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};
