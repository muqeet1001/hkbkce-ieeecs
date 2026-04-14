export const events = [
  {
    id: '01',
    slug: 'ai-ignite-hackathon',
    title: 'AI Ignite',
    category: 'Hackathon',
    status: 'upcoming',
    color: '#BFCCD8',
    textColor: '#0E0E0E',
    date: 'April 15-16, 2026',
    location: 'CSE Seminar Hall, HKBK College of Engineering',
    description:
      'A 24-hour AI-focused hackathon where student teams build practical solutions across machine learning, NLP, automation, and creative AI.',
    fullDescription:
      'AI Ignite is the flagship technical experience of the chapter, designed to bring students, mentors, and problem-solvers together for an intensive build sprint. Participants will move from idea to prototype through guided mentoring, rapid feedback, and collaborative development.',
    poster: '/ai-ignite-banner.jpeg',
    website: 'https://ieee-hackthone.vercel.app/',
    highlights: [
      '24-hour collaborative hackathon format',
      'Mentor support for ideation, design, and deployment',
      'Tracks covering machine learning, computer vision, and NLP',
      'Showcase presentations with prizes and recognition',
    ],
  },
  {
    id: '02',
    slug: 'oracle-centre-inauguration',
    title: 'Oracle Centre',
    category: 'Inauguration',
    status: 'completed',
    color: '#798E7B',
    textColor: '#F1EFEB',
    date: 'March 26, 2026',
    location: 'HKBK College of Engineering, Bengaluru',
    description:
      'The Oracle Centre of Excellence was inaugurated to open new pathways in cloud, enterprise systems, and industry-driven learning.',
    fullDescription:
      'The inauguration of the Oracle Centre of Excellence marked a major milestone for the campus technology ecosystem. The initiative strengthens the bridge between academic learning and enterprise-ready skills by creating opportunities for hands-on exposure, workshops, and future collaborations.',
    poster: null,
    highlights: [
      'Launch of an industry-aligned innovation space',
      'Focus on cloud, databases, and enterprise technologies',
      'Expanded learning opportunities for chapter members',
      'A strong platform for future workshops and collaborations',
    ],
  },
  {
    id: '03',
    slug: 'ieee-cs-chapter-launch',
    title: 'Chapter Launch',
    category: 'Announcement',
    status: 'completed',
    color: '#E49366',
    textColor: '#0E0E0E',
    date: 'February 2026',
    location: 'HKBK College of Engineering, Bengaluru',
    description:
      'The official launch of the IEEE Computer Society Student Chapter at HKBK, connecting students to a global network of innovation.',
    fullDescription:
      'The chapter launch introduced a new platform for students to learn, build, and grow together under the IEEE Computer Society banner. It set the foundation for workshops, technical events, mentoring, and a stronger computing culture on campus.',
    poster: null,
    highlights: [
      'Official beginning of the IEEE CS chapter at HKBK',
      'Student community built around learning and leadership',
      'Access to IEEE-aligned opportunities and networks',
      'Foundation for future chapter events and programs',
    ],
  },
];

export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug);
}
