// src/ai/flows/generate-heirloom-story.ts
'use server';
/**
 * @fileOverview Generates a story for a given heirloom item.
 *
 * - generateHeirloomStory - A function that generates a story for an heirloom.
 * - GenerateHeirloomStoryInput - The input type for the generateHeirloomStory function.
 * - GenerateHeirloomStoryOutput - The return type for the generateHeirloomStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeirloomStoryInputSchema = z.object({
  heirloomDescription: z.string().describe('A description of the heirloom item.'),
  familyStory: z.string().optional().describe('The family story associated with the heirloom, if any.'),
});

export type GenerateHeirloomStoryInput = z.infer<typeof GenerateHeirloomStoryInputSchema>;

const GenerateHeirloomStoryOutputSchema = z.object({
  story: z.string().describe('The generated story for the heirloom item.'),
});

export type GenerateHeirloomStoryOutput = z.infer<typeof GenerateHeirloomStoryOutputSchema>;

export async function generateHeirloomStory(input: GenerateHeirloomStoryInput): Promise<GenerateHeirloomStoryOutput> {
  return generateHeirloomStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeirloomStoryPrompt',
  input: {schema: GenerateHeirloomStoryInputSchema},
  output: {schema: GenerateHeirloomStoryOutputSchema},
  prompt: `You are a skilled storyteller helping users create compelling narratives for their digital heirlooms.

  Based on the description of the heirloom and the provided family story, craft a captivating story that brings the heirloom to life.

  Heirloom Description: {{{heirloomDescription}}}
  Family Story (if available): {{{familyStory}}}

  Write a story that is at least 150 words long.
  `,
});

const generateHeirloomStoryFlow = ai.defineFlow(
  {
    name: 'generateHeirloomStoryFlow',
    inputSchema: GenerateHeirloomStoryInputSchema,
    outputSchema: GenerateHeirloomStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
