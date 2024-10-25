import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { useChatStore } from "../stores/chat";

export default defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey;

  if (!apiKey) throw new Error("Missing OpenAI API key");

  const openai = createOpenAI({
    apiKey: apiKey,
  });

  const anthropic = createAnthropic({
    apiKey: apiKey,
  });

  // function defineModel(model: string) {}

  return defineEventHandler(async (event: any) => {
    const { messages, model } = await readBody(event);

    const result = await streamText({
      model: model || openai("gpt-4-turbo"),
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  });
});
