import React from 'react'
import Link from 'gatsby-link'
import s from './Header.module.css';
console.log(s);

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
