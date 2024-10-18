import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey;

  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = createOpenAI({
    apiKey: apiKey,
  });

  const anthropic = createAnthropic({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    const { messages, model, provider } = await readBody(event);

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  });
});
