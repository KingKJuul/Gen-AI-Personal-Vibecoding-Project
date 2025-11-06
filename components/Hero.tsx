
import React from 'react';

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

export default Hero;
