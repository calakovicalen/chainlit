import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import getRouterBasename from '@/lib/router';
import App from 'App';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi, useAuth } from '@chainlit/react-client';

export default function AppWrapper() {
  const [translationLoaded, setTranslationLoaded] = useState(false);
  const { isAuthenticated, isReady } = useAuth();
  const { i18n } = useTranslation();
  const { languageInUse } = useLanguage();

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
    if (
      isReady &&
      !isAuthenticated &&
      window.location.pathname !== getRouterBasename() + '/login' &&
      window.location.pathname !== getRouterBasename() + '/login/callback'
    ) {
      window.location.href = getRouterBasename() + '/login';
    }
  }, [isAuthenticated, isReady]);

  if (!translationLoaded) return null;

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
