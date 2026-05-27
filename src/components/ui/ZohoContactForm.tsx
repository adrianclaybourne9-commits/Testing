'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

export default function ZohoContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!formRef.current) return;

    if (!turnstileToken) {
      setSubmitStatus('error');
      setErrorMessage('Please complete the security verification.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(formRef.current);

    const email = formData.get('Email') as string;
    const phone = formData.get('Phone') as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    if (phone && phone.trim() !== '') {
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (!phoneRegex.test(phone)) {
        setSubmitStatus('error');
        setErrorMessage('Please enter a valid 10-digit phone number (e.g. +91-1234567890).');
        setIsSubmitting(false);
        return;
      }
    }

    if (message.length > 200) {
      setSubmitStatus('error');
      setErrorMessage('Message cannot exceed 200 characters.');
      setIsSubmitting(false);
      return;
    }

    if (formRef.current) {
      formRef.current.submit();
    }

    setTimeout(() => {
      setSubmitStatus('success');
      formRef.current?.reset();
      setMessage('');
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-24 relative bg-gray-950 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6">
            Let's Start a Conversation
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill out the form below to connect with our experts. We'll get back to you shortly to discuss your unique business challenges.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-12 shadow-2xl backdrop-blur-md">
          <form id="webform549617000000572187" name="WebToLeads549617000000572187" action="https://crm.zoho.in/crm/WebToLeadForm" method="POST" target="zoho_hidden_iframe" ref={formRef} onSubmit={handleSubmit} className="space-y-6" acceptCharset="UTF-8">
            <iframe name="zoho_hidden_iframe" id="zoho_hidden_iframe" style={{ display: 'none' }}></iframe>

            <input type="hidden" name="xnQsjsdp" value="715bfbab52562258c994a72ad57a64eb9b9124861377cd05b55a682fc3266b16" />
            <input type="hidden" name="zc_gad" id="zc_gad" value="" />
            <input type="hidden" name="xmIwtLD" value="3895451245711b22e8e16db741161809993a29764fb42365263fde502f124c1d2b0ad52591eaf6b1401abd3b98a7969e" />
            <input type="hidden" name="actionType" value="TGVhZHM=" />
            <input type="hidden" name="returnURL" value="https://punecafe.zohosites.in/" />
            <input type="hidden" name="aG9uZXlwb3Q" value="" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="First_Name" className="text-sm font-medium text-gray-300 ml-1">
                      First Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="First_Name"
                      name="First Name"
                      maxLength={40}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="John"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="Last_Name" className="text-sm font-medium text-gray-300 ml-1">
                      Last Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="Last_Name"
                      name="Last Name"
                      maxLength={80}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="Email" className="text-sm font-medium text-gray-300 ml-1">
                      Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      maxLength={100}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="Phone" className="text-sm font-medium text-gray-300 ml-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="Phone"
                      name="Phone"
                      maxLength={15}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                      placeholder="+91-1234567890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="LEADCF5" className="text-sm font-medium text-gray-300 ml-1">Product</label>
                  <select
                    id="LEADCF5"
                    name="LEADCF5"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all appearance-none"
                  >
                    <option value="-None-" className="bg-gray-900 text-gray-400">- Select a Product -</option>
                    <option value="Billing System Integrator" className="bg-gray-900 text-white">Billing System Integrator</option>
                    <option value="Wealth Platform" className="bg-gray-900 text-white">Wealth Platform</option>
                    <option value="Zoho Platform" className="bg-gray-900 text-white">Zoho Platform</option>
                    <option value="Custom Services" className="bg-gray-900 text-white">Custom Services</option>
                  </select>
                </div>
                

              </div>

              <div className="flex flex-col h-full space-y-6">
                <div className="space-y-2 flex-grow flex flex-col">
                  <div className="flex justify-between items-end">
                    <label htmlFor="Description" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                    <span className={`text-xs ${message.length > 200 ? 'text-red-400 font-bold' : 'text-gray-500'}`}>
                      {message.length} / 200
                    </span>
                  </div>
                  <textarea
                    id="Description"
                    name="Description"
                    maxLength={200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-full min-h-[200px] lg:min-h-[280px] bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                    placeholder="Tell us about your project or requirements..."
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p>Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">
                    Security Verification <span className="text-cyan-400">*</span>
                  </label>
                  <div className="bg-black/20 border border-white/10 rounded-xl py-2 px-1 sm:px-4 flex justify-start sm:justify-center overflow-hidden w-full lg:w-fit">
                    <div className="scale-[0.75] min-[360px]:scale-[0.85] min-[400px]:scale-100 origin-left sm:origin-center w-[300px] shrink-0">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey="1x00000000000000000000AA"
                        onSuccess={(token) => setTurnstileToken(token)}
                        options={{
                          theme: 'dark',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end mt-auto">
                  <MagneticButton strength={0.2}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
