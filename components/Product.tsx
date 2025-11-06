import React from 'react';

// FIX: Explicitly type FeatureCard as a React.FC to resolve a potential type inference issue.
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

export default Product;