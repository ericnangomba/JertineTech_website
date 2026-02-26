import type { LucideIcon } from 'lucide-react';
import { Brain, Code2, Cpu, ServerCog, ShieldCheck, Waypoints } from 'lucide-react';

export interface ServiceDefinition {
  slug: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  outcome: string;
  overview: string;
  deliverables: string[];
  idealFor: string[];
  timeline: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  caseStudies: {
    title: string;
    clientProfile: string;
    challenge: string;
    approach: string;
    impact: string[];
  }[];
}

export const services: ServiceDefinition[] = [
  {
    slug: 'software',
    icon: Code2,
    title: 'Software Development',
    summary: 'Custom websites, internal tools, and web apps engineered for reliability and speed.',
    outcome: 'Launch software faster with clean architecture and maintainable code.',
    overview:
      'We design and build production-ready software tailored to your operations, with a focus on reliability, maintainability, and measurable business outcomes.',
    deliverables: [
      'Requirements and technical scope',
      'UX-aware front-end implementation',
      'Secure API and data integrations',
      'Deployment-ready CI/CD workflow',
    ],
    idealFor: ['Operations platforms', 'Client portals', 'Internal dashboards'],
    timeline: 'Typical initial delivery: 4-10 weeks',
    seoTitle: 'Software Development Services for SMEs | Jertine Tech',
    seoDescription:
      'Custom software development for SMEs: internal tools, client portals, and web apps designed for reliability, speed, and measurable business outcomes.',
    seoKeywords: [
      'software development services',
      'custom web app development',
      'SME software partner',
      'internal tools development',
      'South Africa software development',
    ],
    caseStudies: [
      {
        title: 'Operations Portal Rebuild',
        clientProfile: 'Mid-size logistics operator',
        challenge: 'Legacy portal workflows caused delayed dispatch visibility and high manual admin effort.',
        approach:
          'Rebuilt the operations portal with role-based views, status automation, and integrated reporting.',
        impact: ['Dispatch visibility improved across shifts', 'Admin effort reduced by approximately 35%', 'Faster issue escalation and resolution'],
      },
    ],
  },
  {
    slug: 'hardware',
    icon: Cpu,
    title: 'Hardware Support',
    summary: 'Desktop diagnostics, component upgrades, network setup, and onsite IT troubleshooting.',
    outcome: 'Less downtime, stable workstations, and smoother team operations.',
    overview:
      'We stabilize business-critical hardware environments with structured diagnostics, proactive maintenance, and practical issue resolution.',
    deliverables: [
      'Endpoint diagnostics and recovery',
      'Device upgrades and replacement planning',
      'Network and connectivity troubleshooting',
      'Onsite and remote support runbooks',
    ],
    idealFor: ['Office endpoints', 'Business networks', 'Distributed teams'],
    timeline: 'Support activation: 2-5 business days',
    seoTitle: 'Business Hardware Support Services | Jertine Tech',
    seoDescription:
      'Business hardware support for SMEs including diagnostics, upgrades, network troubleshooting, and onsite/remote IT response.',
    seoKeywords: [
      'hardware support services',
      'business IT support',
      'desktop and network troubleshooting',
      'onsite IT support',
      'SME hardware support',
    ],
    caseStudies: [
      {
        title: 'Endpoint Stability Program',
        clientProfile: 'Healthcare supply business',
        challenge: 'Frequent endpoint failures and connectivity issues disrupted daily operations.',
        approach:
          'Introduced proactive diagnostics, standardized device profiles, and rapid-response support procedures.',
        impact: ['Reduced recurring endpoint incidents', 'Improved workstation reliability across teams', 'Lower downtime during peak operational windows'],
      },
    ],
  },
  {
    slug: 'infrastructure',
    icon: ServerCog,
    title: 'Managed Infrastructure',
    summary: 'Server, cloud, backup, and device management with proactive monitoring and support.',
    outcome: 'Predictable uptime and secure day-to-day business continuity.',
    overview:
      'We operate and harden infrastructure that your team depends on, with monitoring, backup discipline, and service continuity controls.',
    deliverables: [
      'Cloud/server baseline configuration',
      'Monitoring and alerting coverage',
      'Backup, restore, and recovery validation',
      'Operational documentation and handover',
    ],
    idealFor: ['Growing SMEs', 'Multi-site operations', 'Business-critical uptime'],
    timeline: 'Initial setup and hardening: 2-6 weeks',
    seoTitle: 'Managed Infrastructure Services | Jertine Tech',
    seoDescription:
      'Managed infrastructure services for SMEs: cloud/server management, monitoring, backup validation, and operational reliability.',
    seoKeywords: [
      'managed infrastructure services',
      'SME cloud management',
      'server monitoring and backup',
      'business continuity infrastructure',
      'IT infrastructure support',
    ],
    caseStudies: [
      {
        title: 'Business Continuity Hardening',
        clientProfile: 'Engineering services firm',
        challenge: 'Limited monitoring and weak backup confidence created continuity risk.',
        approach:
          'Implemented alerting coverage, backup verification cycles, and recovery test procedures.',
        impact: ['Clearer visibility into system health', 'Validated recovery confidence', 'Improved uptime discipline for core systems'],
      },
    ],
  },
  {
    slug: 'ai-automation',
    icon: Brain,
    title: 'AI Automation',
    summary: 'Integrate AI into workflows for support, data handling, and repeatable task automation.',
    outcome: 'Reduce manual effort and increase service response quality.',
    overview:
      'We implement practical AI automations that remove repetitive work, improve response speed, and integrate into existing operations.',
    deliverables: [
      'Use-case discovery and prioritization',
      'Workflow automation design',
      'Model integration and safeguards',
      'Performance tracking and iteration',
    ],
    idealFor: ['Support teams', 'Operations workflows', 'Data-heavy tasks'],
    timeline: 'Pilot implementation: 2-4 weeks',
    seoTitle: 'AI Automation Services for Operations | Jertine Tech',
    seoDescription:
      'AI automation services for SMEs to reduce repetitive work, accelerate response times, and improve operational consistency.',
    seoKeywords: [
      'AI automation services',
      'workflow automation for SMEs',
      'business AI implementation',
      'support process automation',
      'AI operations partner',
    ],
    caseStudies: [
      {
        title: 'Support Triage Automation',
        clientProfile: 'Professional services team',
        challenge: 'Manual triage slowed first-response times for inbound service requests.',
        approach:
          'Designed AI-assisted intake and categorization workflow with review checkpoints and escalation logic.',
        impact: ['Faster initial routing of requests', 'Improved response consistency', 'More support time available for high-value cases'],
      },
    ],
  },
  {
    slug: 'support-maintenance',
    icon: ShieldCheck,
    title: 'Support & Maintenance',
    summary: 'Ongoing fixes, updates, performance tuning, and incident response for software and hardware.',
    outcome: 'A dependable stack that keeps improving after launch.',
    overview:
      'We provide structured ongoing support with defined response windows, incident handling, and continuous optimization.',
    deliverables: [
      'SLA-based support operations',
      'Scheduled maintenance cycles',
      'Performance and security tuning',
      'Issue trend analysis and prevention',
    ],
    idealFor: ['Post-launch products', 'Live business systems', 'Long-term reliability'],
    timeline: 'Monthly support cycles with ongoing improvements',
    seoTitle: 'Support and Maintenance Services | Jertine Tech',
    seoDescription:
      'Ongoing support and maintenance for business software and hardware with SLA response, optimization, and preventive actions.',
    seoKeywords: [
      'support and maintenance services',
      'SLA IT support',
      'software maintenance partner',
      'incident response services',
      'SME technology support',
    ],
    caseStudies: [
      {
        title: 'Post-Launch Reliability Program',
        clientProfile: 'SME digital operations team',
        challenge: 'Unstructured maintenance led to repeated incidents and reactive firefighting.',
        approach:
          'Established SLA support cadence, maintenance windows, and issue trend reviews.',
        impact: ['Fewer repeated incidents over time', 'More predictable support response', 'Steady improvement in platform stability'],
      },
    ],
  },
  {
    slug: 'digital-strategy',
    icon: Waypoints,
    title: 'Digital Strategy',
    summary: 'Practical roadmaps that connect business goals to software and infrastructure decisions.',
    outcome: 'Make investment decisions with clear technical and commercial direction.',
    overview:
      'We translate business priorities into actionable technical plans, reducing wasted spend and speeding up decision-making.',
    deliverables: [
      'Current-state technical assessment',
      'Priority roadmap and sequencing',
      'Risk and dependency mapping',
      'Delivery governance framework',
    ],
    idealFor: ['Leadership teams', 'Transformation initiatives', 'Scaling SMEs'],
    timeline: 'Strategy package: 1-3 weeks',
    seoTitle: 'Digital Strategy Services for SMEs | Jertine Tech',
    seoDescription:
      'Digital strategy services that align business goals to technical roadmaps, reducing risk and improving investment decisions.',
    seoKeywords: [
      'digital strategy services',
      'technology roadmap consulting',
      'SME digital transformation strategy',
      'IT strategy advisory',
      'business technology planning',
    ],
    caseStudies: [
      {
        title: 'Roadmap and Governance Reset',
        clientProfile: 'Scaling multi-team SME',
        challenge: 'Competing priorities and unclear sequencing delayed execution.',
        approach:
          'Delivered a phased roadmap with dependency mapping and governance checkpoints.',
        impact: ['Clearer delivery prioritization', 'Better alignment between business and technical teams', 'Reduced execution risk on major initiatives'],
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((service) => service.slug === slug);
}
