function saveTextAsFile() {
  const note = document.getElementById('note').innerText.trim();
  if (!note) {
    alert("Nothing to save!");
    return;
  }

  const blob = new Blob([note], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'note.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}



document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');

    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
      sec.style.display = 'none';
    });

    // Show the selected section
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';

      // If the notes section is shown, update its content
      if (targetId === 'notes-section') {
        const noteContent = document.getElementById('note').innerText;
        const notesDisplay = document.getElementById('notes-display');
        if (notesDisplay) {
          notesDisplay.innerText = noteContent;
        }
      }
    }
  });
});
