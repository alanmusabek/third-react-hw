import React, { useState } from 'react';

const statuses = ['To read', 'Reading', 'Finished'];
export default function BookCard({ book, visible, onStatus, onRemove, onReset }) {
  const [sessionPages, setSessionPages] = useState(0);
  const [note, setNote] = useState('');
  console.log('[BookCard render]', book.id, { revision: book.revision, sessionPages, visible });
  // Filtering hides the existing component; it does not unmount it.
  return <article className="book-card" hidden={!visible}>
    <div className={`cover ${book.color}`}>
      <span className="cover-genre">{book.genre}</span>
      <div className="cover-art" aria-hidden="true">◒</div>
      <strong>{book.title}</strong>
      <span>{book.author}</span>
    </div>

    <div className="book-content">
      <div className="book-meta">
        <span>{book.genre}</span>
        <span>{book.pages} pages</span>
      </div>
      
      <h3>{book.title}</h3><p className="author">by {book.author}</p>
      

      {/* 
      When I select a filter, `App` checks each book with `matches(book)` and passes the result to its `BookCard` as a 
      `visible` prop. In `BookCard`, I use it on the article as `hidden={!visible}`. 
      A book that does not match disappears from the page, but its component is still rendered in the list.

      That distinction is why the page count and note survive filtering. In `main.jsx`, I call `books.map(...)` on 
      **all** books, including the hidden ones. Filtering changes a card’s `visible` value, but it does not remove the card 
      from React’s component tree. The `sessionPages` and `note` values belong to that mounted `BookCard` instance, 
      so React keeps them. The card may re-render when the filter changes; re-rendering does not reset its local state.

      Each card also has a stable key based on its book ID and revision. React uses that key to recognize the same book 
      when I filter or reverse the list. If I instead rendered only `books.filter(matches).map(...)`, 
      a nonmatching card would be unmounted. When it appeared again, it would be a new component with its local state 
      initialized to zero pages and an empty note. The Reset button demonstrates the opposite behavior deliberately: 
      it increases that book’s `revision`, changing its key. React then creates a new `BookCard` instance, which resets 
      its local page count and note while leaving the book’s parent-owned status intact.
      */}
      <label className="status-label">Shelf <select aria-label={`Status for ${book.title}`} value={book.status} onChange={e => onStatus(book.id, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
      
      <div className="session">
        <div>
          <span className="eyebrow">THIS SESSION</span>
          <p><strong>{sessionPages}</strong> pages read</p>
        </div>
        
        <button className="plus" aria-label={`Log 10 pages for ${book.title}`} disabled={sessionPages >= book.pages} onClick={() => setSessionPages(p => Math.min(book.pages, p + 10))}>+10</button>
      </div>
      
      <label className="note-label">A thought to keep<input aria-label={`Note for ${book.title}`} placeholder="What stayed with you?" value={note} onChange={e => setNote(e.target.value)}/></label>
      
      <div className="card-footer">
        <button onClick={() => onReset(book.id)}>↺ Reset session</button>
        <button className="remove" aria-label={`Remove ${book.title}`} onClick={() => onRemove(book.id)}>Remove</button>
      </div>
    </div>

  </article>;
}