'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating alternative taglines and short descriptions
 * based on the community name and focus areas.
 *
 * - generateHeroContent - A function that generates alternative taglines and descriptions for the hero section.
 * - HeroContentInput - The input type for the generateHeroContent function.
 * - HeroContentOutput - The return type for the generateHeroContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HeroContentInputSchema = z.object({
  communityName: z.string().describe('The name of the community.'),
  focusAreas: z.array(z.string()).describe('A list of focus areas for the community.'),
});
export type HeroContentInput = z.infer<typeof HeroContentInputSchema>;

const HeroContentOutputSchema = z.object({
  taglineSuggestions: z.array(z.string()).describe('A list of suggested taglines.'),
  descriptionSuggestions: z
    .array(z.string())
    .describe('A list of suggested short descriptions.'),
});
export type HeroContentOutput = z.infer<typeof HeroContentOutputSchema>;

export async function generateHeroContent(input: HeroContentInput): Promise<HeroContentOutput> {
  return generateHeroContentFlow(input);
}

const generateHeroContentPrompt = ai.definePrompt({
  name: 'generateHeroContentPrompt',
  input: {schema: HeroContentInputSchema},
  output: {schema: HeroContentOutputSchema},
  prompt: `You are an AI assistant specializing in generating creative content for online communities.

You will receive the community name and a list of its focus areas.
Based on this information, generate a list of three compelling taglines and three short descriptions for the community's hero section.

Community Name: {{{communityName}}}
Focus Areas: {{#each focusAreas}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Tagline Suggestions:
Description Suggestions: `,
});

const generateHeroContentFlow = ai.defineFlow(
  {
    name: 'generateHeroContentFlow',
    inputSchema: HeroContentInputSchema,
    outputSchema: HeroContentOutputSchema,
  },
  async input => {
    const {output} = await generateHeroContentPrompt(input);
    return output!;
  }
);
