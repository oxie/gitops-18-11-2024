import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Shield, Workflow, Cloud, Lock, Terminal, Rocket } from 'lucide-react';
import SectionContainer from './common/SectionContainer';
import SectionTitle from './common/SectionTitle';

const BenefitFeature = memo(function BenefitFeature({ feature }: { feature: string }) {
  return (
    <div className="flex items-center text-sm text-slate-400" role="listitem">
      <Terminal 
        className="h-4 w-4 mr-2 text-gold-400" 
        aria-hidden="true"
      />
      <span>{feature}</span>
    </div>
  );
});

const BenefitCard = memo(function BenefitCard({
  benefit,
  index
}: {
  benefit: typeof benefits[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative z-10"
      role="article"
      aria-labelledby={`benefit-title-${index}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
        aria-hidden="true"
      />
      
      <div className="relative h-full p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-gold-500/50 transition-all duration-300 flex flex-col">
        <div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 mb-6 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <div className="text-gold-400">{benefit.icon}</div>
        </div>

        <h3 
          id={`benefit-title-${index}`}
          className="text-xl font-bold mb-4 min-h-[56px] flex items-center"
        >
          {benefit.title}
        </h3>

        <p className="text-slate-300 mb-6 min-h-[80px]">
          {benefit.description}
        </p>

        <div 
          className="space-y-3 mt-auto"
          role="list"
          aria-label={`Features of ${benefit.title}`}
        >
          {benefit.features.map((feature) => (
            <BenefitFeature key={feature} feature={feature} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const benefits = [
  {
    icon: <GitBranch className="h-8 w-8" aria-hidden="true" />,
    title: "Production Excellence",
    description: "Leverage proven open source tools like FluxCD, Crossplane, and Backstage for robust, scalable infrastructure",
    features: ["Version Control", "Zero Drift", "Instant Rollbacks"]
  },
  {
    icon: <Lock className="h-8 w-8" aria-hidden="true" />,
    title: "Security & Compliance",
    description: "Military-grade security with automated compliance and continuous monitoring",
    features: ["SOC2 Compliant", "Zero-Trust", "RBAC Enabled"]
  },
  {
    icon: <Cloud className="h-8 w-8" aria-hidden="true" />,
    title: "Cloud Native",
    description: "Built for modern cloud infrastructure with multi-cloud support",
    features: ["Multi-Cloud", "Auto-Scaling", "High Availability"]
  },
  {
    icon: <Workflow className="h-8 w-8" aria-hidden="true" />,
    title: "Automated Operations",
    description: "End-to-end automation with self-healing systems and continuous delivery",
    features: ["99.99% Uptime", "24/7 Operations", "Auto Recovery"]
  }
] as const;

function Benefits() {
  return (
    <SectionContainer 
      id="benefits"
      ariaLabelledBy="benefits-title"
    >
      <SectionTitle
        id="benefits-title"
        title="Why Choose GitOps/NOW"
        description="Experience the future of infrastructure management with our platform"
        icon={Rocket}
      />

      <div 
        className="grid md:grid-cols-4 gap-8"
        role="list"
        aria-label="Key benefits"
      >
        {benefits.map((benefit, index) => (
          <BenefitCard 
            key={benefit.title}
            benefit={benefit}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
}

export default memo(Benefits);