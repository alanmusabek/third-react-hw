import React from "react";

export default function Intro({ adding, onToggle }){
  return(
    <section className="intro">
      <div>
        <div className="eyebrow">YOUR PERSONAL LIBRARY</div>
        <h1>Make room for<br/>
        <em>one more chapter.</em>
        </h1>
        <p>A place for your books, your progress, and the thoughts in between.</p>
      </div>
      <button className="primary" onClick={onToggle}>{adding ? '− Close form' : '+ Add a book'}</button>
    </section>
  );
}