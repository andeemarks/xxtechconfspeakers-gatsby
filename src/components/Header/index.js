import React from 'react'
import s from './Header.module.css';

const Header = () => (
  <header className={`mdl-layout__header ${s.header}`}>
    <div className={`mdl-layout__header-row ${s.row}`}>
      <div className={`mdl-layout-title ${s.title}`} to="/">
        female speakers @ tech conferences
      </div>
    </div>
    <div className={`mdl-layout__header-row ${s.row}`}>
      As a generalist software geek in Australia/NZ, there is not a lot of choice when it comes to conferences. One advantage of the limited menu we have is that it is relatively easy to track trends of the available conferences over time and one such trend I am particularly interested in is how many female speakers get an opportunity to present at these conferences.

      <strong>Disclaimer:</strong><em>Gender presence is only one form of diversity to consider and the approach I’ve used is unscientific and assuming a <a href="https://en.wikipedia.org/wiki/Gender_binary">gender binary</a> world, but I hope you find this information useful even with the shortcomings in my method.</em>

    </div>
  </header>
)

export default Header
