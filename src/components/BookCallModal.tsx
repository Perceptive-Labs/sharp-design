import React, { useState } from 'react';
import { X, CheckCircle, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FOUNDER_DATA } from '../data/mockData';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 2:00 PM');
  const [projectType, setProjectType] = useState<string>('Full Brand & Web Redesign');
  const [budget, setBudget] = useState<string>('€10k - €25k');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableDates = [
    { label: 'Tomorrow', time: '2:00 PM CET' },
    { label: 'Tomorrow', time: '4:30 PM CET' },
    { label: 'Thursday', time: '11:00 AM CET' },
    { label: 'Thursday', time: '3:00 PM CET' },
    { label: 'Friday', time: '10:30 AM CET' },
    { label: 'Friday', time: '2:00 PM CET' },
  ];

  const projectTypes = [
    'Full Brand & Web Redesign',
    'Conversion-Ready Web / App',
    'Series A/B Pitch Deck',
    'Fractional Design Partner',
    'General Design Advisory',
  ];

  const budgetTiers = ['€5k - €10k', '€10k - €25k', '€25k - €50k', '€50k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5C00', '#121212', '#00875A'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  const handleReset = () => {
    setStep('details');
    setFormData({ name: '', email: '', company: '', notes: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div onClick={onClose} className="fixed inset-0" />

      <div className="relative w-full max-w-xl bg-[#fbf9ef] rounded-[32px] shadow-2xl p-6 md:p-8 z-10 border border-black/10 my-auto max-h-[92vh] overflow-y-auto text-[#121212] animate-in slide-in-from-bottom-8 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#121212]/5 hover:bg-[#121212]/10 cursor-pointer text-[#121212]/50 hover:text-[#121212] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-4 mb-8 border-b border-black/10 pb-6">
              <img
                src={FOUNDER_DATA.avatar}
                alt={FOUNDER_DATA.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#FF5C00]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#121212] tracking-tight uppercase">
                  Book a 20-Min Intro Call
                </h3>
                <p className="text-xs font-mono font-bold text-[#121212]/60 uppercase tracking-widest mt-1">
                  With {FOUNDER_DATA.name}, Design Director
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FF5C00] mb-3 font-mono">
                  1. Select Preferred Time Slot (CET)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDates.map((slot, i) => {
                    const fullVal = `${slot.label}, ${slot.time}`;
                    const isSelected = selectedDate === fullVal;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(fullVal)}
                        className={`p-3 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#121212] text-white border-[#121212] shadow-sm font-bold'
                            : 'bg-white text-[#121212] border-black/10 hover:border-black/30'
                        }`}
                      >
                        <div className="text-[10px] opacity-70 font-mono mb-0.5">{slot.label}</div>
                        <div className="font-bold">{slot.time}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FF5C00] mb-3 font-mono">
                  2. Project Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        projectType === type
                          ? 'bg-[#FF5C00] text-white'
                          : 'bg-white text-[#121212] border border-black/10 hover:border-black/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FF5C00] mb-3 font-mono">
                  3. Estimated Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetTiers.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`py-3 px-2 text-center rounded-2xl text-xs transition-all cursor-pointer font-mono ${
                        budget === b
                          ? 'bg-[#121212] text-white font-black'
                          : 'bg-white text-[#121212] font-bold border border-black/10 hover:border-black/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/10 text-sm font-medium text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/10 text-sm font-medium text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company / Website"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/10 text-sm font-medium text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
                />

                <textarea
                  rows={2}
                  placeholder="Briefly tell us what you're building..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-black/10 text-sm font-medium text-[#121212] placeholder-[#121212]/40 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Confirming slot...</span>
                ) : (
                  <>
                    <span>Confirm & Lock Intro Call</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#121212]/60 font-mono uppercase tracking-wider font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5C00]" />
                <span>Direct founder call • Strictly confidential</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 bg-[#fbf9ef] text-[#FF5C00] border-2 border-[#FF5C00] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-3xl font-black uppercase text-[#121212] tracking-tight">
                Call Confirmed!
              </h3>
              <p className="text-sm font-medium text-[#121212]/80 mt-3 max-w-sm mx-auto leading-relaxed">
                We sent a Google Meet invitation and calendar invite to <span className="font-bold text-[#FF5C00]">{formData.email || 'your email'}</span>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/10 max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="text-[#FF5C00] uppercase font-bold text-[10px] font-mono tracking-wider mb-2">Session Details:</div>
              <div className="font-bold text-[#121212] font-mono text-sm">{selectedDate}</div>
              <div className="text-[#121212]/70 font-medium">{projectType} • {budget}</div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 py-3.5 px-8 rounded-full bg-[#121212] text-white text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-black transition-all"
            >
              Return to Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
