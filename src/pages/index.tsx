import Image from "next/image";

import openAILogo from "../assets/openai.jpg";
import Chat from "../components/Chat";

function App() {
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

      <Chat />
    </div>
  );
}

export default App;
