import s from './EmptyFavPage.module.css'
import { useNavigate } from 'react-router-dom';

function EmptyFavPage(){
    const navigate = useNavigate();

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
}

export default EmptyFavPage;