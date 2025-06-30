const newNoteBtn = document.getElementById('newNoteBtn');
const noteArea = document.getElementById('noteArea');
const noteList = document.getElementById('noteList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let activeNote = notes[0] || { title: 'Untitled', content: '' };

function renderNotes() {
  noteList.innerHTML = '';
  notes.forEach((note, i) => {
    const li = document.createElement('li');
    li.textContent = note.title || `Note ${i + 1}`;
    li.classList.toggle('active', note === activeNote);
    li.addEventListener('click', () => switchNote(i));
    noteList.appendChild(li);
  });
}

function switchNote(index) {
  activeNote = notes[index];
  noteArea.innerHTML = activeNote.content;
  renderNotes();
}

function saveCurrentNote() {
  activeNote.content = noteArea.innerHTML;
  localStorage.setItem('notes', JSON.stringify(notes));
}

noteArea.addEventListener('input', saveCurrentNote);

newNoteBtn.addEventListener('click', () => {
  const newNote = { title: `Note ${notes.length + 1}`, content: '' };
  notes.push(newNote);
  activeNote = newNote;
  noteArea.innerHTML = '';
  renderNotes();
  saveCurrentNote();
});

window.addEventListener('load', () => {
  renderNotes();
  noteArea.innerHTML = activeNote.content || 'Start typing...';
});
