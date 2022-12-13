import { useState } from "react";
import { ofetch } from "ofetch";
import toast from "react-hot-toast";
import logger from "../logger";

function Chat() {
  const [msg, setMsg] = useState("");
  const [question, setQuestion] = useState("");
  const [keys, setKeys] = useState<{ token: string; clearance: string }>({
    token: process.env.NEXT_TOKEN,
    clearance: "",
  });

  async function chat() {
    try {
      logger.info(`Call GPT: ${JSON.stringify({ question, keys })}`);
      toast.loading("Processing...");
      const { msg } = await ofetch("/api/gpt", {
        method: "POST",
        body: { question, keys },
      });
      toast.success("Done!");
      setMsg(msg);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <p>
        Click on the OpenAI then get enter the tokens from{" "}
        <a
          href="https://github.com/transitive-bullshit/chatgpt-api#session-tokens"
          target="_blank"
        >
          Application tab.
        </a>
      </p>

      <div className="row">
        <input
          id="token-input"
          onChange={(e) => setKeys({ ...keys, token: e.currentTarget.value })}
          placeholder="Enter token"
        />
        <input
          id="clearance-input"
          onChange={(e) =>
            setKeys({ ...keys, clearance: e.currentTarget.value })
          }
          placeholder="Enter clearance token"
        />
      </div>
      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setQuestion(e.currentTarget.value)}
            placeholder="Enter your question"
          />
          <button type="button" onClick={() => chat()}>
            Ask AI
          </button>
        </div>
      </div>

      <p>{JSON.stringify(msg, null, 2)}</p>
    </>
  );
}

export default Chat;
