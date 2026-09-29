import React from 'react';

export default function LibrarySummary({ books }){
  return(
    <section className="stats" aria-label="Library summary">
      <div>
        <span>ON YOUR SHELF</span>
        <strong>{books.length.toString().padStart(2,'0')}</strong>
      </div>
      <div>
        <span>CURRENTLY READING</span>
        <strong>{books.filter(b => b.status === 'Reading').length.toString().padStart(2,'0')}</strong>
      </div>
      <div>
        <span>FINISHED STORIES</span>
        <strong>{books.filter(b => b.status === 'Finished').length.toString().padStart(2,'0')}</strong>
      </div>
      <p>“A reader lives a thousand lives<br/>before he dies.”<small>— George R. R. Martin</small></p>
    </section>
  );
}