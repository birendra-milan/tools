function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj, null, 2);
  } catch (err) {
    output.textContent = "❌ Invalid JSON:\n" + err.message;
  }
}

function minifyJson() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const obj = JSON.parse(input);
    output.textContent = JSON.stringify(obj);
  } catch (err) {
    output.textContent = "❌ Invalid JSON:\n" + err.message;
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
      "planId": 1001,
      "planName": "Basic Plan",
      "price": 20,
      "data": "5GB",
      "minutes": 200,
      "sms": 100,
      "validity": "25 days"
    },
    {
      "planId": 1002,
      "planName": "Premium Plan",
      "price": 40,
      "data": "15GB",
      "minutes": "Unlimited",
      "sms": "Unlimited",
      "validity": "30 days"
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
