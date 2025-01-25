// import ChatbotIcon from "./ChatbotIcon"

// function ChatMessage({chat}) {
//   return (
//     <div>
//       <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
//         {chat.role === "model" && <ChatbotIcon/>}
//             <p className="message-text">
//               {chat.text}
//             </p>
//           </div>
//     </div>
//   )
// }

// export default ChatMessage


import ChatbotIcon from "./ChatbotIcon";

function ChatMessage({ chat }) {
  return (
    <div className={`message ${chat.role === "assistant" ? "bot" : "user"}-message`}>
      {chat.role === "assistant" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
}

export default ChatMessage;