import React from "react";

const statuses = ['To read', 'Reading', 'Finished'];
export default function Tabs({ filter, onFilter }) {
  return(
    <div className="tabs" aria-label="Filter books">
      {
        ['All books', ...statuses].map(s => 
            <button key={s} aria-pressed={filter === s} className={filter === s ? 'active' : ''} onClick={() => onFilter(s)}>{s}</button>
          )
      }
    </div>
  );
}
