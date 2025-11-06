
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Product from './components/Product';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

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

export default App;
