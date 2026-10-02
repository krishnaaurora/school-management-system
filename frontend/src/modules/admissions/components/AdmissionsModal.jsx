import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import GisEmblem from '../../../components/ui/GisEmblem';
import { SCHOOL_INFO } from '../../../data/schoolData';

export default function AdmissionsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Grade 1',
    email: '',
    phone: '',
    preferredDate: '',
    inquiryType: 'Admissions 2026-27',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.parentName.trim()) errs.parentName = 'Parent/Guardian name is required';
    if (!formData.studentName.trim()) errs.studentName = 'Student name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Valid phone number is required';
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
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      parentName: '',
      studentName: '',
      grade: 'Grade 1',
      email: '',
      phone: '',
      preferredDate: '',
      inquiryType: 'Admissions 2026-27',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-forest-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-ivory rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-forest-900 text-ivory px-6 py-4 flex items-center justify-between border-b border-forest-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <GisEmblem size="sm" />
            <div>
              <h3 className="font-serif font-bold text-base text-ivory">Admissions & Campus Tour Registration</h3>
              <p className="text-[11px] text-gold-300 font-medium">Academic Session 2026 – 2027</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ivory/70 hover:text-ivory hover:bg-forest-800 rounded-md transition-colors"
            aria-label="Close Admissions Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-white flex-1">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-forest-50 border border-forest-800/20 text-forest-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-forest-700" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950 mb-2">
                Application Initiated
              </h3>
              <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-forest-900">{formData.parentName}</strong>. Our Admissions Office has registered your interest for <strong className="text-forest-900">{formData.studentName}</strong> ({formData.grade}). An admissions package and visit slot confirmation will be sent to <strong className="text-forest-900">{formData.email}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 rounded-md shadow"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="p-3.5 bg-ivory-dark rounded-xl border border-ivory-border text-xs text-charcoal-700 mb-2">
                <p className="font-bold text-forest-900 mb-0.5">Admissions Notice (2026-27):</p>
                <p>Limited seats available across Nursery to Grade 11. Early interaction bookings receive priority tour scheduling.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="e.g. S. Radhakrishnan"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700"
                  />
                  {errors.parentName && <p className="text-[11px] text-red-600 mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700"
                  />
                  {errors.studentName && <p className="text-[11px] text-red-600 mt-1">{errors.studentName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Grade Applying For
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700"
                  >
                    <option value="Nursery / Early Years">Nursery / Early Years (Age 3+)</option>
                    <option value="Kindergarten (LKG/UKG)">Kindergarten (LKG/UKG)</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6 (Cambridge)</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9 (IGCSE / CBSE)</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11 (IBDP / CBSE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700"
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="parent@domain.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Preferred Campus Tour Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-ivory/60 border border-ivory-border rounded-lg focus:bg-white focus:border-forest-700 text-charcoal-700"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-xs uppercase tracking-widest font-bold text-ivory bg-forest-900 hover:bg-forest-800 disabled:bg-charcoal-400 rounded-md shadow flex items-center justify-center gap-2 transition-all"
                >
                  {submitting ? 'Submitting Application...' : 'Register Application / Tour Slot'}
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
