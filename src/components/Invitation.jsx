import './Invitation.css'

export default function Invitation() {
  return (
    <article className="invitation">
      <div className="invitation-seal">&#x2726;</div>

      <p className="invitation-address">To Our Most Esteemed Guest,</p>

      <div className="invitation-ornament">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>

      <h1 className="invitation-title">You Are Cordially Invited</h1>
      <h2 className="invitation-subtitle">to an Evening at Hargrove Manor</h2>

      <div className="invitation-ornament">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>

      <p className="invitation-body">
        On the evening of Saturday, the twenty-first of February, nineteen thirty-four,
        Lord Edmund Hargrove requests the singular pleasure of your company for a private
        dinner at Hargrove Manor, Devonshire. The occasion is one of some delicacy, and
        your discretion is, as always, expected and appreciated.
      </p>

      <p className="invitation-body">
        The Manor carriage will collect guests from Ashford Station at seven o&#x2019;clock sharp.
        Dress: Black tie. A full supper will be served. Should you fail to arrive by
        half past seven, we shall be compelled to assume the very worst.
      </p>

      <p className="invitation-body invitation-note">
        <em>
          One among you has a secret. One among you has a motive. Before the evening is
          concluded, one among you shall stand accused. We trust you will play your part
          with the utmost conviction.
        </em>
      </p>

      <div className="invitation-ornament">&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;&#x2500;&#x2500;&#x2500;</div>

      <p className="invitation-host">&#x2014;&ensp;Lord Edmund Hargrove</p>
      <p className="invitation-footer">Hargrove Manor &nbsp;&#x2022;&nbsp; Devonshire, England</p>
    </article>
  )
}
