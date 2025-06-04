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

    // Enterキーのリスナーを追加（全体に）
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                showRandomFilm()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [films])

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 className="text-green-600 text-2xl font-bold mb-4">
                ジブリ気分チェッカー
            </h1>

            <button onClick={showRandomFilm}>今日の気分は？</button>

            <p className="mt-2 text-sm text-gray-600">
                <span className="font-extrabold">上をクリック</span>
                または<span className="font-extrabold">Enterキー</span>
                でどんな映画がおすすめされるか見てみよう！
            </p>

            {selectedFilm && (
                <div style={{ marginTop: 20 }}>
                    <h2 className="text-xl font-semibold">
                        {selectedFilm.title} ({selectedFilm.release_date})
                    </h2>
                    <p className="mt-2">{selectedFilm.description}</p>
                </div>
            )}
        </div>
    )
}

export default GhibliApp
