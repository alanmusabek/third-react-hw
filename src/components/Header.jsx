import React from 'react';

export default function Header() {
  return (
  <header className="topbar">
    <a className="brand" href="#">
      <span className="brand-icon">▤</span> 
      The Reading Room
    </a>
    <span className="top-caption">A LITTLE SPACE FOR BIG IDEAS</span>
    <span className="avatar" aria-label="Personal library">R</span>
  </header>);
}