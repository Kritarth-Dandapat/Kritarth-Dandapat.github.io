import React from 'react';
import { Section } from './Section';
import { EDUCATION, PROFESSIONAL_EXPERIENCE } from '../constants';
import { GraduationCap, Briefcase } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <Section id="education" title="Timeline" subtitle="Education and professional roles.">
      <div className="grid lg:grid-cols-2 gap-16">
        
        {/* Education Column */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3 border-b pb-4">
            <GraduationCap className="text-sky-600" /> Education
          </h3>
          <div className="space-y-8 relative border-l-2 border-slate-200 ml-3 pl-8 pb-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-sky-600"></span>
                <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                <p className="text-slate-600 font-serif italic mb-1">{edu.institution}</p>
                <p className="text-sm text-slate-500 mb-3">{edu.period} | {edu.location}</p>
                <ul className="space-y-1">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="text-sm text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Column */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3 border-b pb-4">
            <Briefcase className="text-sky-600" /> Professional Experience
          </h3>
          <div className="space-y-10 relative border-l-2 border-slate-200 ml-3 pl-8 pb-4">
            {PROFESSIONAL_EXPERIENCE.map((job, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-slate-400"></span>
                <h4 className="text-lg font-bold text-slate-900">{job.role}</h4>
                <p className="text-slate-600 font-medium mb-1">{job.organization}</p>
                <p className="text-sm text-slate-500 mb-3">{job.period} | {job.location}</p>
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {job.description.map((desc, i) => (
                    <li key={i} className="text-sm text-slate-700 leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};