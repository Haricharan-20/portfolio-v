import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, ExternalLink, Menu, MoveRight, Plus, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { experience, library, navItems, projects, skills, socials, type Project } from './data'

gsap.registerPlugin(ScrollTrigger)
const MorphScene = lazy(() => import('./components/MorphScene'))

function useMotionSystem(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (reduce) {
        gsap.set(revealEls, { opacity: 1, y: 0, x: 0, rotate: 0 })
        return
      }

      revealEls.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        )
      })

      const hero = gsap.timeline({ defaults: { ease: 'power3.out' } })
      hero
        .from('.hero__topline', { opacity: 0, y: -16, duration: 0.8 })
        .from('.hero__kicker', { opacity: 0, x: -24, duration: 0.6 }, '-=0.35')
        .from('.hero__title-line', { opacity: 0, yPercent: 100, stagger: 0.12, duration: 0.85 }, '-=0.2')
        .from('.hero__signature', { opacity: 0, x: -30, rotate: -7, duration: 0.9 }, '-=0.3')
        .from('.hero__rail, .hero__detail, .hero__keywords', { opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.35')

      gsap.utils.toArray<HTMLElement>('.drive-word').forEach((word, index) => {
        gsap.fromTo(
          word,
          { opacity: 0.18, x: index % 2 ? 24 : -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: { trigger: word, start: 'top 82%', once: true },
          },
        )
      })
    }, root)

    let lenis: Lenis | undefined
    let rafId = 0
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false })
      const onTick = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
      rafId = window.requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => {
        window.cancelAnimationFrame(rafId)
        gsap.ticker.remove(onTick)
        lenis?.destroy()
        context.revert()
      }
    }

    return () => {
      window.cancelAnimationFrame(rafId)
      context.revert()
    }
  }, [root])
}

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-28% 0px -60% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return active
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return progress
}

function Navigation({ active, open, setOpen }: { active: string; open: boolean; setOpen: (value: boolean) => void }) {
  return (
    <header className={`site-nav ${open ? 'site-nav--open' : ''}`}>
      <a className="brand-lockup" href="#home" aria-label="Hari Charan home" onClick={() => setOpen(false)}>
        <span className="brand-mark">HC</span>
        <span className="brand-name">HARI CHARAN</span>
      </a>
      <nav className="site-nav__links" aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <a key={item.href} className={active === item.href.slice(1) ? 'is-active' : ''} href={item.href} onClick={() => setOpen(false)}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="availability"><span className="status-dot" /> Available for opportunities</div>
      <button className="nav-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={17} /> : <Menu size={17} />}
      </button>
    </header>
  )
}

function SectionLabel({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return <div className={`section-label ${dark ? 'section-label--dark' : ''}`}><span>{number}</span><span>{label}</span></div>
}

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="micro-mark"><span className="micro-mark__line" />{children}</span>
}

function Hero() {
  return (
    <section className="hero" id="home" data-section>
      <video className="hero__media" autoPlay loop muted playsInline preload="metadata" poster="/assets/hero-poster.jpg" aria-label="Abstract motion texture from the portfolio artwork">
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__wash" />
      <div className="hero__grid" />
      <div className="hero__topline">
        <span>PORTFOLIO / 2025—26</span>
        <span>IND / 01—04</span>
      </div>
      <div className="hero__content">
        <div className="hero__kicker micro-copy">CYBERSECURITY <b>//</b> AI AUTOMATION<br /><span>BUILDING TOOLS <b>//</b> BREAKING SYSTEMS <b>//</b> EXPLORING IDEAS</span></div>
        <div className="hero__title-wrap">
          <h1 className="hero__title" aria-label="Hari Charan">
            <span className="hero__title-line">HARI</span>
            <span className="hero__title-line hero__title-line--cream">CHARAN</span>
          </h1>
          <div className="hero__signature">Hari Charan</div>
        </div>
        <div className="hero__meta">01 / 04 <span>SCROLL TO EXPLORE</span><ArrowDownRight size={18} /></div>
      </div>
      <div className="hero__keywords" aria-label="Focus areas">
        {['BUILD', 'EXPLORE', 'LEARN', 'BREAK', 'AUTOMATE'].map((word) => <span key={word}>{word}</span>)}
      </div>
      <div className="hero__rail" aria-hidden="true">
        <div className="hero__rail-card hero__rail-card--one"><img src="/assets/portrait-main.jpg" alt="" /><span>01<br />/ 04</span></div>
        <div className="hero__rail-card hero__rail-card--two"><img src="/assets/portrait-detail.jpg" alt="" /><span>02<br />/ 04</span></div>
        <div className="hero__rail-card hero__rail-card--three"><img src="/assets/portrait-contact.jpg" alt="" /><span>03<br />/ 04</span></div>
        <div className="hero__rail-rule" />
      </div>
      <div className="hero__detail"><img src="/assets/portrait-detail.jpg" alt="Close portrait detail" /><span>DETAIL / 02</span></div>
      <div className="hero__aside-note"><span>01</span><p>A quieter mind<br />A louder vision.</p></div>
      <div className="crosshair crosshair--hero" /><span className="hero__corner-mark">＋</span>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about section-paper" id="about" data-section>
      <SectionLabel number="02" label="About me" />
      <div className="about__layout">
        <div className="about__copy" data-reveal>
          <p className="eyebrow">A CURIOUS MIND // ALWAYS EVOLVING</p>
          <h2>ABOUT <em>ME</em></h2>
          <p className="about__lede">A curious learner who enjoys building, exploring, and solving real-world problems through technology. Focused on cybersecurity, automation, and creating practical tools.</p>
          <a className="pill-button" href="#contact">More about me <ArrowUpRight size={14} /></a>
          <div className="annotation">curious<br />builder<br />learner</div>
        </div>
        <div className="about__portrait" data-reveal>
          <div className="portrait-frame"><img src="/assets/portrait-about.jpg" alt="Hari Charan in a black and white portrait crop" /></div>
          <span className="portrait-caption">IMAGE / STUDY 02</span>
        </div>
        <div className="about__side" data-reveal>
          <span className="about__side-number">03</span>
          <p>Learning style<br />and evolving</p>
          <div className="vertical-rule" />
          <span className="about__side-arrow">↓</span>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(true), { threshold: 0.22 })
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section className="skills section-paper" id="skills" data-section ref={sectionRef}>
      <SectionLabel number="03" label="Skills" />
      <div className="skills__intro" data-reveal>
        <p className="eyebrow">TOOLS I USE // PATTERNS I TRUST</p>
        <h2>SKILLS</h2>
        <p className="skills__intro-copy">A practical stack for turning curious questions into working systems — from scripts and signals to the human details around them.</p>
      </div>
      <div className={`skills__grid ${active ? 'is-active' : ''}`} data-reveal>
        {skills.map((skill, index) => (
          <div className="skill-row" key={skill.name}>
            <div className="skill-row__label"><span className="skill-row__icon">{['⌘', '↗', '◉', '◌', '⌁', '✳', '◍', '✣'][index]}</span><span>{skill.name}</span></div>
            <div className="skill-row__track"><span className="skill-row__bar" style={{ '--skill': `${skill.value}%` } as React.CSSProperties} /></div>
            <div className="skill-row__value">{skill.value}%</div>
            <div className="skill-row__note">{skill.note}</div>
          </div>
        ))}
      </div>
      <div className="skills__stamp">LEARNING<br />STILL<br />EVOLVING<br /><span>///</span></div>
    </section>
  )
}

function ProjectRow({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="project-row" data-reveal style={{ '--project-accent': project.accent } as React.CSSProperties}>
      <div className="project-row__number">{project.number}</div>
      <div className="project-row__image"><img src={project.image} alt={`${project.title} visual`} loading="lazy" /><span className="project-row__image-tag">VISUAL / {project.number}</span></div>
      <div className="project-row__body">
        <div className="project-row__title-wrap"><h3>{project.title}</h3><span className="project-row__arrow"><ExternalLink size={18} /></span></div>
        <p className="project-row__subtitle">{project.subtitle}</p>
        <p className="project-row__description">{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <button className="text-button" type="button" onClick={() => onOpen(project)}>View project <MoveRight size={16} /></button>
      </div>
      <button className="project-row__open" type="button" aria-label={`Open ${project.title} details`} onClick={() => onOpen(project)}><ArrowUpRight size={18} /></button>
    </article>
  )
}

function ProjectsSection({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section className="projects section-ink" id="projects" data-section>
      <SectionLabel number="04" label="Projects" dark />
      <div className="projects__header" data-reveal><h2>IDEAS <span>→</span> TOOLS <span>→</span> REAL IMPACT</h2><span className="projects__count">03 / 03</span></div>
      <div className="projects__list">{projects.map((project) => <ProjectRow key={project.number} project={project} onOpen={onOpen} />)}</div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="experience section-paper" id="experience" data-section>
      <SectionLabel number="05" label="Experience" />
      <div className="experience__layout">
        <div className="experience__intro" data-reveal><h2>EXPERIENCE</h2><p>Not a straight line. A collection of questions, systems, and experiments that keep moving.</p></div>
        <div className="experience__timeline" data-reveal>
          {experience.map((item, index) => <div className="experience__item" key={item.title}><span className="experience__dot" /><div className="experience__title"><strong>{item.title}</strong><span>{item.date}</span></div><p>{item.description}</p><span className="experience__index">0{index + 1}</span></div>)}
        </div>
        <div className="experience__portrait" data-reveal><img src="/assets/portrait-contact.jpg" alt="Hari Charan sitting in a portrait crop" /><div className="experience__portrait-note">EXPLORE<br />EXPERIMENT<br />LEARN<br />IMPROVE</div></div>
      </div>
    </section>
  )
}

function BreakingSection() {
  return (
    <section className="breaking section-ink" id="breaking" data-section>
      <SectionLabel number="06" label="Breaking things" dark />
      <div className="breaking__layout">
        <div className="breaking__copy" data-reveal><p className="eyebrow eyebrow--light">A PERSONAL OPERATING SYSTEM</p><h2>I LIKE <em>BREAKING THINGS,</em><br /> LEARNING THEM.</h2><div className="breaking__cards">{['Curiosity', 'Persistence', 'Deeper understanding', 'Better tools'].map((card) => <span key={card}>{card}<ArrowUpRight size={14} /></span>)}</div></div>
        <div className="breaking__visual" data-reveal><Suspense fallback={<div className="morph-scene morph-scene--fallback" />}><MorphScene /></Suspense><div className="shard shard--one" /><div className="shard shard--two" /><div className="shard shard--three" /></div>
      </div>
    </section>
  )
}

function DrivesSection() {
  return (
    <section className="drives section-paper" id="drives" data-section>
      <SectionLabel number="07" label="What drives me" />
      <div className="drives__layout">
        <div className="drives__copy" data-reveal><p className="eyebrow">THE QUESTIONS BEHIND THE WORK</p><h2>WHAT DRIVES <em>ME</em></h2><p className="drives__statement"><span className="drive-word">I like</span> <span className="drive-word">breaking things,</span> <span className="drive-word">learning them,</span> <span className="drive-word">and building</span> <span className="drive-word">better tools.</span></p><a className="pill-button pill-button--dark" href="#contact">See my library <ArrowUpRight size={14} /></a></div>
        <div className="library-strip" data-reveal aria-label="Personal visual library">
          {library.map((book) => <div className={`book-card book-card--${book.tone}`} key={book.title}><img src={book.image} alt="" loading="lazy" /><div className="book-card__copy"><strong>{book.title}</strong><span>{book.author}</span></div></div>)}
          <div className="library-note">GOOD<br />BOOKS<br />DEEPER<br />THINKING<br /><span>///</span></div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact section-ink" id="contact" data-section>
      <SectionLabel number="08" label="Let's connect" dark />
      <div className="contact__layout">
        <div className="contact__copy" data-reveal><p className="eyebrow eyebrow--light">OPEN TO THE NEXT QUESTION</p><h2>LET'S <em>CONNECT</em></h2><p>Open to collaboration, internships, projects, and exciting opportunities.</p><a className="pill-button pill-button--light" href="mailto:haricharan@example.com">Get in touch <ArrowUpRight size={14} /></a></div>
        <div className="contact__socials" data-reveal>{socials.map((social) => <a href={social.href} key={social.label} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined}><span>{social.mark}</span>{social.label}<ArrowUpRight size={14} /></a>)}</div>
        <div className="contact__portrait" data-reveal><img src="/assets/portrait-contact.jpg" alt="Portrait of Hari Charan" loading="lazy" /><div className="contact__portrait-note">IDEAS<br />DISCUSSIONS<br />OPPORTUNITIES<br />ALWAYS OPEN<br /><span>///</span></div></div>
      </div>
      <footer className="site-footer"><span>HC / HARI CHARAN</span><span>CYBERSECURITY // AI AUTOMATION</span><span>© 2025—26</span></footer>
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])
  if (!project) return null
  return <div className="project-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="project-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button className="project-modal__close" type="button" aria-label="Close project details" onClick={onClose}><X size={18} /></button><div className="project-modal__image"><img src={project.image} alt="" /></div><div className="project-modal__content"><span className="eyebrow">PROJECT / {project.number}</span><h2 id="project-modal-title">{project.title}</h2><p>{project.description}</p><div className="modal-checklist">{['Designed for safe learning', 'Modular and extensible', 'Built with a systems mindset'].map((item) => <span key={item}><Check size={13} />{item}</span>)}</div><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></div>
}

export default function App() {
  const root = useRef<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const active = useActiveSection()
  const progress = useScrollProgress()
  useMotionSystem(root)
  return <main ref={root} className="app-shell"><div className="grain" /><div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} /><Navigation active={active} open={menuOpen} setOpen={setMenuOpen} /><Hero /><AboutSection /><SkillsSection /><ProjectsSection onOpen={setActiveProject} /><ExperienceSection /><BreakingSection /><DrivesSection /><ContactSection /><ProjectModal project={activeProject} onClose={() => setActiveProject(null)} /></main>
}
