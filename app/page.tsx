/*
Perfect Developer/Engineer Portfolio — Single-file React component (Tailwind CSS)

How to use:
1. Create a React app (Vite or Create React App) and install Tailwind CSS following the official guide.
2. Drop this file as `App.jsx` (or `App.tsx` with small typings adjustments).
3. Ensure Tailwind is configured and `index.css` includes Tailwind directives.
4. Optional: install framer-motion for subtle animations: `npm i framer-motion`.

Features included:
- Hero with CTA and downloadable resume button
- Skills, Projects grid with filters and modal details
- Experience timeline
- Testimonials (sample)
- Blog preview (dummy)
- Contact form (Netlify/Formspree-ready HTML form fallback)
- Theme toggle (light/dark) with localStorage
- Accessibility considerations, SEO-friendly sections, structured data comments

Replace placeholder text, images, and project links with your content.
*/
"use client";

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image";



const SITE_TITLE = "Your Name — Software Engineer"

const sampleProjects = [
  {
    id: 1,
    title: 'Realtime Trading Dashboard',
    description: 'Full-stack React + Node app with WebSockets, charting, and custom indicators. Focused on performance and low-latency updates.',
    tags: ['React', 'Node', 'WebSockets', 'Postgres'],
    image: 'Screenshot 2025-11-11 1.png',
    url: '#'
  },
  {
    id: 2,
    title: 'Mobile Payments (Fintech)',
    description: 'A secure payments flow with OTP, transaction ledger, and 3rd-party integrations. PCI-aligned componentized architecture.',
    tags: ['React Native', 'Stripe', 'AWS'],
    image: 'fintech-app.png',
    url: '#',
  },
  {
    id: 3,
    title: 'AI Trading Assistant',
    description: 'Python microservices, ML models for signals, integrated with Binance & MT5. CI/CD and monitoring.',
    tags: ['Python', 'ML', 'Docker', 'Kubernetes'],
    image: './Screenshot 2025-11-11 152358.png',
    url: '#',
  }
]

const initialSkills = [
  { id: 1, name: 'JavaScript/TypeScript', level: 92 },
  { id: 2, name: 'React & Next.js', level: 90 },
  { id: 3, name: 'Node.js & APIs', level: 88 },
  { id: 4, name: 'Databases (Postgres, Redis)', level: 82 },
  { id: 5, name: 'DevOps (Docker, GitHub Actions)', level: 76 },
]

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [skills, setSkills] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('site-skills') : null
      return saved ? JSON.parse(saved) : initialSkills
    } catch (e) {
      return initialSkills
    }
  })
  const [editingSkills, setEditingSkills] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('site-skills', JSON.stringify(skills))
    } catch (e) { }
  }, [skills])

  const addSkill = () => setSkills(prev => [...prev, { id: Date.now(), name: 'New Skill', level: 50 }])
  const updateSkill = (id, key, value) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, [key]: key === 'level' ? Math.max(0, Math.min(100, Number(value) || 0)) : value } : s))
  }
  const removeSkill = id => setSkills(prev => prev.filter(s => s.id !== id))

  useEffect(() => {
    const saved = localStorage.getItem('site-theme')
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('transition-colors', 'duration-500')
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('site-theme', theme)
  }, [theme])


  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('site-theme', theme)
  }, [theme])

  const tags = ['All', ...Array.from(new Set(sampleProjects.flatMap(p => p.tags)))]

  const filtered = sampleProjects.filter(p => filter === 'All' || p.tags.includes(filter))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <a href="#hero" className="font-extrabold text-lg md:text-xl tracking-tight">Christian Akor<span className="text-indigo-500">.</span></a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-indigo-600 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section id="hero" className="pt-28 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Hi! I’m Christian.<br />
              I build reliable, scalable web systems.</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">I design and ship features end-to-end: frontend, backend, and infra. Currently building high-frequency trading tools and fintech products.</p>

            <div className="mt-6 flex gap-3">
              <a href="/Onoja_Christians_CV.docx.pdf" download="Onoja_Christians_CV.docx.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700">Download Resume</a>
              <a href="/Onoja_Christians_CV.docx.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">View Resume</a>
              <a href="#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700">View Projects</a>

            </div>

            <div className="mt-8">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">Top Skills</h4>
              <div className="mt-3 space-y-3">
                {skills.map(s => (
                  <div key={s.name} className="w-full">
                    <div className="flex justify-between text-sm"><span>{s.name}</span><span>{s.level}%</span></div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-1"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${s.level}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="relative">
            <div className="bg-gradient-to-tr from-indigo-500/30 to-pink-400/20 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-center items-center">
                <iframe
                  src="https://lottie.host/embed/4901f176-4c58-45d2-a5df-655fc032a098/JU53DZ65sD.lottie"
                  className="w-full max-w-[320px] aspect-square"
                  style={{ border: "none" }}
                ></iframe>
              </div>

            </div>
          </div>
        </section>

        <section id="projects" className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="flex gap-2 items-center">
              {tags.map(t => (
                <button key={t} onClick={() => setFilter(t)} className={`text-sm px-3 py-1 rounded-full ${filter === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <motion.article
                key={p.id}
                layout
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-indigo-500/10 transition-all border border-gray-100 dark:border-gray-700"
              >

                <div className="relative h-40 w-full rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {p.image && p.image !== '' ? (
                    <Image
                      src={p.image.startsWith('http') ? p.image : `/images/${p.image}`}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>


                <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{p.description}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {p.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">{tag}</span>)}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a href={p.url} className="text-sm text-indigo-600 hover:underline">View</a>
                  <button onClick={() => setSelected(p)} className="text-sm px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700">Details</button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-16">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
              <div>
                <h4 className="font-semibold">Software Developer — Freelance</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2022 — Present</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  - Designed and built responsive web and mobile apps for clients in e-commerce, fintech, and logistics.<br />
                  - Collaborated remotely using Agile workflows, ensuring timely delivery of high-quality products.<br />
                  - Implemented automation tools and reusable components to improve development efficiency.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
              <div>
                <h4 className="font-semibold">Software Developer — 3MTT Nigeria</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">2023 — present</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Built the consumer mobile app, payments pipeline, and shipping of 3 major product updates.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">Contact</h2>
          <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className=''>
                <p>
                  Let’s Build Something Great Together
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Whether you’re looking to collaborate on a project,
                  need a reliable developer to bring your vision to life, or just want to talk tech —
                  I’d love to connect.<br />
                  You can connect with me on linkedin in the social section.
                </p>
              </div>
              <div>
                <strong>Location</strong>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lagos, Nigeria</p>
              </div>
              <div>
                <strong>Social</strong>
                <p className="text-sm text-gray-500 dark:text-gray-400"><a href="https://www.linkedin.com/in/onoja-christian-akor" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Onoja Christian Akor. Built with React + Tailwind.</div>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 grid place-items-center z-50">
            <motion.div initial={{ y: 30, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: .98 }} className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{selected.title}</h3>
                <button aria-label="Close" onClick={() => setSelected(null)} className="text-gray-500">✕</button>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{selected.description}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {selected.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{tag}</span>)}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <a href={selected.url} className="px-4 py-2 rounded bg-indigo-600 text-white">Open project</a>
                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded border">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
