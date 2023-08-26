import { User } from "@prisma/client";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { loadSummarizationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  OutputFixingParser,
  StructuredOutputParser,
} from "langchain/output_parsers";

import { env } from "@/env.mjs";

export const chatModel = new ChatOpenAI({
  openAIApiKey: env.OPENAI_API_KEY,
  temperature: 0.4,
  modelName: "gpt-4",
  maxRetries: 2,
  maxTokens: 2500,
  verbose: env.NODE_ENV != "production",
});

export const gpt3 = new OpenAI({
  openAIApiKey: env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  maxRetries: 2,
  maxTokens: 2500,
  verbose: env.NODE_ENV != "production",
});

export type UserDetails = Pick<User, "id" | "email" | "name">;

// TODO: Refactor this to use the new chat model
export async function callOpenAi<T>(
  prompt: string,
  parser?: StructuredOutputParser<z.ZodSchema<T>>
): Promise<T | string | undefined> {
  console.log("Making request to OpenAI API with prompt: \n\n", prompt);
  console.log(`\nAI is thinking...`);
  const start = performance.now();
  const response = await gpt3.call(prompt);
  try {
    const data = parser ? await parser.parse(response) : response;
    const end = performance.now();
    const time = Math.round((end - start) / 1000);
    console.log(`AI took ${time}s seconds to generate response.`);
    console.log("Response from OpenAI: \n\n", response);
    return data;
  } catch (error) {
    console.error("Failed to parse bad output: ", error);
    if (!parser) return response;
    const fixParser = OutputFixingParser.fromLLM(gpt3, parser);
    const output = await fixParser.parse(response);
    console.log("Fixed output: ", !!output);
    return output;
  }
}

export async function summarizeText(
  text: string,
  chunkSize: number = 500
): Promise<string> {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize });
  const docs = await textSplitter.createDocuments([text]);
  const chain = loadSummarizationChain(gpt3, {
    type: "map_reduce",
    verbose: true,
  });
  const summary = await chain.call({
    input_documents: docs,
  });
  return summary["text"];
}
