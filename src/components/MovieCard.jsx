import React, {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router"

export function MovieCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=af5717ed&i=${id}`)
        .then((response) => response.json())
        .then((data) => {setMovie(data); setLoading(false)})
    },[id, navigate])

    return(
        <div></div>
    )
}