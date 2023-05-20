import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DirectoryLoader, PDFLoader } from "langchain/document_loaders";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pineconeIndex } from "@/lib";

export const run = async () => {
  const loader = new DirectoryLoader(__dirname + "/course_material/", {
    ".pdf": (filePath) => new PDFLoader(filePath),
  });

  const rawDocs = await loader.load();
  console.log("Parsing Documents");

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);
  console.log("Docs splitted");

  console.log("Creating embeddings");
  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
  });
  console.log("Embeddings created");
};

(async () => {
  await run();
})().catch(console.error);
