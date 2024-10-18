import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import Anthropic from '@anthropic-ai/sdk';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { message, provider, model, file } = await readBody(event);

  if (provider === 'openai') {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    });

    if (model === 'gpt-4-vision-preview' && file) {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: message || 'What's in this image?' },
              { type: 'image_url', image_url: { url: file } }
            ],
          },
        ],
        max_tokens: 300,
      });
      return { message: response.choices[0].message.content };
    } else {
      const response = await openai.chat.completions.create({
        model: model,
        stream: true,
        messages: [{ role: 'user', content: message }],
      });

      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    }
  } else if (provider === 'anthropic') {
    const anthropic = new Anthropic({
      apiKey: config.anthropicApiKey,
    });

    const response = await anthropic.completions.create({
      model: model,
      prompt: `Human: ${message}\nAssistant:`,
      max_tokens_to_sample: 300,
    });

    return { message: response.completion };
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid provider',
    });
  }
});