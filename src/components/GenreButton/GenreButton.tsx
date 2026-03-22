import s from './GenreButton.module.css'

interface GenerButton {
    name: string
    onClick: () => void
    isActive: boolean
}

function GenerButton({name, onClick, isActive}: GenerButton){
    return(
        <button onClick={onClick} className={isActive ? s.active :s.genreButton }>
            <p className={s.pGenreButton}>{name.toUpperCase()}</p>
        </button>
    )

}

export default GenerButton;