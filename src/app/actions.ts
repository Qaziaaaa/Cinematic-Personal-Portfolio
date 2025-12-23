"use server";

import { generateHeroContent, type HeroContentInput } from "@/ai/flows/ai-powered-content-generation";

export async function getHeroContentSuggestions(input: HeroContentInput) {
    try {
        const suggestions = await generateHeroContent(input);
        return suggestions;
    } catch (error) {
        console.error("Error generating hero content:", error);
        return { taglineSuggestions: [], descriptionSuggestions: [] };
    }
}
