import React from "react";
import Tabs from './Tabs.jsx';
import Tools from './Tools.jsx';

export default function ToolBar({ filter, onFilter, search, onSearch, onReverse }){
  return(
    <div className="toolbar">
        <Tabs filter={filter} onFilter={onFilter} />
        <Tools search={search} onSearch={onSearch} onReverse={onReverse} />
    </div>
  );
}