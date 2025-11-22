import React from 'react';
import { Section } from './Section';
import { BLOG_POSTS } from '../constants';
import { BookOpen } from 'lucide-react';

export const Blog: React.FC = () => {
  return (
    <Section id="insights" title="Insights & Reflections" subtitle="Narratives from my Statement of Purpose and research journey." className="bg-white">
      <div className="grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <div key={index} className="flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold tracking-widest text-sky-600 uppercase bg-sky-50 px-2 py-1 rounded">
                  {post.tags[0]}
                </span>
                <span className="text-slate-400 text-xs font-mono">{post.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">{post.title}</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">{post.subtitle}</p>
              
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
                {post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="px-8 py-4 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-2">
               {post.tags.map(tag => (
                 <span key={tag} className="text-[10px] text-slate-500 font-medium">#{tag}</span>
               ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};