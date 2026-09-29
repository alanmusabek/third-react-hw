import React, { useState } from 'react';

export default function AddBook({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(200);
  const [genre, setGenre] = useState('Fiction');
  return <form className="add-form" onSubmit={e => { e.preventDefault(); if (title.trim() && author.trim()) onAdd({title: title.trim(), author: author.trim(), pages: Number(pages), genre}); }}>
    <h2>A new chapter</h2><div className="form-fields"><label>Book title<input autoFocus required maxLength={100} value={title} onChange={e => setTitle(e.target.value)}/></label><label>Author<input required maxLength={100} value={author} onChange={e => setAuthor(e.target.value)}/></label><label>Pages<input type="number" required min="1" max="10000" value={pages} onChange={e => setPages(e.target.value)}/></label><label>Genre<select value={genre} onChange={e => setGenre(e.target.value)}>{['Fiction','Personal growth','Sci-fi','Creativity','Nonfiction'].map(g => <option key={g}>{g}</option>)}</select></label></div><div className="form-actions"><button type="button" onClick={onCancel}>Cancel</button><button className="primary">Add to my shelf</button></div>
  </form>;
}
