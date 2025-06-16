import { useEffect, useState } from 'react'

export default function ThemeToggler({ onThemeChange }) {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
            onThemeChange(savedTheme)
        }
    }, [onThemeChange])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 't') {
                const newTheme = theme === 'light' ? 'dark' : 'light'
                setTheme(newTheme)
                localStorage.setItem('theme', newTheme)
                onThemeChange(newTheme)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [theme, onThemeChange])

    return null // UIなしでキーボードだけで操作
}
