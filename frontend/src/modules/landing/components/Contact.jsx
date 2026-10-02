import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../../../data/schoolData';

export default function Contact({ onOpenAssistant }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details for your message';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate reliable async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-ivory border-t border-ivory-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-gold-600" />
            <span className="text-xs uppercase tracking-super-wide font-bold text-forest-800">
              Get in Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 leading-tight mb-4">
            Let's Start a Conversation
          </h2>

          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
            Have a question about Greenfield International School? Our admissions and academic coordinators are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Side: Contact Information & Campus Logistics */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="bg-forest-900 text-ivory rounded-2xl p-7 sm:p-9 border border-forest-950 shadow-editorial mb-6">
                <div className="text-[11px] uppercase tracking-widest-plus text-gold-300 font-bold mb-4">
                  Contact GIS
                </div>

                <h3 className="font-serif text-2xl font-bold text-ivory mb-2">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-gold-200/90 italic font-serif mb-6">
                  {SCHOOL_INFO.tagline}
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ivory">Campus Address</p>
                      <p className="text-ivory/80 text-xs mt-0.5 leading-relaxed">
                        {SCHOOL_INFO.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ivory">Email Inquiries</p>
                      <p className="text-ivory/80 text-xs mt-0.5">
                        <a href={`mailto:${SCHOOL_INFO.generalEmail}`} className="hover:text-gold-300 underline underline-offset-2">
                          {SCHOOL_INFO.generalEmail}
                        </a>
                      </p>
                      <p className="text-ivory/80 text-xs mt-0.5">
                        <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-gold-300 underline underline-offset-2">
                          {SCHOOL_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ivory">Admissions Desk</p>
                      <p className="text-ivory/80 text-xs mt-0.5">{SCHOOL_INFO.phone}</p>
                      <p className="text-ivory/80 text-xs mt-0.5">{SCHOOL_INFO.altPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ivory">Office & Visiting Hours</p>
                      <p className="text-ivory/80 text-xs mt-0.5">{SCHOOL_INFO.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation / Zone Assistance Note */}
              <div className="p-5 rounded-xl bg-ivory-dark border border-ivory-border text-xs text-charcoal-700">
                <p className="font-bold text-forest-950 mb-1">Campus Tours & Walk-ins</p>
                <p className="leading-relaxed">
                  Parents are welcome for guided campus walk-throughs Monday through Saturday with prior appointment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-7 sm:p-10 border border-ivory-border shadow-editorial">
              
              {submitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-14 h-14 rounded-full bg-forest-50 border border-forest-800/20 text-forest-800 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-forest-700" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest-950 mb-2">
                    Message Received
                  </h3>
                  <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
                    Thank you for reaching out to Greenfield International School. Our admissions coordinator will review your inquiry and connect with you within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs uppercase tracking-widest font-bold text-forest-900 bg-ivory hover:bg-ivory-dark border border-ivory-border rounded-md transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-ivory-border pb-3 mb-6">
                    <h3 className="font-serif text-xl font-bold text-forest-950">
                      Admissions & General Inquiry
                    </h3>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Please provide your details below and we will get back to you promptly.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Anand Mahindra"
                      className={`w-full px-4 py-3 text-sm bg-ivory/50 border rounded-lg focus:bg-white transition-all ${
                        errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-ivory-border focus:border-forest-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Email Address <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="parent@example.com"
                        className={`w-full px-4 py-3 text-sm bg-ivory/50 border rounded-lg focus:bg-white transition-all ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-ivory-border focus:border-forest-700'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Phone Number <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-3 text-sm bg-ivory/50 border rounded-lg focus:bg-white transition-all ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-ivory-border focus:border-forest-700'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject / Grade of interest */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Subject / Grade of Interest
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm bg-ivory/50 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700 transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Pre-Primary (Nursery - KG)">Pre-Primary Admissions (Nursery - KG)</option>
                      <option value="Primary School (Grades 1 - 5)">Primary School (Grades 1 - 5)</option>
                      <option value="Middle School (Grades 6 - 8)">Middle School (Grades 6 - 8)</option>
                      <option value="Senior School (Grades 9 - 12)">Senior School (Grades 9 - 12)</option>
                      <option value="Campus Tour Booking">Campus Tour Booking</option>
                      <option value="Career & Faculty Application">Career & Faculty Application</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Message / Specific Questions <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share any questions regarding academic curriculum, admission deadlines, fee structures, or campus facilities..."
                      className={`w-full px-4 py-3 text-sm bg-ivory/50 border rounded-lg focus:bg-white transition-all ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-ivory-border focus:border-forest-700'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button & 24/7 Talk to Us */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 hover:bg-forest-800 disabled:bg-charcoal-400 rounded-md shadow-sm hover:shadow-subtle-elevated transition-all"
                    >
                      {loading ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 text-gold-400" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onOpenAssistant}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-forest-900 bg-forest-50 hover:bg-forest-100 border border-forest-800/20 rounded-md transition-all shadow-sm group"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold-600 group-hover:scale-110 transition-transform" />
                      <span>Talk to Us 24/7 (AI Assistant)</span>
                    </button>
                  </div>
                </form>
              )}

              {/* 24/7 Banner Highlight */}
              <div className="mt-7 pt-5 border-t border-ivory-border flex items-center justify-between gap-3 text-xs text-charcoal-600">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-forest-950">Immediate assistance available:</span>
                  <span className="hidden sm:inline text-charcoal-500">Admissions desk & 24/7 virtual assistant active</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenAssistant}
                  className="font-bold text-forest-800 hover:text-gold-700 underline text-xs shrink-0"
                >
                  Talk 24/7 →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
