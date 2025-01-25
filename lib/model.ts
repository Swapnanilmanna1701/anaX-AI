import { createOpenAI } from "@ai-sdk/openai";
import { createAzure } from "@ai-sdk/azure";
import { createOllama } from "ollama-ai-provider";

export type LLMModel = {
  id: string;
  name: string;
  provider: string;
  providerId: string;
};

export type LLMModelConfig = {
  model?: string;
  apiKey?: string;
  baseURL?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  maxTokens?: number;
};

export function getModelClient(model: LLMModel, config: LLMModelConfig) {
  const { id: modelNameString, providerId } = model;
  const { apiKey, baseURL } = config;
  const ENDPOINT = process.env.AZURE_ENDPOINT;

  const providerConfigs = {
    togetherai: () =>
      createOpenAI({
        apiKey: apiKey || process.env.TOGETHER_API_KEY,
        baseURL: baseURL || "https://api.together.xyz/v1",
      })(modelNameString),
    ollama: () => createOllama({ baseURL })(modelNameString),
    fireworks: () =>
      createOpenAI({
        apiKey: apiKey || process.env.FIREWORKS_API_KEY,
        baseURL: baseURL || "https://api.fireworks.ai/inference/v1",
      })(modelNameString),
    azure: () =>
      createAzure({
        apiKey: process.env.AZURE_API_KEY,
        baseURL: `${ENDPOINT}/openai/deployments`,
      })(modelNameString),
  };

  const createClient =
    providerConfigs[providerId as keyof typeof providerConfigs];

  if (!createClient) {
    throw new Error(`Unsupported provider: ${providerId}`);
  }

  return createClient();
}

//from models.json file can be copy pasted later
/*
{
      "id": "accounts/fireworks/models/llama-v3p1-405b-instruct",
      "provider": "Fireworks",
      "providerId": "fireworks",
      "name": "Llama 3.1 405B"
    },
    {
      "id": "accounts/fireworks/models/llama-v3p1-70b-instruct",
      "provider": "Fireworks",
      "providerId": "fireworks",
      "name": "Llama 3.1 70B"
    },
    {
      "id": "accounts/fireworks/agents/f1-preview",
      "provider": "Fireworks",
      "providerId": "fireworks",
      "name": "F1 (Preview)"
    },
    {
      "id": "accounts/fireworks/agents/f1-mini-preview",
      "provider": "Fireworks",
      "providerId": "fireworks",
      "name": "F1 Mini (Preview)"
    },
    {
      "id": "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      "provider": "Together AI",
      "providerId": "togetherai",
      "name": "Llama 3.1 70B"
    },
    {
      "id": "llama3.2",
      "provider": "Ollama",
      "providerId": "ollama",
      "name": "Llama 3.2 3B"
    },
  */