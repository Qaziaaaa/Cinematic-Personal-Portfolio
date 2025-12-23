'use server';

/**
 * @fileOverview This file contains a Genkit flow for suggesting refinements to uploaded images using AI.
 *
 * - `refineImageAsset` - A function that takes an image data URI and suggests refinements.
 * - `ImageAssetRefinementInput` - The input type for the `refineImageAsset` function, which is an image data URI.
 * - `ImageAssetRefinementOutput` - The output type for the `refineImageAsset` function, which includes suggested prompt refinements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAssetRefinementInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo to be refined, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageAssetRefinementInput = z.infer<typeof ImageAssetRefinementInputSchema>;

const ImageAssetRefinementOutputSchema = z.object({
  suggestedPromptRefinements: z
    .string()
    .describe(
      'Suggested text prompt refinements to enhance the image, suitable for image generation models.'
    ),
});
export type ImageAssetRefinementOutput = z.infer<typeof ImageAssetRefinementOutputSchema>;

export async function refineImageAsset(input: ImageAssetRefinementInput): Promise<ImageAssetRefinementOutput> {
  return refineImageAssetFlow(input);
}

const refineImageAssetPrompt = ai.definePrompt({
  name: 'refineImageAssetPrompt',
  input: {schema: ImageAssetRefinementInputSchema},
  output: {schema: ImageAssetRefinementOutputSchema},
  prompt: `You are an AI assistant specializing in image refinement. Given an image, you will suggest text prompt refinements to enhance the image's visual appeal and professionalism.

  Here is the image to refine:
  {{media url=imageDataUri}}

  Please suggest prompt refinements to achieve a more professional and visually appealing result. Focus on details such as lighting, composition, and style. Return these prompt refinements as a single string. Do not return anything else.`,
});

const refineImageAssetFlow = ai.defineFlow(
  {
    name: 'refineImageAssetFlow',
    inputSchema: ImageAssetRefinementInputSchema,
    outputSchema: ImageAssetRefinementOutputSchema,
  },
  async input => {
    const {output} = await refineImageAssetPrompt(input);
    return output!;
  }
);
