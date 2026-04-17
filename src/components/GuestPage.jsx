import GuestCard from './GuestCard.jsx'
import './GuestPage.css'

export default function GuestPage({ guests, onGuestClick }) {
  // Pair guests into rows of 2
  const rows = []
  for (let i = 0; i < guests.length; i += 2) {
    rows.push(guests.slice(i, i + 2))
  }

  return (
    <div className="guest-page">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="guest-row">
            <div className="guest-cell">
              <GuestCard guest={row[0]} onClick={() => onGuestClick(row[0])} />
            </div>
            <div className="guest-spine" aria-hidden="true" />
            <div className="guest-cell">
              {row[1] && <GuestCard guest={row[1]} onClick={() => onGuestClick(row[1])} />}
            </div>
          </div>
          {rowIndex < rows.length - 1 && (
            <div className="guest-row-divider" aria-hidden="true">
              &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
