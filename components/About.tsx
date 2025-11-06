
import React from 'react';

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

export default About;
