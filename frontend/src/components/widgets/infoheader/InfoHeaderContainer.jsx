import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SUPPORTED_LANGUAGES } from "../../../constants";
import { changeLanguage } from "../../../store/LanguageSlice";
import InfoHeader from "./InfoHeader";
import { useMemo } from "react";

const InfoHeaderContainer = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  /* Shown at the top of the header */
  const infoText = t("infoHeaderMessage");
  const linkText = "";
  const languageConfig = useMemo(() => {
    const result= [];
    const defaultSelection = { id: "", textKey: "" };

    for (const languageHeading in SUPPORTED_LANGUAGES) {
      const languageId = SUPPORTED_LANGUAGES[languageHeading];
      result.push({
        id: languageId,
        textKey: languageId,
      });
      if (languageId === i18n.language) {
        defaultSelection.id = languageId;
        defaultSelection.textKey = languageId;
      }
    }

    return {
      languageList: result,
      defaultSelection,
    };
  }, [i18n.language]);

  /* On change of language */
  const languageChangeHandler = (selectedLanguage) => {
    if (selectedLanguage?.id && typeof selectedLanguage.id === "string") {
      i18n.changeLanguage(selectedLanguage.id);
      dispatch(changeLanguage(selectedLanguage.id));
    }
  };

  const onLinkClickHandler = () => {};

  return (
    <InfoHeader
      languageConfig={languageConfig}
      infoText={infoText}
      linkText={linkText}
      onLinkClickHandler={onLinkClickHandler}
      languageChangeHandler={languageChangeHandler}
    />
  );
};

export default InfoHeaderContainer;
