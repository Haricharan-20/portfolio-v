export type Project = {
  number: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  image: string
  accent: string
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'What drives me', href: '#drives' },
  { label: 'Contact', href: '#contact' },
]

export const skills = [
  { name: 'Python', value: 85, note: 'automation / tooling' },
  { name: 'Scripting', value: 80, note: 'repeatable systems' },
  { name: 'Intrusion Detection & SIEM', value: 75, note: 'signals / response' },
  { name: 'Frameworks & Compliance', value: 70, note: 'structure / trust' },
  { name: 'Operating Systems & Networking', value: 80, note: 'under the hood' },
  { name: 'Analytical Thinking', value: 85, note: 'patterns / pressure' },
  { name: 'Communication', value: 75, note: 'clear is useful' },
  { name: 'AI Automation', value: 78, note: 'human + machine' },
]

export const projects: Project[] = [
  {
    number: '01',
    title: 'Malware Simulator',
    subtitle: 'safe infection / detection lab',
    description:
      'An interactive malware lifecycle simulator to understand how malware works in a safe environment. Visualize infection flow, behaviors, persistence, and detection techniques.',
    tags: ['Python', 'Scripting', 'Security', 'Simulation'],
    image: '/assets/project-malware.jpg',
    accent: '#d64f38',
  },
  {
    number: '02',
    title: 'LEAF',
    subtitle: 'Layered Exploration & Analysis Framework',
    description:
      'A modular framework for exploration, analysis, and security research. Supports plugins, experiments, data storage, and CLI tools.',
    tags: ['Python', 'Modular', 'Research', 'CLI'],
    image: '/assets/project-leaf.jpg',
    accent: '#5d7d54',
  },
  {
    number: '03',
    title: 'MiniBurpSuite',
    subtitle: 'web traffic / education / tooling',
    description:
      'A lightweight web security testing proxy inspired by Burp Suite, designed for traffic interception, request/response analysis, and educational security testing.',
    tags: ['Python', 'Proxy', 'Web Security', 'Tooling'],
    image: '/assets/project-proxy.jpg',
    accent: '#d88b39',
  },
]

export const experience = [
  {
    date: '2023 — Present',
    title: 'Student / Self Learner',
    description: 'Learning cybersecurity, automation, and building practical tools and projects.',
  },
  {
    date: '2023 — Present',
    title: 'Projects & Labs',
    description: 'Hands-on experience with malware analysis, web security, network monitoring, and SIEM.',
  },
  {
    date: '2024 — Present',
    title: 'Open Source / Community',
    description: 'Contributing to tools, learning from communities, and collaborating on ideas.',
  },
]

export const library = [
  { title: 'Atomic Habits', author: 'James Clear', image: '/assets/library-01.jpg', tone: 'cream', href: 'https://www.google.com/search?tbm=bks&q=Atomic+Habits+James+Clear' },
  { title: 'Deep Work', author: 'Cal Newport', image: '/assets/library-02.jpg', tone: 'rust', href: 'https://www.google.com/search?tbm=bks&q=Deep+Work+Cal+Newport' },
  { title: 'Psychology of Money', author: 'Morgan Housel', image: '/assets/library-03.jpg', tone: 'sand', href: 'https://www.google.com/search?tbm=bks&q=Psychology+of+Money+Morgan+Housel' },
  { title: 'Clean Code', author: 'Robert C. Martin', image: '/assets/library-04.jpg', tone: 'ink', href: 'https://www.google.com/search?tbm=bks&q=Clean+Code+Robert+C+Martin' },
  { title: 'Lord of Mysteries', author: 'Cuttlefish That Loves Diving', image: '/assets/book-lord-of-mysteries.jpg', tone: 'lotm', href: 'https://www.google.com/search?tbm=bks&q=Lord+of+Mysteries+Cuttlefish+That+Loves+Diving' },
]

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Haricharan-20', mark: 'GH' },
  { label: 'Instagram', href: 'https://www.instagram.com/hari_charan_20/', mark: 'IG' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/v-hari-charan-1aba93398', mark: 'IN' },
  { label: 'Gmail', href: 'mailto:haricharan9845@gmail.com', mark: '@' },
  { label: 'X', href: 'https://x.com/Hari_charan_20', mark: 'X' },
]
