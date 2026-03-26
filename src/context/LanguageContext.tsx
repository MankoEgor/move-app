import {useState, createContext, useContext,} from 'react';

type Language = 'ru' | 'en';

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({children} : {children: React.ReactNode}){
    const [language, setLanguage] = useState<Language>('ru');

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    }

    return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}




