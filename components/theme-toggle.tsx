'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial render, always show moon icon to prevent hydration mismatch
  // After mount, use the actual theme
  const currentTheme = mounted ? (resolvedTheme || theme || 'light') : 'light'
  const isDark = currentTheme === 'dark'

  return (
    <button
      className="group relative p-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => {
        if (mounted) {
          setTheme(isDark ? 'light' : 'dark')
        }
      }}
      disabled={!mounted}
      type="button"
      aria-label="Toggle theme"
    >
      {/* SVG Icons statt Emoji */}
      {isDark ? (
        <svg 
          className="w-5 h-5 text-amber-400 transition-transform duration-300 group-hover:rotate-180" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg 
          className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 group-hover:rotate-12" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
      
      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-xl bg-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
    </button>
  )
}

