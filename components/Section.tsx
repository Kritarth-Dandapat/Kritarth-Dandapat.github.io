import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, className = "", children }) => {
  return (
    <section id={id} className={`scroll-mt-28 py-16 md:py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-sky-600 rounded-full"></span>
          </h2>
          {subtitle && <p className="mt-4 text-slate-600 max-w-2xl text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};