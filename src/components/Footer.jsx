import { BRAND } from '../config/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">{BRAND.name}</p>
        <p className="footer__disclaimer">
          These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease. {"\u00a9"}{' '}
          {new Date().getFullYear()} {BRAND.name} Skincare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
