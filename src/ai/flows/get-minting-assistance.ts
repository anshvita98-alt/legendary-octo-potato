'use server';

/**
 * @fileOverview Provides AI assistance for the minting process.
 *
 * - getMintingAssistance - A function that provides assistance for minting.
 * - GetMintingAssistanceInput - The input type for the getMintingAssistance function.
 * - GetMintingAssistanceOutput - The return type for the getMintingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMintingAssistanceInputSchema = z.object({
  query: z.string().describe('The user query regarding the minting process.'),
});
export type GetMintingAssistanceInput = z.infer<typeof GetMintingAssistanceInputSchema>;

const GetMintingAssistanceOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the user query.'),
});
export type GetMintingAssistanceOutput = z.infer<typeof GetMintingAssistanceOutputSchema>;

export async function getMintingAssistance(input: GetMintingAssistanceInput): Promise<GetMintingAssistanceOutput> {
  return getMintingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMintingAssistancePrompt',
  input: {schema: GetMintingAssistanceInputSchema},
  output: {schema: GetMintingAssistanceOutputSchema},
  prompt: `You are a helpful AI assistant that guides users through the process of minting digital heirlooms on Legacy Vault.

  Respond to the following user query about the minting process:
  {{query}}
  `,
});

const getMintingAssistanceFlow = ai.defineFlow(
  {
    name: 'getMintingAssistanceFlow',
    inputSchema: GetMintingAssistanceInputSchema,
    outputSchema: GetMintingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
