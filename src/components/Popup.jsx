import { useEffect, useRef } from 'react'
import './Popup.css'

export default function Popup({ onDismiss }) {
  const closeBtnRef = useRef(null)

  // Focus close button on mount for keyboard accessibility
  useEffect(() => {
    closeBtnRef.current?.focus()
  }, [])

  // Dismiss on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onDismiss])

  // Dismiss when clicking the backdrop (not the box itself)
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onDismiss()
  }

  return (
    <div className="popup-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="popup-box">
        <button
          ref={closeBtnRef}
          className="popup-close"
          onClick={onDismiss}
          aria-label="Close"
        >
          &#x2715;
        </button>

        <div className="popup-seal" aria-hidden="true">&#x2726;</div>
        <div className="popup-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;</div>
        <h2 id="popup-title" className="popup-title">A Night of Mystery</h2>
        <div className="popup-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;</div>

        <div className="popup-body">
          <p>
            Hey there, my friend. I am so excited for this Night of Mystery! Please read this
            entire pop up.
          </p>
          <p>
            Everyone has custom characters - click on the profile with your name in 
            the top right, then enter the password I gave you. You do not have to read the whole guest list if 
            don't want to, but I recommend 
            you read atleast the description of those you have relationships with. Use your charcter's info  
            to guide yourself, but feel free to 
            improvise and add on, it&#x2019;s you after all!
          </p>
          <p>
            Our story takes place in an alternate 1930s. We find ourselves in Big City,
            a hub of industry, culture, and education - at Big University of course. All eyes
            on Cornelius Duke tonight, the wealthiest man in Big City. With his hands in
            everything, people are asking the big question: Will he use tonight&#x2019;s 
            party to cut ties with his investments?
          </p>
          <p>
            Everyone has their own motives and secrets -  and don't believe every rumor you hear.
            With a high tension night ahead, keep your eyes peeled, every detail may matter.
          </p>
        </div>

        <div className="popup-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;</div>

        <button className="popup-cta" onClick={onDismiss}>
          Proceed to the Guest List
        </button>
      </div>
    </div>
  )
}
