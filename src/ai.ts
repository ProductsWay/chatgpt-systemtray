import { ChatGPTAPI } from "chatgpt";

export async function askQuestion(
  question: string,
  { token, clearance }: { token: string; clearance: string }
) {
  const api = new ChatGPTAPI({
    sessionToken: token,
    clearanceToken: clearance,
    userAgent: "TODO",
  });

  const conversation = api.getConversation();
  return conversation.sendMessage(question);
}
