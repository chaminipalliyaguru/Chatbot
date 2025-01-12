import { useRef } from "react";

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    //update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //Add a thnking word
    setTimeout(() => {setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." }
      ]);

      generateBotResponse([...chatHistory,{ role: "user", text: userMessage }])
    },600);
  };

  return (
    <div className="chat-footer">
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message.."
          className="message-input"
          required
        />
        <button className="material-symbols-outlined">arrow_upward</button>
      </form>
    </div>
  );
}

export default ChatForm;
