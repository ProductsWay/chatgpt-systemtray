import { useState } from "react";
import Image from "next/image";

import openAILogo from "../assets/openai.jpg";
import { askQuestion } from "../ai";
import toast from "react-hot-toast";

function App() {
  const [msg, setMsg] = useState("");
  const [question, setQuestion] = useState("");
  const [keys, setKeys] = useState<{ token: string; clearance: string }>({
    token: process.env.NEXT_TOKEN,
    clearance: "",
  });

  async function chat() {
    try {
      toast.loading("Processing...");
      setMsg(await askQuestion(question, keys));
      toast.success("Done!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container">
      <h1>Welcome to ChatGPT systemtray</h1>

      <div className="row">
        <span className="logos">
          <a href="https://chat.openai.com/chat" target="_blank">
            <Image
              sizes="fill"
              src={openAILogo}
              className="logo next"
              alt="Next logo"
            />
          </a>
        </span>
      </div>

      <p>
        Click on the OpenAI then get enter the tokens on{" "}
        <a
          href="https://github.com/transitive-bullshit/chatgpt-api#session-tokens"
          target="_blank"
        >
          from cookie on Application tab.
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

      <p>{msg}</p>
    </div>
  );
}

export default App;
