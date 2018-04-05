import React from 'react'
import s from './Header.module.css';

const Header = () => (
  <header className={`mdl-layout__header ${s.header}`}>
    <div className={`mdl-layout__header-row ${s.row}`}>
      <div className={`mdl-layout-title ${s.title}`} to="/">
        female speakers @ tech conferences
          </div>
      <div className="mdl-layout-spacer"></div>
    </div>
  </header>
)

export default Header
