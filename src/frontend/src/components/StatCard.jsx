import './StatCard.css';

function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
      {description && <p className="stat-description">{description}</p>}
    </div>
  );
}

export default StatCard;
