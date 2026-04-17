import { useState } from 'react'
import './App.css'
import Popup            from './components/Popup.jsx'
import GuestPage        from './components/GuestPage.jsx'
import NameConfirmPopup from './components/NameConfirmPopup.jsx'
import CharacterPage    from './components/CharacterPage.jsx'
import guests           from './data/guests.json'

export default function App() {
  const [popupDismissed,  setPopupDismissed]  = useState(false)
  const [confirmingGuest, setConfirmingGuest] = useState(null)  // guest pending name check
  const [activeCharacter, setActiveCharacter] = useState(null)  // unlocked character page

  const behindPopup = !popupDismissed

  return (
    <>
      {/* ── Main content ── */}
      {activeCharacter ? (
        <CharacterPage
          guest={activeCharacter}
          onBack={() => setActiveCharacter(null)}
        />
      ) : (
        <div
          className="app-layout"
          aria-hidden={behindPopup || undefined}
          inert={behindPopup ? '' : undefined}
        >
          <h1 className="app-heading">The Guest List</h1>
          <div className="app-document">
            <div className="app-corners app-corners--tl" aria-hidden="true">&#x25C6;</div>
            <div className="app-corners app-corners--tr" aria-hidden="true">&#x25C6;</div>
            <div className="app-corners app-corners--bl" aria-hidden="true">&#x25C6;</div>
            <div className="app-corners app-corners--br" aria-hidden="true">&#x25C6;</div>
            <GuestPage
              guests={guests}
              onGuestClick={guest => setConfirmingGuest(guest)}
            />
          </div>
        </div>
      )}

      {/* ── Intro popup (first load) ── */}
      {!popupDismissed && (
        <Popup onDismiss={() => setPopupDismissed(true)} />
      )}

      {/* ── Name confirmation popup ── */}
      {confirmingGuest && (
        <NameConfirmPopup
          guest={confirmingGuest}
          onConfirm={guest => { setActiveCharacter(guest); setConfirmingGuest(null) }}
          onCancel={() => setConfirmingGuest(null)}
        />
      )}
    </>
  )
}
