'use server';

/**
 * @fileOverview AI-powered personalization engine flow.
 *
 * This flow analyzes user performance data to generate a learner persona,
 * predict future performance, and suggest a customized learning path.
 *
 * @param {PerformanceData} input - User performance data.
 * @returns {AIPersonalizationOutput} output - Personalized insights and recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PerformanceDataSchema = z.object({
  testHistory: z.array(
    z.object({
      testName: z.string(),
      score: z.number(),
      categoryPerformances: z.record(z.string(), z.number()),
    })
  ).describe('A list of the user past tests, their score, and per-category performance'),
  examType: z.string().describe('The type of exam the user is preparing for (e.g., UPSC, SSC, Banking, GATE)'),
  overallAccuracy: z.number(),
  learningPace: z.number().describe('The user\'s learning pace compared to peers (e.g., 15 for 15% faster).'),
});
export type PerformanceData = z.infer<typeof PerformanceDataSchema>;

const AIPersonalizationOutputSchema = z.object({
  learnerPersona: z.string().describe('The AI-assigned learner persona (e.g., "Speed Learner 🚀", "Thorough Learner 📚").'),
  recommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended test or topic.'),
      reason: z.string().describe('The reason for the recommendation, based on user data.'),
      status: z.string().describe('A compelling statistic about the recommendation (e.g., "78% of students like you improved...").'),
    })
  ).describe('A list of personalized recommendations.'),
  prediction: z.object({
      nextScore: z.string().describe('The predicted score on the next test (e.g., "76% (±5%)").'),
      passLikelihood: z.string().describe('The likelihood of passing the next exam (e.g., "82%").'),
      conditionalImprovement: z.string().describe('The predicted score if a specific recommendation is completed.'),
  }),
});
export type AIPersonalizationOutput = z.infer<typeof AIPersonalizationOutputSchema>;

export async function getAIPersonalization(input: PerformanceData): Promise<AIPersonalizationOutput> {
  return personalizationFlow(input);
}

const personalizationPrompt = ai.definePrompt({
  name: 'personalizationPrompt',
  input: {schema: PerformanceDataSchema},
  output: {schema: AIPersonalizationOutputSchema},
  prompt: `You are an AI coach for an exam preparation platform. Your goal is to create a personalized learning path for a student based on their performance.

  Analyze the following data for a student preparing for the {{examType}} exam:
  - Overall Accuracy: {{overallAccuracy}}%
  - Learning Pace: {{learningPace}}% faster than peers
  - Test History:
  {{#each testHistory}}
  - Test: {{testName}}, Score: {{score}}%
    {{#if categoryPerformances}}
    - Category Breakdown:
      {{#each categoryPerformances}}
      - {{@key}}: {{this}}%
      {{/each}}
    {{/if}}
  {{/each}}

  Based on this data, perform the following actions and return the result as a single JSON object:
  1.  **Assign a Learner Persona**: Choose one from "Speed Learner 🚀", "Thorough Learner 📚", "Struggling Learner 💡", "Passive Learner 🚶‍♂️", or "Subject Specialist 🎯".
  2.  **Generate Recommendations**: Create a list of 2-3 specific, actionable recommendations. For each, provide a 'title', a 'reason' explaining why it's recommended based on the user's data, and a 'status' with a compelling statistic.
  3.  **Make Predictions**: Provide a 'nextScore' prediction, a 'passLikelihood', and a 'conditionalImprovement' prediction if they follow one of your key recommendations.

  Example Output Structure:
  {
    "learnerPersona": "Speed Learner 🚀",
    "recommendations": [
      {
        "title": "GS-II Economy Deep Dive",
        "reason": "Your accuracy is 42% here (vs {{overallAccuracy}}% overall).",
        "status": "78% of students like you improved 20% with this."
      },
      {
        "title": "Medieval India Advanced",
        "reason": "Building on your 88% History strength.",
        "status": "Challenge yourself with advanced content."
      }
    ],
    "prediction": {
      "nextScore": "76% (±5%)",
      "passLikelihood": "82%",
      "conditionalImprovement": "If you complete 'Economy Deep Dive', your predicted score is 81%."
    }
  }`,
});

const personalizationFlow = ai.defineFlow(
  {
    name: 'personalizationFlow',
    inputSchema: PerformanceDataSchema,
    outputSchema: AIPersonalizationOutputSchema,
  },
  async input => {
    const {output} = await personalizationPrompt(input);
    return output!;
  }
);
