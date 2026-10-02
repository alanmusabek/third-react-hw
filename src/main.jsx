import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Header from './components/Header.jsx';
import LibrarySummary from './components/LibrarySummary.jsx';
import BookCard from './components/BookCard.jsx';
import AddBook from './components/AddBook.jsx';
import Intro from './components/Intro.jsx';
import ToolBar from './components/ToolBar.jsx';

const initialBooks = [
  { id: 'b1', title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction', pages: 304, status: 'Reading', color: 'violet', revision: 0 },
  { id: 'b2', title: 'Atomic Habits', author: 'James Clear', genre: 'Personal growth', pages: 320, status: 'Reading', color: 'sand', revision: 0 },
  { id: 'b3', title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', genre: 'Sci-fi', pages: 160, status: 'To read', color: 'green', revision: 0 },
  { id: 'b4', title: 'The Creative Act', author: 'Rick Rubin', genre: 'Creativity', pages: 432, status: 'Finished', color: 'rose', revision: 0 },
];
const statuses = ['To read', 'Reading', 'Finished'];


function App() {
  const [books, setBooks] = useState(initialBooks);
  const [filter, setFilter] = useState('All books');
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  console.log('[App render]', {filter, search, order: books.map(b => b.id)});
  
  const matches = b => (filter === 'All books' || b.status === filter) && `${b.title} ${b.author}`.toLowerCase().includes(search.trim().toLowerCase());
  
  const shown = books.filter(matches).length;
  const updateStatus = (id, status) => setBooks(list => list.map(b => b.id === id ? {...b, status} : b));
  const reset = id => setBooks(list => list.map(b => b.id === id ? {...b, revision: b.revision + 1} : b));
  const add = fields => { setBooks(list => [...list, {...fields, id: crypto.randomUUID(), status: 'To read', color: ['violet','sand','green','rose'][list.length % 4], revision: 0}]); setAdding(false); setFilter('All books'); setSearch(''); };
  return <>
    <Header />
  <main>
    <Intro adding={adding} onToggle={() => setAdding(value => !value)} />
    <LibrarySummary books={books} />

    {adding && <AddBook onAdd={add} onCancel={() => setAdding(false)}/>}
    <section className="shelf">
      <div className="shelf-heading">
        <h2>Your bookshelf <span>{books.length}</span>
        </h2>
        <span className="muted">Pick up where you left off.</span>
      </div>
      
      <ToolBar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} onReverse={() => setBooks(list => [...list].reverse())} />
      
      <p className="result-count" aria-live="polite">{shown} {shown === 1 ? 'book' : 'books'} on this shelf</p>
      
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
      <div className="book-grid">
        {books.map(book => <BookCard key={`${book.id}:${book.revision}`} book={book} visible={matches(book)} onStatus={updateStatus} onRemove={id => setBooks(list => list.filter(b => b.id !== id))} onReset={reset}/>)}
      </div>
      
      {shown === 0 && 
        <div className="empty">
          <h3>{books.length ? 'No books on this shelf yet.' : 'Your next story starts here.'}</h3>
          <p>{books.length ? 'Try another filter or search, or add a new book.' : 'Add your first book to begin your reading collection.'}</p>
          <button onClick={() => {setFilter('All books'); setSearch(''); setAdding(true);}}>+ Add a book</button>
        </div>}
    </section>
    <footer><span>THE READING ROOM <b> / </b> Read at your own pace.</span><span>Session pages & notes stay with each book. Reset clears both.</span></footer></main></>;
}

createRoot(document.getElementById('root')).render(<App/>);
