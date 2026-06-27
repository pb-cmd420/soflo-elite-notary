"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">Book a Notary Appointment</h1>
            <p className="mt-4 text-slate-600">
              Schedule a mobile notary in South Florida. Fill out the form and we will get back to you shortly.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto text-center p-8 bg-[#F9F2DF] border border-[#B8963E]/30 rounded-2xl">
              <div className="w-12 h-12 bg-[#B8963E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#B8963E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">Request Submitted!</h2>
              <p className="text-slate-600 text-sm">
                Thank you for reaching out. We will contact you within 24 hours to confirm your appointment.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", service: "", date: "", message: "" });
                }}
                className="mt-6 px-6 py-2 bg-white border border-[#B8963E] text-[#1a1a1a] rounded-full hover:bg-[#F9F2DF] transition text-sm font-medium"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition"
                    placeholder="786-634-0070"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition"
                  >
                    <option value="">Select a service</option>
                    <option value="general">General Notarization</option>
                    <option value="real-estate">Real Estate Documents</option>
                    <option value="estate">Estate Planning</option>
                    <option value="power-of-attorney">Power of Attorney</option>
                    <option value="marriage">Marriage Ceremony</option>
                    <option value="business">Business Documents</option>
                    <option value="vehicle">Vehicle Title Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#B8963E] focus:border-transparent transition resize-none"
                  placeholder="Describe your needs, document type, location, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1a1a1a] text-white font-medium rounded-full hover:bg-[#333] transition shadow-lg shadow-[#1a1a1a]/10 border border-[#1a1a1a]"
              >
                Request Appointment
              </button>

              <p className="text-xs text-slate-500 text-center">
                We typically respond within 24 hours. For urgent requests, call or text us directly.
              </p>
            </form>
          )}

          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-[#F9F2DF] rounded-2xl">
              <div className="text-2xl mb-2"></div>
              <h3 className="font-medium text-[#1a1a1a]">Email</h3>
              <p className="text-sm text-slate-600 mt-1">SOFLOELITENOTARY@proton.me</p>
            </div>
            <div className="p-6 bg-[#F9F2DF] rounded-2xl">
              <div className="text-2xl mb-2"></div>
              <h3 className="font-medium text-[#1a1a1a]">Phone / Text</h3>
              <p className="text-sm text-slate-600 mt-1">786-634-0070</p>
            </div>
            <div className="p-6 bg-[#F9F2DF] rounded-2xl">
              <div className="text-2xl mb-2"></div>
              <h3 className="font-medium text-[#1a1a1a]">Service Area</h3>
              <p className="text-sm text-slate-600 mt-1">South Florida</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}