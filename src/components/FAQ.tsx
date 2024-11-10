import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Terminal, HelpCircle } from 'lucide-react';
import SectionContainer from './common/SectionContainer';
import SectionTitle from './common/SectionTitle';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does GitOps improve deployment reliability?",
      answer: "GitOps uses Git as the single source of truth for declarative infrastructure and applications. This ensures consistent, repeatable deployments with automated drift detection and reconciliation, resulting in 99.99% deployment reliability."
    },
    {
      question: "What security measures are implemented?",
      answer: "We implement a comprehensive security framework including zero-trust architecture, automated RBAC, encrypted GitOps workflows, and continuous security scanning. All changes are version-controlled and audit-logged."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timeline varies based on your infrastructure complexity. Typically, initial setup takes 2-4 weeks, with full transformation completed within 2-3 months, ensuring minimal disruption to operations."
    },
    {
      question: "What cloud platforms do you support?",
      answer: "We support all major cloud providers (AWS, Azure, GCP) and can implement hybrid or multi-cloud solutions. Our platform-agnostic approach ensures consistent operations across any infrastructure."
    }
  ];

  return (
    <SectionContainer 
      id="faq"
      ariaLabelledBy="faq-title"
    >
      <SectionTitle
        id="faq-title"
        title="Frequently Asked Questions"
        description="Get answers to common questions about our GitOps solutions and implementation process"
        icon={HelpCircle}
      />

      <div 
        className="max-w-3xl mx-auto space-y-4"
        role="list"
        aria-label="FAQ items"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index} 
            className="glass-card rounded-lg overflow-hidden relative z-10"
            initial={false}
            role="listitem"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:text-gold-400 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <div className="flex items-center space-x-4">
                <Terminal 
                  className="h-5 w-5 text-gold-400"
                  aria-hidden="true"
                />
                <span className="font-semibold text-lg">{faq.question}</span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <ChevronDown className="h-5 w-5 text-gold-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-6 pb-4">
                    <div 
                      className="h-px w-full bg-slate-700/50 mb-4"
                      aria-hidden="true"
                    />
                    <div className="text-slate-300 leading-relaxed pl-9">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}