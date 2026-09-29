import React from "react";


export default function Tools({ search, onSearch, onReverse }){
  return(
    <div className="tools">
          <input type="search" aria-label="Search books" placeholder="Search title or author…" value={search} onChange={e => onSearch(e.target.value)}/>
          <button className="reverse" onClick={onReverse}>↕ Reverse order</button>
    </div>
  );
}