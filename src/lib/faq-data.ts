export interface FaqItem {
  question: string;
  answer: string;
}

export const commonFaqs: FaqItem[] = [
  {
    question: 'Can you handle both software development and hardware support?',
    answer: 'Yes. We build and maintain software while also supporting devices, networks, and workstation reliability.',
  },
  {
    question: 'What software projects do you usually build?',
    answer: 'We deliver websites, internal dashboards, automation tools, and custom web applications.',
  },
  {
    question: 'Do you offer monthly support plans?',
    answer: 'Yes. We provide support plans covering bug fixes, updates, monitoring, and hardware incident response.',
  },
];
