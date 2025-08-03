'use server';

/**
 * @fileOverview A flow that recommends chart types for given data.
 *
 * - recommendChartTypes - A function that takes data and returns recommended chart types.
 * - RecommendChartTypesInput - The input type for the recommendChartTypes function.
 * - RecommendChartTypesOutput - The return type for the recommendChartTypes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendChartTypesInputSchema = z.object({
  dataSummary: z
    .string()
    .describe('A summary of the data for which chart types are to be recommended.'),
  fields: z.array(z.string()).describe('The fields in the data.'),
});
export type RecommendChartTypesInput = z.infer<typeof RecommendChartTypesInputSchema>;

const RecommendChartTypesOutputSchema = z.object({
  recommendedChartTypes: z
    .array(z.string())
    .describe('An array of recommended chart types for the data.'),
  reasoning: z.string().describe('The reasoning behind the chart type recommendations.'),
});
export type RecommendChartTypesOutput = z.infer<typeof RecommendChartTypesOutputSchema>;

export async function recommendChartTypes(
  input: RecommendChartTypesInput
): Promise<RecommendChartTypesOutput> {
  return recommendChartTypesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendChartTypesPrompt',
  input: {schema: RecommendChartTypesInputSchema},
  output: {schema: RecommendChartTypesOutputSchema},
  prompt: `You are an expert data visualization consultant. Given a summary of the data and the fields present, you will recommend the most appropriate chart types to effectively visualize the data.

Data Summary: {{{dataSummary}}}
Fields: {{#each fields}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Consider the data types, relationships, and potential insights when making your recommendations. Provide a brief explanation for each recommendation.

Respond with appropriate chart types. The chart types should be from this list: line, bar, pie, scatter, donut.
`,
});

const recommendChartTypesFlow = ai.defineFlow(
  {
    name: 'recommendChartTypesFlow',
    inputSchema: RecommendChartTypesInputSchema,
    outputSchema: RecommendChartTypesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
