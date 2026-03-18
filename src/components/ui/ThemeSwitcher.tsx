import { useState, useRef, useEffect } from 'react'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'

function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const themeOptions = [
    { value: 'light', label: 'Light', icon: FiSun },
    { value: 'dark', label: 'Dark', icon: FiMoon },
    { value: 'system', label: 'System', icon: FiMonitor },
  ]


  const currentThemeOption = themeOptions.find(option => option.value === theme)
  const CurrentIcon = currentThemeOption?.icon || FiSun

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-[#1A3263] hover:bg-gray-100 rounded-lg transition-colors"
        title={`Current theme: ${currentThemeOption?.label}`}
      >
        <CurrentIcon size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-50">
          {themeOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value as 'light' | 'dark' | 'system')
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  theme === option.value
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{option.label}</span>
                {theme === option.value && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher