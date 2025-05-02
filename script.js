function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  const lineNumberEl = document.getElementById('jsonLines');
  output.innerHTML = '';
  lineNumberEl.innerHTML = '';

  try {
    const json = JSON.parse(input);
    const { html, lineCount } = renderJSON(json, 0);
    output.innerHTML = html;

    // Add line numbers
    for (let i = 1; i <= lineCount; i++) {
      lineNumberEl.innerHTML += i + '<br>';
    }
  } catch (e) {
    output.innerHTML = `<span class="text-red-600">❌ Invalid JSON: ${e.message}</span>`;
  }
}

function renderJSON(value, indentLevel) {
  const indent = '&nbsp;'.repeat(indentLevel * 4);
  let html = '';
  let lineCount = 0;

  if (Array.isArray(value)) {
    html += `${indent}<span class="cursor-pointer text-blue-600" onclick="toggleNext(this)">[–]</span> [\n`;
    lineCount++;
    for (let item of value) {
      const result = renderJSON(item, indentLevel + 1);
      html += result.html;
      lineCount += result.lineCount;
    }
    html += `${indent}]\n`;
    lineCount++;
  } else if (typeof value === 'object' && value !== null) {
    html += `${indent}<span class="cursor-pointer text-blue-600" onclick="toggleNext(this)">{–}</span> {\n`;
    lineCount++;
    for (let key in value) {
      const val = value[key];
      const result = renderJSON(val, indentLevel + 1);
      html += `${'&nbsp;'.repeat((indentLevel + 1) * 4)}"<span class="text-green-700">${key}</span>": ${result.html}`;
      lineCount += result.lineCount;
    }
    html += `${indent}}\n`;
    lineCount++;
  } else {
    const formattedVal = formatValue(value);
    html += `${indent}${formattedVal}\n`;
    lineCount++;
  }

  return { html, lineCount };
}

function formatValue(val) {
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'number') return `<span class="text-blue-600">${val}</span>`;
  if (typeof val === 'boolean') return `<span class="text-purple-600">${val}</span>`;
  if (val === null) return `<span class="text-gray-500">null</span>`;
  return val;
}

// Collapse handler
function toggleNext(el) {
  const parentLine = el.parentNode;
  const nextLines = [];
  let next = parentLine.nextSibling;

  while (next && !next.textContent.trim().match(/^[}\]]/)) {
    nextLines.push(next);
    next = next.nextSibling;
  }
  if (next) nextLines.push(next);

  const isHidden = nextLines[0].style.display === 'none';
  for (let line of nextLines) {
    line.style.display = isHidden ? '' : 'none';
  }

  el.textContent = isHidden ? (el.textContent.replace('+', '–')) : (el.textContent.replace('–', '+'));
}
