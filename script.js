function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('output');
  try {
    const parsed = JSON.parse(input);
    output.textContent = JSON.stringify(parsed, null, 2);
  } catch (e) {
    output.textContent = "Invalid JSON:\n" + e.message;
  }
}
