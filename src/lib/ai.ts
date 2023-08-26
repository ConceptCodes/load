import { type Topics } from "@prisma/client";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { env } from "@/env.mjs";

const model = new OpenAI({
  openAIApiKey: env.OPEN_API_KEY,
  temperature: 0.9,
  maxRetries: 3,
  maxTokens: 1500,
});

const getMemory = (userId: string, topic: string) => {
  return new ConversationSummaryMemory({
    memoryKey: `@-${userId}-${topic}`,
    llm: new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
  });
};

async function callOpenAi(
  topic: Topics,
  message: string,
  userId: string
): Promise<string | undefined> {
  let prompt = "Hello, You are a {topic} TA with 25+ years of experience.\n";
  prompt += "A student comes to you with the following question.\n";
  prompt += "Q: {message}\n";
  prompt += "How would you respond?\n";

  const template = new PromptTemplate({
    template: prompt,
    inputVariables: ["topic", "message"],
  });

  const input = 
    // const chain = new LLMChain({
    //   llm: model,
    //   prompt: template,
    //   memory: getMemory(userId, topic),
    // });

  console.log("Making request to OpenAI API with prompt: \n\n", prompt);
  console.log(`\nAI is thinking...`);
  const start = performance.now();
  const response = await model.call(input);
  const end = performance.now();
  const time = Math.round((end - start) / 1000);
  console.log(`AI took ${time}s to respond.`);
  console.log("Response from OpenAI: \n\n", response);
  return response;
}
