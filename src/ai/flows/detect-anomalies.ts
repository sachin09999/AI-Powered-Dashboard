'use server';

/**
 * @fileOverview A flow that detects anomalies in a given dataset.
 *
 * - detectAnomalies - A function that takes data and returns a list of detected anomalies.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  data: z.string().describe('The dataset to analyze, in CSV or similar text format.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const AnomalySchema = z.object({
  title: z.string().describe('A short, descriptive title for the anomaly.'),
  description: z.string().describe('A concise explanation of the anomaly and why it is significant.'),
  severity: z.enum(['low', 'medium', 'high']).describe('The severity of the anomaly.'),
});

const DetectAnomaliesOutputSchema = z.object({
  anomalies: z.array(AnomalySchema).describe('An array of detected anomalies in the data.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;
export type Anomaly = z.infer<typeof AnomalySchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert data scientist specializing in anomaly detection.
Your task is to analyze the provided dataset and identify any significant outliers, unexpected trends, or unusual patterns that deviate from the norm.

For each anomaly you find, provide a clear title, a concise description of what you found and why it's noteworthy, and a severity level (low, medium, or high).

Focus on findings that would be most valuable for a business owner to review. Do not report more than 3 anomalies.

Data:
{{{data}}}
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
