import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@chainlit/react-client';

const LanguageContext = createContext<{
  languageInUse: string;
  setLanguageInUse: (language: string) => void;
  translationLoaded: boolean;
}>({
  languageInUse: 'en-US',
  setLanguageInUse: () => {},
  translationLoaded: false
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [translationLoaded, setTranslationLoaded] = useState(false);
  const storedLanguage = localStorage.getItem('languageInUse');
  const [languageInUse, setLanguageInUse] = useState(storedLanguage || 'en-US');
  const { i18n } = useTranslation();

  const { data: translations } = useApi<any>(
    `/project/translations?language=${languageInUse}`
  );

  const handleChangeLanguage = (languageBundle: any): void => {
    i18n.addResourceBundle(languageInUse, 'translation', languageBundle);
    i18n.changeLanguage(languageInUse);
  };

  useEffect(() => {
    if (!translations) return;
    handleChangeLanguage(translations.translation);
    setTranslationLoaded(true);
  }, [translations, languageInUse]);

  useEffect(() => {
    localStorage.setItem('languageInUse', languageInUse);
  }, [languageInUse]);

  return (
    <LanguageContext.Provider
      value={{
        languageInUse,
        setLanguageInUse,
        translationLoaded
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
