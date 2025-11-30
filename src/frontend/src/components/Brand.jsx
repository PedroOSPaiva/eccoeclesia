import './Brand.css';
import logo from '../assets/ecoecclesia-logo.svg';

function Brand({ subtitle = null, layout = 'stacked', size = 'md', tone = 'default' }) {
  return (
    <div className={`brand brand--${layout} brand--${size} brand--${tone}`} aria-label="EcoEcclesia">
      <span className="brand__mark" aria-hidden="true">
        <img src={logo} alt="" loading="lazy" />
      </span>
      <span className="brand__text">
        <span className="brand__title">EcoEcclesia</span>
        {subtitle ? <span className="brand__subtitle">{subtitle}</span> : null}
      </span>
    </div>
  );
}

export default Brand;
