'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, ExternalLink, Code2, Briefcase, Send } from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', body: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // 1. Fetch Profile data from Django
    axios.get(`${API_BASE}/profile/`)
      .then((res) => {
        if (res.data.length > 0) setProfile(res.data[0]);
      })
      .catch((err) => console.error("Error fetching profile:", err));

    // 2. Fetch Skills
    axios.get(`${API_BASE}/skills/`)
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Error fetching skills:", err));

    // 3. Fetch Projects
    axios.get(`${API_BASE}/projects/`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/messages/`, formData);
      setFormStatus('Message sent successfully! Stored in Django CMS.');
      setFormData({ name: '', email: '', subject: '', body: '' });
    } catch (err) {
      setFormStatus('Failed to send message. Make sure the backend is running.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          {profile?.name || "Loading..."}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-slate-400 font-medium">
          {profile?.title || "Full Stack Developer"}
        </p>
        <p className="mt-6 text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {profile?.bio || "Welcome to my portfolio! Content is dynamically retrieved from my custom Python CMS."}
        </p>

        {/* Action Links */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition shadow-lg shadow-blue-500/20">
              <Mail size={18} /> Contact Me
            </a>
          )}
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-full font-medium transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-full font-medium transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.763z"/></svg>
              LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800/80">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-8 text-teal-400">
          <Code2 size={26} /> Skills & Technologies
        </h2>
        {skills.length === 0 ? (
          <p className="text-slate-500">No skills added yet in Django Admin.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <span className="text-xs text-slate-400">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800/80">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-8 text-blue-400">
          <Briefcase size={26} /> Featured Projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-slate-500">No projects added yet in Django Admin.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{proj.title}</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">{proj.description}</p>
                </div>
                <div className="flex gap-4 mt-6">
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-semibold">
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-sm font-semibold">
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto px-6 py-16 border-t border-slate-800/80">
        <h2 className="text-3xl font-bold text-center mb-8">Send a Message</h2>
        <form onSubmit={handleMessageSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            required
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
          />
          <textarea
            required
            rows="4"
            placeholder="Your Message..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 rounded-lg font-bold flex items-center justify-center gap-2 transition"
          >
            <Send size={18} /> Send Message
          </button>
          {formStatus && <p className="text-center text-sm text-teal-400 mt-2">{formStatus}</p>}
        </form>
      </section>
    </main>
  );
}