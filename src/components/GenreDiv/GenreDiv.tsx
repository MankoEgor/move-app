import s from "./GenreDiv.module.css";

function GenreDiv({name}: {name: string}){
    return (
        <div className={s.genreDiv}>
            <p className={s.pGenre}>{name.toUpperCase()}</p>
        </div>
    )
}

export default GenreDiv;