import './ErrorPopUp.css'
import { useEffect, useState } from 'react'

interface ErrorPopUpProps {
  message: string
  onClose?: () => void // Optionnel, pour prévenir le parent si besoin
}

const ErrorPopUp = ({ message, onClose }: ErrorPopUpProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, 5700) // 0.7s fadeIn + 5s barre + 0.5s fadeOut
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!visible) return null

  return (
    <div className="error-popup-container">
      <div className="error">{message}</div>
      <div className="error-progress"></div>
    </div>
  )
}

export default ErrorPopUp
