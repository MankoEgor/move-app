import s from './EmptyFavPage.module.css'
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function EmptyFavPage(){
    const navigate = useNavigate();
    const {language} = useLanguage();

    if(language === 'ru')
        return(
        <div className={s.mainDiv}>
            <div className={s.imageDiv}>
                <img className={s.imgHeart} src="/heart_broken_24dp_C8F135.svg" alt="" />
            </div>

            <p className={s.emptyTitle}>НЕТ ИЗБРАННЫХ ФИЛЬМОВ</p>
            <p className={s.emptyDis}>Вы не нашли фильмы, которые вам понравились. Желаем вам найти лучшее для вас <br /> и возращаться на эту страницу</p>

            <button className={s.goToBrowse} onClick={() => navigate('/')}>
                ПЕРЕЙТИ К ПОИСКУ
            </button>
        </div>
    );
    else 
        return(
        <div className={s.mainDiv}>
            <div className={s.imageDiv}>
                <img className={s.imgHeart} src="/heart_broken_24dp_C8F135.svg" alt="" />
            </div>

            <p className={s.emptyTitleEN}>NO FAVORITES</p>
            <p className={s.emptyDis}>You have not found any films that you liked. We wish you to find the best for yourself <br /> and return to this page</p>

            <button className={s.goToBrowse} onClick={() => navigate('/')}>
                BROWSE MOVIES
            </button>
        </div>
        );

    
}

export default EmptyFavPage;