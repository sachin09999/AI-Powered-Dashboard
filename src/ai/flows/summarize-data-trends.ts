'use server';

/**
 * @fileOverview A flow that summarizes data trends and answers natural language questions about the data.
 *
 * - summarizeDataTrends - A function that handles the data summarization process.
 * - SummarizeDataTrendsInput - The input type for the summarizeDataTrends function
 * - SummarizeDataTrendsOutput - The return type for the summarizeDataTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDataTrendsInputSchema = z.object({
  data: z
    .string()
    .describe('The data to summarize, in CSV or Excel format.'),
  question: z.string().describe('A natural language question about the data.'),
});
export type SummarizeDataTrendsInput = z.infer<typeof SummarizeDataTrendsInputSchema>;

const SummarizeDataTrendsOutputSchema = z.object({
  summary: z.string().describe('A summary of the key trends and outliers in the data.'),
  answer: z.string().describe('An answer to the question about the data.'),
});
export type SummarizeDataTrendsOutput = z.infer<typeof SummarizeDataTrendsOutputSchema>;

export async function summarizeDataTrends(input: SummarizeDataTrendsInput): Promise<SummarizeDataTrendsOutput> {
  return summarizeDataTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDataTrendsPrompt',
  input: {schema: SummarizeDataTrendsInputSchema},
  output: {schema: SummarizeDataTrendsOutputSchema},
  prompt: `You are an expert data analyst. You will be given data and a question about the data.
  You will summarize the key trends and outliers in the data, and then answer the question about the data.

  Data: {{{data}}}
  Question: {{{question}}}

  Summary: //summary of key trends and outliers in the data
  Answer: //answer to the question about the data`,
});

const summarizeDataTrendsFlow = ai.defineFlow(
  {
    name: 'summarizeDataTrendsFlow',
    inputSchema: SummarizeDataTrendsInputSchema,
    outputSchema: SummarizeDataTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
