import React, { useState, useEffect } from 'react'
import './index.css'
import 'tailwindcss'

function GhibliApp() {
    const [films, setFilms] = useState([])
    const [selectedFilm, setSelectedFilm] = useState(null)

    useEffect(() => {
        fetch('https://ghibliapi.vercel.app/films') // ✅ 正しいエンドポイント
            .then((res) => res.json())
            .then((data) => setFilms(data))
            .catch((err) => console.error(err))
    }, [])

    const showRandomFilm = () => {
        const randomIndex = Math.floor(Math.random() * films.length)
        setSelectedFilm(films[randomIndex])
    }

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 class="text-green-600 ">ジブリ気分チェッカー</h1>
            <button onClick={showRandomFilm}>今日の気分は？</button>

            {selectedFilm && (
                <div style={{ marginTop: 20 }}>
                    <h2>
                        {selectedFilm.title} ({selectedFilm.release_date})
                    </h2>
                    <p>{selectedFilm.description}</p>
                </div>
            )}
        </div>
    )
}

export default GhibliApp
