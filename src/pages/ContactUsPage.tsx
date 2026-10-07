import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { FactoryOfficeMap } from '../components/FactoryOfficeMap';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building,
  Truck
} from 'lucide-react';

interface ContactUsPageProps {
  initialProduct?: string;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ initialProduct = '' }) => {
  const { products, companyInfo, addInquiry } = useCms();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    cityState: '',
    product: initialProduct || 'W - Beam Crash Barrier',
    quantity: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, product: initialProduct }));
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generated = addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company: formData.company,
        product: formData.product,
        cityState: formData.cityState,
        quantity: formData.quantity,
        message: formData.message
      });
      setTicketId(generated);
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Sales & Project Enquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Get in touch with our sales and technical team for product price quotations, test certificates, bulk tender supply, or custom fabrication queries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
        {/* Left Column: Office & Plant Addresses + Phone Numbers */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white font-display pb-3 border-b border-slate-800">
              Get in Touch Directly
            </h3>

            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Call or WhatsApp for Instant Quote
                </span>
                <a
                  href={`tel:${companyInfo.phone.split('/')[0].trim()}`}
                  className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5 font-mono"
                >
                  {companyInfo.phone}
                </a>
                <span className="text-xs text-slate-400">Available Mon-Sat: 9:30 AM to 7:00 PM IST</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Sales & Quotation Email
                </span>
                <a
                  href={`mailto:${companyInfo.inquiryEmail}`}
                  className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5"
                >
                  {companyInfo.inquiryEmail}
                </a>
                <span className="text-xs text-slate-400">Quotations dispatched within 24 hours</span>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Corporate Sales Office
                </span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {companyInfo.headquarters}
                </p>
              </div>
            </div>
          </div>

          {/* Prompt Dispatch Notice */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="text-lime-400 font-semibold block flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-lime-400" />
              <span>Need Urgent Site Delivery?</span>
            </span>
            <p className="text-slate-400 leading-relaxed">
              We maintain ready stock of W-Beam barriers, solar road studs, TCT drill rods, and concrete vibrators for immediate dispatch via trailer/truck directly to your site.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Quotation Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Enquiry Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to Sanjog. Your enquiry has been received and assigned reference ticket:
              </p>
              <div className="inline-block px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-cyan-400 font-bold">
                {ticketId}
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Our sales engineer will call you or share the formal price quotation with test certifications within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      company: '',
                      cityState: '',
                      product: 'W - Beam Crash Barrier',
                      quantity: '',
                      message: ''
                    });
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Submit another product enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white font-display">
                  Request Factory Price Quotation
                </span>
                <span className="text-[11px] text-slate-400 font-mono">* Required fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Suman Sen"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Mobile Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9830012345"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Company / Contractor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Highway Builders Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Product Required *
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.categoryLabel})
                      </option>
                    ))}
                    <option value="Complete Highway Package">Complete Highway Safety Package</option>
                    <option value="Custom Steel Fabrication">Custom Steel Fabrication</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Quantity & Delivery Location (City/State)
                  </label>
                  <input
                    type="text"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    placeholder="e.g. 5,000 meters, West Bengal / Pan India"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Project Details / Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention any specific specifications (e.g. 3mm thickness, hot dip galvanizing grade, post height, urgent delivery date)..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1 font-mono">
                Direct factory pricing &middot; GST invoices &middot; NABL test reports provided
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Direct Factory & Office Location Map Only */}
      <section className="pt-4">
        <FactoryOfficeMap />
      </section>
    </div>
  );
};
