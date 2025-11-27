'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function LanguageToggle() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'hi' : 'en');
    // In a real app, this would also change the i18n locale.
  };

  return (
    <div className="flex items-center gap-2 rounded-full p-1 bg-muted">
      <Button
        size="sm"
        variant={language === 'en' ? 'default' : 'ghost'}
        onClick={() => setLanguage('en')}
        className="rounded-full"
      >
        English
      </Button>
      <Button
        size="sm"
        variant={language === 'hi' ? 'default' : 'ghost'}
        onClick={() => setLanguage('hi')}
        className="rounded-full"
      >
        हिंदी
      </Button>
    </div>
  );
}
