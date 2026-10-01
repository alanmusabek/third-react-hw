# The Reading Room

React homework — Task 3: Rendering and State.

## Features

- Add books with a title, author, page count, and genre; remove any book.
- Change a book's shelf between To read, Reading, and Finished.
- Log pages in increments of ten (capped at the book's page count) and write a local session note.
- Filter by shelf or search by title/author; reverse the list.
- Reset a single book's session pages and note by changing its React key.
- Responsive CSS, labeled controls, empty states, and render logs in the browser console.

Data is intentionally held in React memory. Reloading the page restores the sample collection. Session pages are independent of shelf status: marking a book Finished does not automatically change its session count.
