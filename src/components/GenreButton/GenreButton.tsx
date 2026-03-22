import s from './GenreButton.module.css'

interface GenerButton {
    name: string
    onClick: () => void; 
}

function GenerButton({name, onClick}: GenerButton){
    return(
        <button onClick={onClick} className={s.genreButton}>
            <p className={s.pGenreButton}>{name.toUpperCase()}</p>
        </button>
    )

}

export default GenerButton;