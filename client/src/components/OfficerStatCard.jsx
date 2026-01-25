import "../styles/OfficerStatCard.css"

const OfficerStatCard = ({iconType, statValue, statLabel, statFillWidth, statColor}) => {
  return (
    <div className="officer-stat-card" style={{borderLeft: `5px solid ${statColor}`}}>
  <div className="officer-stat-top">
    <div className="officer-stat-icon" style={{color: `${statColor}`}}>{iconType}</div>
  </div>

  <div className="officer-stat-value">{statValue}</div>
  <div className="officer-stat-label">{statLabel}</div>

  <div className="officer-stat-bar">
    <div className="officer-stat-bar-fill" style={{backgroundColor: `${statColor}`, width: `${statFillWidth}%`}}></div>
  </div>
</div>
  )
}

export default OfficerStatCard