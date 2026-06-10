import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStatus('success');
  };

  return (
    <section className="bg-[#1C1C1C] text-[#FFF8FA] py-16 text-center px-6 relative overflow-hidden">
      <div className="max-w-xl mx-auto relative z-10">
        <h2 className="text-3xl font-light tracking-wide mb-3">Join the <span className="italic font-semibold text-[#D4A5B8]">Privé Circle</span></h2>
        <p className="text-xs text-[#FFF8FA]/60 max-w-md mx-auto mb-8 leading-relaxed">
          Subscribe to receive exclusive drops, couture masterclass invites, and private priority offers.
        </p>

        {status === 'success' ? (
          <p className="text-sm font-medium text-[#D4A5B8]">Welcome to privilege. Check your inbox for confirmation.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 text-white border border-white/10 placeholder-white/40 px-4 py-3 rounded-[12px] text-xs focus:outline-none focus:border-[#D4A5B8]"
            />
            <button type="submit" className="bg-[#FFF8FA] text-[#1C1C1C] px-6 py-3 rounded-[12px] text-xs font-semibold tracking-wider hover:bg-[#D4A5B8] transition-all">
              Request Invite
            </button>
          </form>
        )}
      </div>
    </section>
  );
};