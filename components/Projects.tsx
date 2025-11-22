import React from 'react';
import { Section } from './Section';
import { PROJECTS, COMPETITIONS } from '../constants';
import { FolderGit2, Zap, Medal } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Technical Projects" subtitle="Engineering solutions in Computer Vision and Web Development." className="bg-slate-50">
      
      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {PROJECTS.map((project, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                <FolderGit2 size={24} />
              </div>
              {project.stats && (
                <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                  <Zap size={12} /> {project.stats}
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{project.title}</h3>
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-4">{project.category}</p>
            
            <div className="flex-1 space-y-2 mb-6">
              {project.description.map((desc, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
              {project.technologies.map(tech => (
                <span key={tech} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded hover:bg-slate-200 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Competitions Section */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <Medal className="text-sky-600" /> Competitions & Challenges
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
           {COMPETITIONS.map((comp, idx) => (
             <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">{comp.name}</h4>
                  <p className="text-slate-600 text-sm mb-4">{comp.role}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 border-t pt-3 mt-2 border-slate-100">
                  {comp.date}
                </div>
             </div>
           ))}
        </div>
      </div>

    </Section>
  );
};