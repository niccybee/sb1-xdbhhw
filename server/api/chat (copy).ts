import { OpenAI } from "openai";
import { StreamText, convertToCoreMessages } from "ai";
import Anthropic from "@anthropic-ai/sdk";
import { useApiKeyStore } from "../../stores/apiKeys";
import { createOpenAI } from "@ai-sdk/openai";

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) throw new Error("Missing OpenAI API key");
  const openai = createOpenAI({
    apiKey: apiKey,
  });

  return defineEventHandler(async (event: any) => {
    
    const { messages } = await readBody(event);

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
  });
});

// const config = useRuntimeConfig();
// const { message, provider, model, file } = await readBody(event);

// if (provider === "openai") {
//   const openai = new OpenAI({
//     apiKey: config.openaiApiKey,
//   });

//   if (model === "gpt-4-vision-preview" && file) {
//     const response = await openai.chat.completions.create({
//       model: model,
//       messages: [
//         {
//           role: "user",
//           content: [{ type: "image_url", image_url: { url: file } }],
//         },
//       ],
//       max_tokens: 300,
//     });
//     return { message: response.choices[0].message.content };
//   } else {
//     const response = await openai.chat.completions.create({
//       model: model,
//       stream: true,
//       messages: [{ role: "user", content: message }],
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);
//   }
// } else if (provider === "anthropic") {
//   const anthropic = new Anthropic({
//     apiKey: config.anthropicApiKey,
//   });

//   const response = await anthropic.completions.create({
//     model: model,
//     prompt: `Human: ${message}\nAssistant:`,
//     max_tokens_to_sample: 300,
//   });

//   return { message: response.completion };
// } else {
//   throw createError({
//     statusCode: 400,
//     statusMessage: "Invalid provider",
//   });
// }
