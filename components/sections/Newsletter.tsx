// components/sections/Newsletter.tsx
'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '../ui/Button';

interface NewsletterDict {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  button?: string;
  titleLight?: string;
  subtitleLight?: string;
}

interface NewsletterProps {
  dict: NewsletterDict;
  variant?: 'dark' | 'light';
}

export const Newsletter = ({
  dict,
  variant = 'dark',
}: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const isLight = variant === 'light';

  const title = isLight ? dict.titleLight : dict.title;
  const subtitle = isLight ? dict.subtitleLight : dict.subtitle;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
  };

  return (
    <section className={`py-24 text-center px-5 ${isLight ? 'bg-secondary-fixed' : 'bg-primary text-on-primary'}`}>
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {!isLight && <Mail className="w-12 h-12 mb-6" />}
        <h2 className={`font-headline-md mb-4 uppercase tracking-widest ${isLight ? 'text-on-secondary-fixed' : 'text-on-primary'}`}>
          {title}
        </h2>
        <p className={`mb-10 max-w-lg ${isLight ? 'text-on-secondary-fixed-variant' : 'text-on-primary/80'}`}>
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-lg gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.placeholder}
            className={`flex-grow rounded-lg px-6 py-4 focus:outline-none focus:ring-2 ${
              isLight
                ? 'bg-white border-none text-on-surface focus:ring-primary'
                : 'bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-white/50'
            }`}
            required
          />
          <Button type="submit" variant={isLight ? 'primary' : 'inverted'} size="lg" className="whitespace-nowrap">
            {dict.button}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;