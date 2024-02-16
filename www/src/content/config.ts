import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

const extendedDocsSchema = z.object({
	subtitle: z.string().optional()
});

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: extendedDocsSchema
		})
	})
};
