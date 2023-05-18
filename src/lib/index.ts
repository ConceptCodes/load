import { Message } from "@prisma/client";
import type { ChatCompletionRequestMessageRoleEnum } from "openai";
import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPEN_API_KEY,
});

const client = new OpenAIApi(configuration);

export async function callOpenAi(
  prompt: string,
  chatLog: Message[] | null
): Promise<string> {
  try {
    prompt = prompt.trim();
    prompt = prompt.replace(/\n/g, " ");
    prompt = prompt.replace(/\s\s+/g, " ");
    prompt = prompt.replace(/"/g, "");
    prompt = prompt.replace(/'/g, "");
    console.log("Making request to OpenAI API with prompt: \n\n", prompt);
    console.log(`\nAI is thinking...`);
    const start = performance.now();
    if (!chatLog) {
      chatLog = [];
    }
    const log = chatLog.map((example) => {
      return {
        content: example.content,
        role: example.isChatbot ? "system" : "user",
      } as {
        content: string;
        role: ChatCompletionRequestMessageRoleEnum;
      };
    });
    const response = await client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...(log.length > 0 ? log : []),
        {
          content: prompt,
          role: "user",
        },
      ],
    });
    let data = response.data.choices[0]?.message?.content as string;
    const end = performance.now();
    const time = Math.round((end - start) / 1000);
    console.log(`AI took ${time}s to respond.`);

    data = data.replace(/\\n/g, "\n");
    data = data.replace(/\\t/g, "\t");

    console.log("Response from OpenAI: \n\n", data);

    return data;
  } catch (error) {
    console.error(error);
    return "Sorry, I'm having trouble understanding you right now.";
  }
}
