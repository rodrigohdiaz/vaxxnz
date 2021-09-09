import { Select } from "baseui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages, { Language } from "./translations/resources";
import { enqueueAnalyticsEvent } from "./utils/analytics";


const LanguageSelect = () => {
  const [language, setLanguage] = useState<Language | undefined>(
    languages.find((lang) => lang.code === "en")
  );
  const { i18n } = useTranslation();

  const changeLanguage = (selectedLanguage: any) => {
    let newLang = languages.find((lang) => lang.code === selectedLanguage.code);
    setLanguage(newLang);
    i18n.changeLanguage(newLang?.code);
    enqueueAnalyticsEvent('Language changed', { code: newLang?.code })
  }

  return (
    <Select
      overrides={{
        Root: {
          style: {
            maxHeight: "40px",
          },
        },
      }}
      searchable={false}
      clearable={false}
      options={languages}
      value={language ? [language] : undefined}
      placeholder="Language"
      onChange={(params) => {
        changeLanguage(params.option);
      }}
    />
  );
};

export default LanguageSelect;
