import { useLanguage } from "../../context/LanguageContext";
import s from './LangButton.module.css'

function LangButton(){
    const { language, changeLanguage } = useLanguage();

    return (
        <>
            <button 
                className={s.langButton} 
                onClick={() => changeLanguage('ru')}
                disabled={language === 'ru'}>
                RU
            </button>
            <button 
                className={s.langButton} 
                onClick={() => changeLanguage('en')}
                disabled={language === 'en'}>
                EN
            </button>
        </>
    )
}

export default LangButton;
