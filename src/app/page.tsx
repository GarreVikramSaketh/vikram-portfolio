"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

const SKILLS = {
  "Languages": ["Python", "C++", "C"],
  "Frontend": ["React", "HTML", "CSS"],
  "Backend": ["Node.js"],
  "Databases": ["MySQL", "MongoDB"],
  "ML / AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
  "Cloud & Tools": ["AWS EC2", "S3", "CloudWatch", "Git", "GitHub"],
};

const EXPERIENCES = [
  {
    company: "Infosys Springboard",
    role: "RideWise Project",
    period: "Nov 2025 – Jan 2026",
    color: "#63b3ed",
    points: [
      "Built a real-time bike reservation system with availability tracking and seamless booking.",
      "Developed ML models (linear regression & gradient boosting) for rental demand forecasting.",
      "Optimised system for real-time updates ensuring smooth, concurrent user experience.",
    ],
  },
  {
    company: "Unistem Sales & Marketing LLP",
    role: "Full Stack Developer",
    period: "Feb 2025 – May 2025",
    color: "#f6ad55",
    points: [
      "Built a full stack app managing employees, inventory, and orders with React, Node.js, MySQL.",
      "Designed RESTful APIs and normalised database schema for efficient data retrieval.",
      "Analysed customer data to surface buying behaviour insights for business decisions.",
    ],
  },
  {
    company: "AWS Cloud Architecture",
    role: "Virtual Internship",
    period: "Jul 2024 – Sep 2024",
    color: "#68d391",
    points: [
      "Designed scalable applications with AWS services: EC2, S3, RDS.",
      "Learned deployment pipelines and cloud architecture best practices.",
      "Gained hands-on exposure to secure, reliable cloud-based system design.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Diabetic Retinopathy Detection",
    desc: "Deep learning model using retinal images + clinical data for early disease detection. Ensemble of EfficientNet, DenseNet, ConvNeXt. Evaluated with accuracy, F1, AUC.",
    tags: ["PyTorch", "EfficientNet", "DenseNet", "Computer Vision"],
    color: "#63b3ed",
    icon: "🔬",
  },
  {
    title: "Brain Tumor Detection",
    desc: "CNN model classifying MRI images into tumor/non-tumor. Applied preprocessing (resize, normalize) for improved model performance on medical imagery.",
    tags: ["TensorFlow", "CNN", "MRI Analysis", "Medical AI"],
    color: "#f6ad55",
    icon: "🧠",
  },
  {
    title: "Customer Segmentation",
    desc: "Clustering techniques to group customers by spending & purchase patterns. Identified high-value vs low-engagement segments for targeted marketing.",
    tags: ["Scikit-learn", "K-Means", "Pandas", "Analytics"],
    color: "#68d391",
    icon: "📊",
  },
  {
    title: "Unistem Full Stack DBMS",
    desc: "Web app managing company data: employees, stock, orders. Full CRUD with React frontend and MySQL backend, optimised for business workflows.",
    tags: ["React", "Node.js", "MySQL", "REST API"],
    color: "#b794f4",
    icon: "🏗️",
  },
  {
    title: "Stock Market Analysis",
    desc: "Analysed historical stock data to identify price trends. Built ML prediction models to support data-driven investment decision-making.",
    tags: ["Python", "Pandas", "Matplotlib", "ML"],
    color: "#fc8181",
    icon: "📈",
  },
];

const CERTS = [
  { name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services", color: "#f6ad55" },
  { name: "AWS Certified AI Practitioner", org: "Amazon Web Services", color: "#f6ad55" },
  { name: "AWS Certified Developer – Associate", org: "Amazon Web Services", color: "#f6ad55" },
  { name: "Oracle Cloud Infrastructure 2024 Foundations Associate", org: "Oracle", color: "#fc8181" },
  { name: "SAP Certified Generative AI Developer", org: "SAP", color: "#68d391" },
];

// ─── Custom Cursor ──────────────────────────────────────────────────────────
function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      }
    };
    const lerp = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }
      requestAnimationFrame(lerp);
    };
    const onEnter = () => { cursorRef.current?.classList.add("hovering"); ringRef.current?.classList.add("hovering"); };
    const onLeave = () => { cursorRef.current?.classList.remove("hovering"); ringRef.current?.classList.remove("hovering"); };
    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    lerp();
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Noise Orbs background ──────────────────────────────────────────────────
function Orbs() {
  return (
    <div className={styles.orbsWrapper} aria-hidden>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navInner}>
        <a href="#hero" className={styles.logo} data-hover="true">
          <span className={styles.logoText}>VSG</span>
          <span className={styles.logoDot} />
        </a>
        <ul className={`${styles.navLinks} ${open ? styles.navOpen : ""}`}>
          {NAV_LINKS.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={styles.navLink} onClick={() => setOpen(false)} data-hover="true">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:vikramsaketh2006@gmail.com" className={styles.navCta} data-hover="true">
          Hire Me
        </a>
        <button className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer", "ML Engineer", "Cloud Architect", "Problem Solver"];
  const [ri, setRi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[ri];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && typed === target) {
        setTimeout(() => setDeleting(true), 1600);
      } else if (deleting && typed === "") {
        setDeleting(false);
        setRi(p => (p + 1) % roles.length);
      } else {
        setTyped(prev => deleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1));
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [typed, deleting, ri]);

  return (
    <section id="hero" className={styles.hero}>
      <Orbs />
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          <span className={styles.statusDot} />
          Available for opportunities
        </div>
        <h1 className={styles.heroName}>
          <span className={styles.heroHi}>Hi, I&apos;m</span>
          <br />
          <span className={styles.heroFirstName}>Vikram</span>
          <span className={styles.heroLastName}> Saketh</span>
        </h1>
        <div className={styles.heroRole}>
          <span className={styles.rolePrefix}>{">"} </span>
          <span className={styles.roleText}>{typed}</span>
          <span className={styles.cursor2}>_</span>
        </div>
        <p className={styles.heroDesc}>
          Third year CS undergraduate at <span className={styles.highlight}>SRM Institute of Science &amp; Technology</span>,
          building intelligent full-stack applications and scalable cloud systems. CGPA&nbsp;<span className={styles.highlight}>9.62/10</span>.
        </p>
        <div className={styles.heroActions}>
          <a href="#projects" className={styles.btnPrimary} data-hover="true">
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className={styles.btnSecondary} data-hover="true">Contact Me</a>
        </div>
        <div className={styles.heroSocials}>
          <a href="https://linkedin.com/in/vikramsaketh-garre" target="_blank" rel="noopener" className={styles.socialLink} data-hover="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/GarreVikramSaketh" target="_blank" rel="noopener" className={styles.socialLink} data-hover="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.codeCard}>
          <div className={styles.codeCardHeader}>
            <span className={styles.dot} style={{background:"#ff5f57"}} />
            <span className={styles.dot} style={{background:"#febc2e"}} />
            <span className={styles.dot} style={{background:"#28c840"}} />
            <span className={styles.fileName}>vikram.py</span>
          </div>
          <pre className={styles.codeBlock}>{`class Developer:
  name = "Vikram Saketh Garre"
  cgpa = 9.62
  university = "SRM IST"
  
  skills = {
    "frontend": ["React", "HTML", "CSS"],
    "backend":  ["Node.js", "MySQL"],
    "ml":       ["PyTorch", "TF"],
    "cloud":    ["AWS", "EC2", "S3"]
  }
  
  def build(self, idea):
    return "🚀 " + idea + " → product"

me = Developer()
me.build("your next big idea")`}</pre>
        </div>
        <div className={styles.statsRow}>
          {[["9.62", "CGPA"], ["5+", "Projects"], ["3", "Internships"], ["5", "AWS Certs"]].map(([n, l]) => (
            <div key={l} className={styles.statBox}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="01" title="About Me" />
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p>
              I&apos;m a <span className={styles.hl}>third-year Computer Science undergraduate</span> at SRM Institute of Science &amp; Technology,
              maintaining a CGPA of <span className={styles.hl}>9.62/10</span>. I love building things that solve real problems—
              from intelligent ML systems to scalable full-stack applications.
            </p>
            <p>
              My work spans the full stack: crafting responsive frontends in React, engineering robust Node.js backends,
              designing efficient databases, and deploying on <span className={styles.hl}>AWS cloud infrastructure</span>.
              On the ML side, I&apos;ve tackled medical imaging (retinopathy, brain tumors) and predictive analytics.
            </p>
            <p>
              I believe good engineering is about <span className={styles.hl}>simplicity and reliability</span>—
              building systems that are easy to understand, maintain, and scale. I&apos;m always looking for
              the next challenging problem to solve.
            </p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Education</span><span>SRM IST, B.Tech CSE</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Graduation</span><span>May 2027</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>CGPA</span><span className={styles.hl}>9.62 / 10</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Location</span><span>India</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Email</span><span>vikramsaketh2006@gmail.com</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>Status</span><span className={styles.available}>🟢 Open to work</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="02" title="Skills & Tech Stack" />
        <div className={styles.skillsGrid}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className={styles.skillCard} data-hover="true">
              <h3 className={styles.skillCat}>{cat}</h3>
              <div className={styles.skillTags}>
                {items.map(s => <span key={s} className={styles.skillTag}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ─────────────────────────────────────────────────────────────
function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="03" title="Experience" />
        <div className={styles.expLayout}>
          <div className={styles.expTabs}>
            {EXPERIENCES.map((e, i) => (
              <button key={i} className={`${styles.expTab} ${active === i ? styles.expTabActive : ""}`}
                onClick={() => setActive(i)} data-hover="true"
                style={{ "--tab-color": e.color } as React.CSSProperties}>
                <span className={styles.expTabCompany}>{e.company}</span>
                <span className={styles.expTabPeriod}>{e.period}</span>
              </button>
            ))}
          </div>
          <div className={styles.expContent}>
            <h3 className={styles.expRole}>{EXPERIENCES[active].role}</h3>
            <p className={styles.expCompany} style={{ color: EXPERIENCES[active].color }}>
              @ {EXPERIENCES[active].company}
            </p>
            <p className={styles.expPeriod}>{EXPERIENCES[active].period}</p>
            <ul className={styles.expPoints}>
              {EXPERIENCES[active].points.map((p, i) => (
                <li key={i}><span className={styles.arrow}>▸</span>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ───────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="04" title="Projects" />
        <div className={styles.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <div key={i} className={styles.projectCard} data-hover="true"
              style={{ "--proj-color": p.color } as React.CSSProperties}>
              <div className={styles.projIcon}>{p.icon}</div>
              <h3 className={styles.projTitle}>{p.title}</h3>
              <p className={styles.projDesc}>{p.desc}</p>
              <div className={styles.projTags}>
                {p.tags.map(t => <span key={t} className={styles.projTag} style={{ borderColor: p.color, color: p.color }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ──────────────────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="05" title="Certifications" />
        <div className={styles.certsGrid}>
          {CERTS.map((c, i) => (
            <div key={i} className={styles.certCard} data-hover="true"
              style={{ "--cert-color": c.color } as React.CSSProperties}>
              <div className={styles.certBadge} style={{ background: c.color + "22", border: `1px solid ${c.color}44` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2">
                  <path d="M12 15l-2 5-3-1 1-5H5l-2-2 2-2 1-5 3-1 2 5 2-5 3 1-1 5h3l2 2-2 2-1 5-3 1z"/>
                </svg>
              </div>
              <div className={styles.certInfo}>
                <h4 className={styles.certName}>{c.name}</h4>
                <p className={styles.certOrg} style={{ color: c.color }}>{c.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader index="06" title="Get In Touch" />
        <div className={styles.contactLayout}>
          <div className={styles.contactLeft}>
            <p className={styles.contactIntro}>
              I&apos;m currently open to internship and full-time opportunities. Whether you have a project,
              a role, or just want to chat about tech — my inbox is always open.
            </p>
            <div className={styles.contactLinks}>
              <a href="mailto:vikramsaketh2006@gmail.com" className={styles.contactLink} data-hover="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                vikramsaketh2006@gmail.com
              </a>
              <a href="https://linkedin.com/in/vikramsaketh-garre" target="_blank" rel="noopener" className={styles.contactLink} data-hover="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                linkedin.com/in/vikramsaketh-garre
              </a>
              <a href="https://github.com/GarreVikramSaketh" target="_blank" rel="noopener" className={styles.contactLink} data-hover="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                github.com/GarreVikramSaketh
              </a>
              <a href="tel:+916281014144" className={styles.contactLink} data-hover="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.24 2 2 0 012.11.06h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1-1.42a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +91 6281014144
              </a>
            </div>
          </div>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input type="text" placeholder="Your Name" className={styles.formInput} required />
              <input type="email" placeholder="Your Email" className={styles.formInput} required />
            </div>
            <input type="text" placeholder="Subject" className={styles.formInput} required />
            <textarea placeholder="Your Message" className={styles.formTextarea} rows={5} required />
            <button type="submit" className={`${styles.btnPrimary} ${styles.formBtn}`} data-hover="true">
              {sent ? "✓ Message Sent!" : "Send Message"}
              {!sent && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerLogo}>VSG</span>
        <p>Built with Next.js · Designed with ❤️ by Vikram Saketh Garre</p>
        <p className={styles.footerYear}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIndex}>{index}.</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionLine} />
    </div>
  );
}

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
