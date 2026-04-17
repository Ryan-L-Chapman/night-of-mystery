import './GuestCard.css'

export default function GuestCard({ guest, onClick }) {
  const { playerName, characterName, characterTitle, photo, description } = guest

  function handleImgError(e) {
    e.target.src = '/guests/placeholder.svg'
  }

  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick?.()}>
      {/* Photo — left column */}
      <div className="card-photo-frame">
        <img
          src={photo}
          alt={characterName}
          className="card-photo"
          onError={handleImgError}
        />
      </div>

      {/* Info — right column */}
      <div className="card-info">
        <div className="card-header">
          <div className="card-identity">
            <h2 className="card-character-name">{characterName}</h2>
            <p className="card-character-title">{characterTitle}</p>
          </div>
          <span className="card-player-name">{playerName}</span>
        </div>
        <p className="card-description">{description}</p>
      </div>
    </article>
  )
}
