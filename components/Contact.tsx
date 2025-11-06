
import React, { useState } from 'react';

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

export default Contact;
