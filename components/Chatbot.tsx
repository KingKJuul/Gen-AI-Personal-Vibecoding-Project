import React, { useState, useRef, useEffect } from 'react';
import { askButterBot } from '../services/geminiService';
import { ChatMessage, MessageAuthor } from '../types';

// Chat bubble component
// FIX: Explicitly type ChatBubble as a React.FC to correctly handle the special 'key' prop.
const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-yellow-400 text-slate-900 rounded-br-none'
            : 'bg-slate-200 text-slate-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

// Main Chatbot component
const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      author: MessageAuthor.BOT,
      text: "Hi! I'm the Butter AI assistant. Ask me anything about how we help SaaS startups predict churn.",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chatbox when new messages are added
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { author: MessageAuthor.USER, text: userInput.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponseText = await askButterBot(userInput.trim());
      const botMessage: ChatMessage = { author: MessageAuthor.BOT, text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        author: MessageAuthor.BOT,
        text: "Sorry, I'm having some technical difficulties. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-5 sm:right-8 w-[calc(100%-2.5rem)] sm:w-96 h-[60vh] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 bg-slate-800 text-white rounded-t-2xl flex justify-between items-center">
          <h3 className="font-bold text-lg">
            Butter <span className="text-yellow-400">AI</span> Assistant
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={chatboxRef} className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                 <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
          </form>
        </div>
      </div>

      {/* FAB (Floating Action Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:right-8 h-16 w-16 bg-slate-900 rounded-full text-white shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200 z-50"
      >
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>
    </>
  );
};

export default Chatbot;