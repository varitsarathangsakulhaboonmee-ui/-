import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({ lang: 'th', setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('th');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);