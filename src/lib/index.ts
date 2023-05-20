import type { Message, Topics } from "@prisma/client";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

import { env } from "@/env.mjs";


const chat = new ChatOpenAI({ temperature: 0.8 });

export const client = new PineconeClient();

(async function initPinecone() {
  await client.init({
    apiKey: env.PINECONE_API_KEY,
    environment: env.PINECONE_ENVIRONMENT,
  });
})().catch(console.error);
export const pineconeIndex = client.Index(env.PINECONE_INDEX);

export async function callOpenAi(
  prompt: string,
  topic: Topics,
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
      return example.isChatbot
        ? new SystemChatMessage(example.content)
        : new HumanChatMessage(example.content);
    });
    const responseB = await chat.call([
      new SystemChatMessage(
        `The following is a friendly conversation between a student and Their ${topic} TA. The TA is talkative and provides lots of specific details from its context. If the TA does not know the answer to a question, it truthfully says it does not know.`
      ),
      ...log,
      new HumanChatMessage(prompt),
    ]);
    const end = performance.now();
    const time = Math.round((end - start) / 1000);
    console.log(`AI took ${time}s to respond.`);
    return responseB.text;
  } catch (error) {
    console.error(error);
    return "Sorry, I'm having trouble understanding you right now.";
  }
}
