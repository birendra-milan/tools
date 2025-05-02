function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const parsed = JSON.parse(input);
    output.textContent = JSON.stringify(parsed, null, 2); // Pretty format with nesting
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function minifyJson() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const parsed = JSON.parse(input);
    output.textContent = JSON.stringify(parsed); // Minified version
  } catch (e) {
    output.textContent = "❌ Invalid JSON:\n" + e.message;
  }
}

function copyOutput() {
  const text = document.getElementById('jsonOutput').textContent;
  navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}

function clearInput() {
  document.getElementById('jsonInput').value = '';
  document.getElementById('jsonOutput').textContent = '';
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('jsonInput').value = e.target.result;
    formatJSON();
  };
  reader.readAsText(file);
}

function loadSample() {
  const sample = [
    {
      "MainId": 1111,
      "firstName": "Sherlock",
      "lastName": "Homes",
      "categories": [
        {
          "CategoryID": 1,
          "CategoryName": "Example"
        }
      ]
    },
    {
      "MainId": 122,
      "firstName": "James",
      "lastName": "Watson",
      "categories": [
        {
          "CategoryID": 2,
          "CategoryName": "Example2"
        }
      ]
    }
  ];
  document.getElementById('jsonInput').value = JSON.stringify(sample, null, 2);
  formatJSON();
}

function downloadJson() {
  const content = document.getElementById('jsonOutput').textContent;
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.json';
  a.click();
  URL.revokeObjectURL(url);
}
