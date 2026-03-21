import s from './GenreButton.module.css'

function GenerButton({name}: {name: string}){
    return(
        <button className={s.genreButton}>
            <p className={s.pGenreButton}>{name.toUpperCase()}</p>
        </button>
    )

}

export default GenerButton;