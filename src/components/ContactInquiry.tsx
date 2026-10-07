import React, { useState, useEffect } from 'react';
import { COMPANY_DOSSIER, SANJOG_PRODUCTS } from '../data/companyData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Building, 
  Clock,
  Sparkles
} from 'lucide-react';

interface ContactInquiryProps {
  initialProduct?: string;
  initialMessage?: string;
}

export const ContactInquiry: React.FC<ContactInquiryProps> = ({
  initialProduct = '',
  initialMessage = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: initialProduct || 'general',
    message: initialMessage || ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, product: initialProduct }));
    }
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialProduct, initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generatedTicket = `SANJOG-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Corporate Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 font-mono">
                Direct Procurement & Project Inquiries
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Connect With Sanjog
              </h2>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Whether you need turnkey MoRTH-approved crash barriers for highway stretches, octagonal high mast lighting poles, mining drill consumables, or construction machinery, our commercial sales team responds within 24 business hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    Official Inquiries
                  </div>
                  <a
                    href={`mailto:${COMPANY_DOSSIER.inquiryEmail}`}
                    className="text-sm font-medium text-white hover:text-cyan-400 transition-colors block mt-0.5"
                  >
                    {COMPANY_DOSSIER.inquiryEmail}
                  </a>
                  <span className="text-[11px] text-slate-400">Response turnaround: &lt; 24h</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    Direct Corporate Line
                  </div>
                  <div className="text-sm font-medium text-white mt-0.5">
                    {COMPANY_DOSSIER.phone}
                  </div>
                  <span className="text-[11px] text-slate-400">Mon-Fri 09:00 - 18:30 IST</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    Works & Supply Facilities
                  </div>
                  <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                    <span className="font-semibold text-white">Fabrication & Galvanizing Works:</span> Industrial Growth Centre, West Bengal<br />
                    <span className="font-semibold text-white">Regional Sales Depots:</span> Kolkata &middot; Bhubaneswar &middot; Central Depots
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Sanjog Systems. Your inquiry has been routed to our technical solutions team with ticket reference:
                </p>
                <div className="inline-block px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-cyan-400 font-bold">
                  {ticketId}
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        product: 'general',
                        message: ''
                      });
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4"
                  >
                    Submit another inquiry or spec request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-display">
                    Commercial & Technical Inquiry Form
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">* Required fields</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Suman Sengupta"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Power Grid Ltd"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1.5">
                      Product of Interest
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="general">General Corporate Inquiry</option>
                      {SANJOG_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="custom_oem">Custom Hardware / OEM Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Technical Requirements & Project Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your target deployment, node volume, protocols, or timeline..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Validating & Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Enterprise Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center pt-2">
                  Your corporate information is kept under strict mutual NDA standards.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
