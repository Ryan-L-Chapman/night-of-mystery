import { useState } from 'react'
import allGuests from '../data/guests.json'
import './CharacterPage.css'

export default function CharacterPage({ guest, onBack }) {
  const { id, characterName, characterTitle, photo, background, gossip, goals, props, relationships } = guest

  // Persist checkbox state in localStorage per character
  const storageKey = `goals_${id}`
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.length === goals.length) return parsed
      }
    } catch {}
    return goals.map(() => false)
  })

  function toggleGoal(i) {
    const next = checked.map((v, j) => j === i ? !v : v)
    setChecked(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  function handleImgError(e) {
    e.target.src = '/guests/placeholder.svg'
  }

  // Resolve relationship entries to full guest objects + description
  const resolvedRelationships = (relationships || [])
    .map(rel => {
      const needle = rel.guestId.toLowerCase()
      const g = allGuests.find(g => g.id.toLowerCase() === needle)
      return g ? { ...g, relationDescription: rel.description } : null
    })
    .filter(Boolean)

  return (
    <div className="char-layout">
      <button className="char-back" onClick={onBack}>
        &#x2190; Back to Guest List
      </button>

      <div className="char-document">
        <div className="app-corners app-corners--tl" aria-hidden="true">&#x25C6;</div>
        <div className="app-corners app-corners--tr" aria-hidden="true">&#x25C6;</div>
        <div className="app-corners app-corners--bl" aria-hidden="true">&#x25C6;</div>
        <div className="app-corners app-corners--br" aria-hidden="true">&#x25C6;</div>

        {/* ── TOP TWO COLUMNS ── */}
        <div className="char-body">
          {/* Left */}
          <div className="char-left">
            <div className="char-photo-frame">
              <img src={photo} alt={characterName} className="char-photo" onError={handleImgError} />
            </div>
            <h1 className="char-name">{characterName}</h1>
            <p className="char-title">{characterTitle}</p>
            <div className="char-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>
            <p className="char-background">{background}</p>
          </div>

          {/* Spine */}
          <div className="char-spine" aria-hidden="true" />

          {/* Right */}
          <div className="char-right">
            <section className="char-section">
              <h2 className="char-section-title">Gossip</h2>
              <div className="char-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>
              <p className="char-gossip-disclaimer">Don&rsquo;t believe all the Gossip you hear &mdash; some of it may be untrue.</p>
              <ul className="char-talking-points">
                {gossip.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </section>

            <div className="char-section-gap" />

            <section className="char-section">
              <h2 className="char-section-title">Goals</h2>
              <div className="char-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>
              <ul className="char-goals">
                {goals.map((goal, i) => (
                  <li key={i} className="char-goal-item">
                    <label className="char-goal-label">
                      <input
                        type="checkbox"
                        className="char-goal-checkbox"
                        checked={checked[i]}
                        onChange={() => toggleGoal(i)}
                      />
                      <span className={checked[i] ? 'char-goal-text char-goal-text--done' : 'char-goal-text'}>
                        {goal}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            {props && props.length > 0 && (
              <>
                <div className="char-section-gap" />
                <section className="char-section">
                  <h2 className="char-section-title">Props</h2>
                  <div className="char-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>
                  <ul className="char-props">
                    {props.map((prop, i) => (
                      <li key={i}>{prop}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>

        {/* ── FULL-WIDTH RELATIONSHIPS ── */}
        {resolvedRelationships.length > 0 && (
          <>
            <div className="char-full-divider" aria-hidden="true" />
            <section className="char-relationships">
              <h2 className="char-section-title">Relationships</h2>
              <div className="char-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>
              <div className="char-rel-grid">
                {resolvedRelationships.map(rel => (
                  <div key={rel.id} className="char-rel-card">
                    <div className="char-rel-photo-frame">
                      <img
                        src={rel.photo}
                        alt={rel.characterName}
                        className="char-rel-photo"
                        onError={handleImgError}
                      />
                    </div>
                    <div className="char-rel-info">
                      <p className="char-rel-name">{rel.characterName}</p>
                      <p className="char-rel-title">{rel.characterTitle}</p>
                      <p className="char-rel-description">{rel.relationDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
