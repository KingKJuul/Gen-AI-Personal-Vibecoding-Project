import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Chat } from "@google/genai";

// --- START OF TYPES ---
enum MessageAuthor {
  USER = 'user',
  BOT = 'bot',
}

interface ChatMessage {
  author: MessageAuthor;
  text: string;
}

// --- START OF GEMINI SERVICE ---

// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual Google AI API key.
// For security, avoid committing your API key to a public repository.
const API_KEY = 'YOUR_API_KEY_HERE';

let chat: Chat | null = null;

function getChatInstance() {
  if (chat) {
    return chat;
  }
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    return null;
  }
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const systemInstruction = `You are a friendly and helpful AI assistant for Butter AI. 
Butter AI is a startup that helps early-stage SaaS founders detect customer churn before it happens. 
It unifies CRM, Slack, and usage data into one clear dashboard and uses AI to explain which customers are at risk and why.
Your role is to answer questions about Butter AI, its features (Customer Health Scoring, Insight Summaries, Automated Alerts), and its benefits.
Be enthusiastic and encourage users to sign up for early access. Keep your answers concise and clear.
Do not answer questions that are not related to Butter AI. Politely decline and steer the conversation back to Butter AI.`;

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
  return chat;
}

const askButterBot = async (message: string): Promise<string> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    return "The AI assistant is not configured. The site owner needs to add a Google AI API key for the chatbot to function.";
  }
  
  const chatInstance = getChatInstance();
  if (!chatInstance) {
      return "Could not initialize AI assistant. Please check the API key."
  }

  try {
    const response = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return "I'm sorry, but I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};


// --- START OF COMPONENTS ---

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-lg border-b border-slate-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-slate-900">
          Butter <span className="text-yellow-500">AI</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">About</a>
          <a href="#product" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">Product</a>
          <a href="#contact" className="text-slate-600 hover:text-yellow-500 transition-colors duration-300">Contact</a>
        </nav>
        <a 
          href="#contact"
          className="hidden md:inline-block bg-slate-900 text-white font-semibold px-5 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative py-20 md:py-32 bg-slate-100/50">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
                See Customer Churn <br className="hidden md:block"/> Before It Happens.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Stop guessing, start knowing. Butter AI unifies your customer data and uses predictive AI to give you a clear, actionable view of churn risk—so you can intervene at the perfect moment.
            </p>
            <a 
                href="#contact"
                className="mt-10 inline-block bg-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
            >
                Get Early Access
            </a>
        </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Stop Flying Blind</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            As a founder, your time is your most valuable asset. Stop wasting it digging through spreadsheets and Slack threads.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-red-500 mb-4">The Problem: Scattered Signals</h3>
            <p className="text-slate-600 leading-relaxed">
              Crucial churn indicators are fragmented across your CRM, support tickets, usage logs, and Slack conversations. By the time you piece it all together, it's often too late. You're left reacting to churn instead of preventing it, losing revenue and momentum when you can least afford it.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-green-500 mb-4">The Solution: One Source of Truth</h3>
            <p className="text-slate-600 leading-relaxed">
              Butter AI is your co-pilot for customer retention. We seamlessly connect your data sources to create a single, dynamic view of customer health. Our AI doesn't just show you who is at risk—it tells you *why*, providing clear, concise summaries so you can take decisive action and keep your customers happy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 transition-shadow hover:shadow-lg">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400/20 text-yellow-600 mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </div>
);

const Product: React.FC = () => {
  return (
    <section id="product" className="py-20 md:py-28 bg-slate-100/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Butter AI turns complex data into simple, powerful insights.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title="Customer Health Scoring"
          >
            Our AI analyzes product usage, communication patterns, and CRM data to generate a real-time health score for every customer, flagging at-risk accounts automatically.
          </FeatureCard>
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            title="Insight Summaries"
          >
            No more data overload. Get plain-English summaries explaining *why* a customer's health score has changed, with actionable suggestions on what to do next.
          </FeatureCard>
          <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
            title="Automated Alerts"
          >
            Receive proactive alerts in Slack or email when a customer shows signs of risk, so your team can engage before it's too late. It’s your early warning system for churn.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Join the Waitlist</h2>
          <p className="mt-4 text-lg text-slate-600">
            Be the first to know when Butter AI launches. Get early access and help shape the future of customer retention.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          {submitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold">Thank you!</h3>
              <p>You're on the list. We'll be in touch soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Tell us about your startup (optional)</label>
                <textarea name="message" id="message" rows={4} className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 text-lg">
                  Get Early Access
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-6 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Butter AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

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
      <div
        className={`fixed bottom-24 right-5 sm:right-8 w-[calc(100%-2.5rem)] sm:w-96 h-[60vh] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex-shrink-0 p-4 bg-slate-800 text-white rounded-t-2xl flex justify-between items-center">
          <h3 className="font-bold text-lg">
            Butter <span className="text-yellow-400">AI</span> Assistant
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

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

const App: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased selection:bg-yellow-400/30">
      <Header />
      <main>
        <Hero />
        <About />
        <Product />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

// --- RENDER THE APP ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
