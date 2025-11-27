import type { Test, RecentActivityItem, TestAttempt, Question, ExamType, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getPlaceholderImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://picsum.photos/seed/default/600/400', hint: 'abstract' };
};

export const MOCK_USER: User = {
  name: 'Ananya Sharma',
  avatarUrl: 'https://picsum.photos/seed/user/100/100',
};

const upscQuestions: Question[] = [
  { id: 1, subject: 'History', text: 'Who was the first Governor-General of Bengal?', options: ['Robert Clive', 'Warren Hastings', 'Lord Cornwallis', 'Lord William Bentinck'], correctAnswer: 1, explanation: 'Warren Hastings was the first Governor-General of Bengal, appointed in 1773.' },
  { id: 2, subject: 'Polity', text: 'Which article of the Indian Constitution deals with the Right to Equality?', options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'], correctAnswer: 0, explanation: 'Article 14 of the Constitution of India provides for equality before the law or equal protection of the laws within the territory of India.' },
  { id: 3, subject: 'Geography', text: 'Which is the longest river in India?', options: ['Godavari', 'Narmada', 'Ganges', 'Brahmaputra'], correctAnswer: 2, explanation: 'The Ganges is the longest river in India, flowing for about 2,525 km.' },
  { id: 4, subject: 'Economy', text: 'What does "Repo Rate" mean?', options: ['Rate at which RBI lends to commercial banks', 'Rate at which commercial banks lend to customers', 'Rate of inflation', 'GDP growth rate'], correctAnswer: 0, explanation: 'Repo rate is the rate at which the Reserve Bank of India lends money to commercial banks in the event of any shortfall of funds.' },
  { id: 5, subject: 'History', text: 'The Dandi March was a part of which movement?', options: ['Non-Cooperation Movement', 'Civil Disobedience Movement', 'Quit India Movement', 'Khilafat Movement'], correctAnswer: 1, explanation: 'The Salt March, also known as the Dandi March, was an act of nonviolent civil disobedience led by Mahatma Gandhi.' }
];

const sscQuestions: Question[] = [
  { id: 1, subject: 'Quantitative Aptitude', text: 'If a man gains 10% by selling an article for ₹110, what is the cost price?', options: ['₹90', '₹99', '₹100', '₹105'], correctAnswer: 2, explanation: 'Selling Price = Cost Price * (1 + Profit%). 110 = CP * 1.1. So, CP = 110 / 1.1 = 100.' },
  { id: 2, subject: 'Reasoning', text: 'Find the next number in the series: 2, 5, 10, 17, ?', options: ['24', '25', '26', '27'], correctAnswer: 2, explanation: 'The pattern is n^2 + 1. 1^2+1=2, 2^2+1=5, 3^2+1=10, 4^2+1=17, 5^2+1=26.' },
  { id: 3, subject: 'English', text: 'Choose the synonym for "Ephemeral".', options: ['Eternal', 'Transient', 'Beautiful', 'Strong'], correctAnswer: 1, explanation: 'Ephemeral means lasting for a very short time, which is synonymous with transient.' },
];

const bankingQuestions: Question[] = [
  { id: 1, subject: 'Financial Awareness', text: 'What is the full form of NEFT?', options: ['National Electronic Funds Transfer', 'National Equity Funds Transfer', 'New Electronic Funds Transfer', 'National Electronic Financial Transaction'], correctAnswer: 0, explanation: 'NEFT stands for National Electronic Funds Transfer.' },
  { id: 2, subject: 'Quantitative Aptitude', text: 'A boat travels 2 km downstream in 10 minutes and 1 km upstream in 20 minutes. What is the speed of the stream?', options: ['3 km/hr', '4.5 km/hr', '6 km/hr', '9 km/hr'], correctAnswer: 1, explanation: 'Downstream speed = 2km / (10/60)hr = 12 km/hr. Upstream speed = 1km / (20/60)hr = 3 km/hr. Speed of stream = (12-3)/2 = 4.5 km/hr.' },
];

const gateQuestions: Question[] = [
  { id: 1, subject: 'Computer Science', text: 'What is the time complexity of a binary search algorithm?', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(n log n)'], correctAnswer: 1, explanation: 'Binary search divides the search interval in half at each step, resulting in a logarithmic time complexity.' },
  { id: 2, subject: 'Electronics', text: 'Which logic gate is a universal gate?', options: ['AND', 'OR', 'XOR', 'NAND'], correctAnswer: 3, explanation: 'NAND and NOR gates are known as universal gates because any other logic function can be implemented using only these gates.' },
];


export const MOCK_TESTS: Test[] = [
  { id: 'upsc-mock-1', title: 'UPSC Civil Services Prelims Mock 1', examType: 'UPSC', duration: 120, totalQuestions: 100, difficulty: 'Hard', rating: 4.8, coverImageUrl: getPlaceholderImage('upsc-prelims').url, imageHint: getPlaceholderImage('upsc-prelims').hint, questions: upscQuestions.slice(0, 5) },
  { id: 'ssc-cgl-mock-1', title: 'SSC CGL Tier 1 Full Mock Test', examType: 'SSC', duration: 60, totalQuestions: 100, difficulty: 'Medium', rating: 4.5, coverImageUrl: getPlaceholderImage('ssc-cgl').url, imageHint: getPlaceholderImage('ssc-cgl').hint, questions: sscQuestions.slice(0, 3) },
  { id: 'ibps-po-mock-1', title: 'IBPS PO Prelims Practice Set', examType: 'Banking', duration: 60, totalQuestions: 100, difficulty: 'Medium', rating: 4.6, coverImageUrl: getPlaceholderImage('ibps-po').url, imageHint: getPlaceholderImage('ibps-po').hint, questions: bankingQuestions.slice(0, 2) },
  { id: 'gate-cs-mock-1', title: 'GATE CS 2024 Mock Paper', examType: 'GATE', duration: 180, totalQuestions: 65, difficulty: 'Hard', rating: 4.9, coverImageUrl: getPlaceholderImage('gate-cs').url, imageHint: getPlaceholderImage('gate-cs').hint, questions: gateQuestions.slice(0, 2) },
  { id: 'upsc-mock-2', title: 'UPSC GS Paper 2 (CSAT) Mock', examType: 'UPSC', duration: 120, totalQuestions: 80, difficulty: 'Hard', rating: 4.7, coverImageUrl: getPlaceholderImage('upsc-csat').url, imageHint: getPlaceholderImage('upsc-csat').hint, questions: upscQuestions.slice(0, 5) },
  { id: 'ssc-chsl-mock-1', title: 'SSC CHSL Mock Test Series', examType: 'SSC', duration: 60, totalQuestions: 100, difficulty: 'Easy', rating: 4.3, coverImageUrl: getPlaceholderImage('ssc-chsl').url, imageHint: getPlaceholderImage('ssc-chsl').hint, questions: sscQuestions.slice(0, 3) },
];

export const MOCK_RECENT_ACTIVITY: RecentActivityItem[] = [
  { id: '1', testTitle: 'UPSC Civil Services Prelims Mock 1', score: 78, date: '2 days ago' },
  { id: '2', testTitle: 'SSC CGL Tier 1 Full Mock Test', score: 85, date: '5 days ago' },
  { id: '3', testTitle: 'Daily Current Affairs Quiz', score: 90, date: '1 week ago' },
  { id: '4', testTitle: 'IBPS PO Prelims Practice Set', score: 72, date: '2 weeks ago' },
];

export const MOCK_PERFORMANCE_TREND = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 68 },
  { date: 'Mar', score: 72 },
  { date: 'Apr', score: 71 },
  { date: 'May', score: 75 },
  { date: 'Jun', score: 78 },
];

export const MOCK_TEST_ATTEMPTS: TestAttempt[] = [
    {
        id: 'attempt-1',
        testId: 'upsc-mock-1',
        userId: 'user-1',
        date: '2023-06-15',
        score: 78,
        accuracy: 82,
        percentile: 92,
        timeTaken: 110,
        subjectWisePerformance: {
            'History': { score: 80, accuracy: 85 },
            'Polity': { score: 75, accuracy: 80 },
            'Geography': { score: 85, accuracy: 90 },
            'Economy': { score: 70, accuracy: 75 },
        },
        answers: [
            { questionId: 1, selectedAnswer: 1, status: 'answered' },
            { questionId: 2, selectedAnswer: 0, status: 'answered' },
            { questionId: 3, selectedAnswer: 3, status: 'answered' }, // Wrong answer
            { questionId: 4, selectedAnswer: -1, status: 'notAnswered' },
            { questionId: 5, selectedAnswer: 1, status: 'marked' },
        ]
    },
     {
        id: 'attempt-2',
        testId: 'ssc-cgl-mock-1',
        userId: 'user-1',
        date: '2023-06-20',
        score: 85,
        accuracy: 88,
        percentile: 95,
        timeTaken: 55,
        subjectWisePerformance: {
            'Quantitative Aptitude': { score: 90, accuracy: 92 },
            'Reasoning': { score: 80, accuracy: 85 },
            'English': { score: 85, accuracy: 88 },
        },
        answers: [
            { questionId: 1, selectedAnswer: 2, status: 'answered' },
            { questionId: 2, selectedAnswer: 2, status: 'answered' },
            { questionId: 3, selectedAnswer: 1, status: 'answered' },
        ]
    },
];
