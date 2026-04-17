import { useEffect } from 'react'
import Invitation from './Invitation.jsx'
import GuestPage from './GuestPage.jsx'
import './DocumentViewer.css'

export default function DocumentViewer({ documents, currentIndex, setCurrentIndex, total }) {
  const goLeft  = () => setCurrentIndex(i => Math.max(0, i - 1))
  const goRight = () => setCurrentIndex(i => Math.min(total - 1, i + 1))

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft')  goLeft()
      if (e.key === 'ArrowRight') goRight()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [total]) // eslint-disable-line react-hooks/exhaustive-deps

  const doc = documents[currentIndex]
  const heading = doc.type === 'invitation' ? 'The Invitation' : 'The Guest List'
  const rendered = doc.type === 'invitation'
    ? <Invitation />
    : <GuestPage guests={doc.data} />

  return (
    <div className="viewer-root">
      <h1 className="viewer-heading">{heading}</h1>
      <div className="viewer-stage">
        <div className="viewer-document">
          <div className="viewer-corners viewer-corners--tl" aria-hidden="true">&#x25C6;</div>
          <div className="viewer-corners viewer-corners--tr" aria-hidden="true">&#x25C6;</div>
          <div className="viewer-corners viewer-corners--bl" aria-hidden="true">&#x25C6;</div>
          <div className="viewer-corners viewer-corners--br" aria-hidden="true">&#x25C6;</div>
          <div className="viewer-content">
            {rendered}
          </div>
        </div>
      </div>

      <div className="viewer-controls">
        <button
          className="viewer-arrow"
          onClick={goLeft}
          disabled={currentIndex === 0}
          aria-label="Previous document"
        >
          &#9664;
        </button>
        <span className="viewer-counter">{currentIndex + 1} / {total}</span>
        <button
          className="viewer-arrow"
          onClick={goRight}
          disabled={currentIndex === total - 1}
          aria-label="Next document"
        >
          &#9654;
        </button>
      </div>
    </div>
  )
}
