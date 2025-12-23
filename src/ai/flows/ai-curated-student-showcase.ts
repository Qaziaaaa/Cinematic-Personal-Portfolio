'use server';
/**
 * @fileOverview This file defines a Genkit flow for curating a list of the best student works using AI.
 *
 * - curateStudentShowcase - An async function that curates student works and returns a list of highlights.
 * - CurateStudentShowcaseInput - The input type for the curateStudentShowcase function.
 * - CurateStudentShowcaseOutput - The output type for the curateStudentShowcase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CurateStudentShowcaseInputSchema = z.object({
  studentWorks: z.array(
    z.object({
      title: z.string().describe('The title of the student work.'),
      description: z.string().describe('A brief description of the student work.'),
      imageUrl: z.string().describe('URL of the student work.'),
      studentName: z.string().describe('The name of the student.'),
      tags: z.array(z.string()).describe('Relevant tags for the student work.'),
    })
  ).describe('An array of student work objects to evaluate.'),
  criteria: z.string().optional().describe('Optional, specific criteria for selecting the best works. If empty, defaults to general excellence.'),
});
export type CurateStudentShowcaseInput = z.infer<typeof CurateStudentShowcaseInputSchema>;

const CurateStudentShowcaseOutputSchema = z.object({
  highlightedWorks: z.array(
    z.object({ // Define the structure of each highlighted work
      title: z.string().describe('The title of the highlighted student work.'),
      description: z.string().describe('A brief description of why this work was highlighted.'),
      imageUrl: z.string().describe('URL of the student work.'),
      studentName: z.string().describe('The name of the student.'),
      tags: z.array(z.string()).describe('Relevant tags for the student work.'),
      reason: z.string().describe('The AI reason for highlighting this project'),
    })
  ).describe('An array of the best student works, curated by AI.'),
});
export type CurateStudentShowcaseOutput = z.infer<typeof CurateStudentShowcaseOutputSchema>;

export async function curateStudentShowcase(input: CurateStudentShowcaseInput): Promise<CurateStudentShowcaseOutput> {
  return curateStudentShowcaseFlow(input);
}

const curateStudentShowcasePrompt = ai.definePrompt({
  name: 'curateStudentShowcasePrompt',
  input: {schema: CurateStudentShowcaseInputSchema},
  output: {schema: CurateStudentShowcaseOutputSchema},
  prompt: `You are an AI curator selecting the best student works from a collection to showcase on a community website.

  Your goal is to identify works that exemplify the community's values and attract new members.
  Consider the overall quality, creativity, relevance to the community's focus areas (AI website building, animated parallax, AI-assisted web apps, internal tools automation), and potential to inspire others.

  @criteria: {{{criteria}}}

  Here are the student works to evaluate:
  {{#each studentWorks}}
  ---
  Title: {{{this.title}}}
  Description: {{{this.description}}}
  Image URL: {{{this.imageUrl}}}
  Student Name: {{{this.studentName}}}
  Tags: {{#each this.tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{/each}}

  Select the best works and provide a short description of why each was chosen.
  Return the highlightedWorks as JSON. Ensure the JSON is valid and matches the schema.
`,
});

const curateStudentShowcaseFlow = ai.defineFlow(
  {
    name: 'curateStudentShowcaseFlow',
    inputSchema: CurateStudentShowcaseInputSchema,
    outputSchema: CurateStudentShowcaseOutputSchema,
  },
  async input => {
    const {output} = await curateStudentShowcasePrompt(input);
    return output!;
  }
);
