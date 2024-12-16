
import { OpenAI } from 'openai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const body = await readBody(event);
    const { prompt, numImages, apiKey } = body;

    if (!apiKey) {
      throw new Error('API key is required');
    }

    const openai = new OpenAI({
      apiKey: apiKey
    });

    const response = await openai.images.generate({
      prompt,
      n: numImages,
      size: "1024x1024",
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Image generation error:', error);
    
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      }
    };
  }
});
