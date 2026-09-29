import React, { useState } from 'react';

const statuses = ['To read', 'Reading', 'Finished'];
export default function BookCard({ book, visible, onStatus, onRemove, onReset }) {
  const [sessionPages, setSessionPages] = useState(0);
  const [note, setNote] = useState('');
  console.log('[BookCard render]', book.id, { revision: book.revision, sessionPages, visible });
  // Filtering hides the existing component; it does not unmount it.
  return <article className="book-card" hidden={!visible}>
    <div className={`cover ${book.color}`}><span className="cover-genre">{book.genre}</span><div className="cover-art" aria-hidden="true">◒</div><strong>{book.title}</strong><span>{book.author}</span></div>
    <div className="book-content"><div className="book-meta"><span>{book.genre}</span><span>{book.pages} pages</span></div>
      <h3>{book.title}</h3><p className="author">by {book.author}</p>
      <label className="status-label">Shelf <select aria-label={`Status for ${book.title}`} value={book.status} onChange={e => onStatus(book.id, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
      <div className="session"><div><span className="eyebrow">THIS SESSION</span><p><strong>{sessionPages}</strong> pages read</p></div><button className="plus" aria-label={`Log 10 pages for ${book.title}`} disabled={sessionPages >= book.pages} onClick={() => setSessionPages(p => Math.min(book.pages, p + 10))}>+10</button></div>
      <label className="note-label">A thought to keep<input aria-label={`Note for ${book.title}`} placeholder="What stayed with you?" value={note} onChange={e => setNote(e.target.value)}/></label>
      <div className="card-footer"><button onClick={() => onReset(book.id)}>↺ Reset session</button><button className="remove" aria-label={`Remove ${book.title}`} onClick={() => onRemove(book.id)}>Remove</button></div>
    </div>
  </article>;
}