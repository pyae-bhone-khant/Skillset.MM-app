'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      category: "GENERAL",
      question: "Is SkillHub MM really 100% free?",
      answer: "Yes, absolutely! SkillHub MM is a non-profit, community-driven platform dedicated to connecting passionate mentors with eager learners in Myanmar. There are no hidden fees, subscriptions, or paywalls."
    },
    {
      category: "FOR STUDENTS",
      question: "Are there any time limits for completing the courses?",
      answer: "Not at all. You can learn at your own pace. All video chapters are accessible 24/7, allowing you to study whenever and wherever it is convenient for you."
    },
    {
      category: "FOR TEACHERS",
      question: "What qualifications do I need to apply?",
      answer: "We welcome experts from all fields—IT, Languages, Cooking, or Art. As long as you have a clear profile and a desire to share your knowledge, you are welcome to apply."
    },
    {
      category: "ADMIN & SAFETY",
      question: "How long does it take for account approval?",
      answer: "Our admin team reviews applications within 24 hours. Once your profile complies with our guidelines, you will be upgraded to the Teacher role."
    }
  ];

  return (
    // 'mx-auto' keeps the block centered, 'max-w-3xl' prevents it from taking full screen width
    <div className="max-w-3xl  mt-10 mb-20 mx-auto py-8 px-4">
      
      {/* Centered Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-2 text-blue-500 mb-4">
          <HelpCircle size={20} />
          <span className="text-sm font-medium tracking-wide uppercase">Support Center</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Everything you need to know about SkillHub MM. Can’t find the answer you’re looking for? Reach out to our team.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="border border-slate-800/60 bg-[#05051a]/40 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left group hover:bg-slate-800/20 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 tracking-widest">
                  {faq.category}
                </span>
                <span className="text-base font-medium text-slate-200">
                  {faq.question}
                </span>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180 text-blue-400' : ''}`} 
              />
            </button>

            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <p className="overflow-hidden text-slate-400 leading-relaxed px-5 pb-5 text-sm">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}