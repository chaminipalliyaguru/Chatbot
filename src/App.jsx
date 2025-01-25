// import { useState } from "react";
// import ChatbotIcon from "./components/ChatbotIcon";
// import ChatForm from "./components/ChatForm";
// import ChatMessage from "./components/ChatMessage";

// function App() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const generateBotResponse = async (history) => {
//     history = history.map(({role, text}) => ({role, parts: [{text}]}))

//     const requestOptions = {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({contents : history})
//     }

//     try{
//       const response = await fetch(import.meta.env.VITE_Chatbot_API_URL, requestOptions);
//       const data = await response.json();
//       if(!response.ok) throw new Error(data.error.message || "Something went wrong.");
//       console.log(data); 
//     }catch(error){
//       console.log(error);
//     }
//   };

  

//   return (
//     <div className="container">
//       <div className="chatbot-popup">
//         <div className="chat-header">
//           <div className="header-info">
//             <ChatbotIcon />
//             <h2 className="logo-text">chatbot</h2>
//             <button className="material-symbols-rounded">
//               keyboard_arrow_down
//             </button>
//           </div>
//         </div>
//         <div className="chat-body">
//           <div className="message bot-message">
//             <ChatbotIcon />
//             <p className="message-text">
//               Hey there. <br /> How can I help you today?
//             </p>
//           </div>

//           {chatHistory.map((chat, index) => (
//             <ChatMessage key={index} chat={chat} />
//           ))}
//         </div>

//         <ChatForm
//           chatHistory={chatHistory}
//           setChatHistory={setChatHistory}
//           generateBotResponse={generateBotResponse}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;










import { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isMinimized, setIsMinimized] = useState(false); // Minimized state

  // Function to generate bot response
  const generateBotResponse = async (userInput) => {
    try {
      setIsLoading(true); // Start loading

      // Add the user's message to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", text: userInput },
      ]);

      // Send the user's input to the backend API
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      // Handle errors
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      // Parse the response
      const data = await response.json();
      const botResponse = data.response;

      // Add the bot's response to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", text: botResponse },
      ]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      // Optionally, add an error message to the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Toggle minimize/maximize
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">chatbot</h2>
            <button
              className="material-symbols-rounded"
              onClick={toggleMinimize}
            >
              {isMinimized ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </button>
          </div>
        </div>

        {/* Chatbot body (conditionally rendered) */}
        {!isMinimized && (
          <div className="chat-body">
            {/* Initial bot message */}
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there. <br /> How can I help you today?
              </p>
            </div>

            {/* Render chat history */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {/* Show "Thinking..." while loading */}
            {isLoading && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">Thinking...</p>
              </div>
            )}
          </div>
        )}

        {/* Chat form for user input (conditionally rendered) */}
        {!isMinimized && (
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        )}
      </div>
    </div>
  );
}

export default App;