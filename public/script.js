async function combineItems() {
  const item1 = document.getElementById('item1').value;
  const item2 = document.getElementById('item2').value;
  const resultElement = document.getElementById('result');
  const messageElement = document.getElementById('message');
  const loadingElement = document.getElementById('loading');

  if (!item1 || !item2) {
    alert('Please enter both items');
    return;
  }

  resultElement.innerText = '';
  messageElement.innerText = '';
  loadingElement.style.display = 'inline-block';

  const response = await fetch('/combine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item1, item2 }),
  });

  const data = await response.json();
  loadingElement.style.display = 'none';
  resultElement.innerText = `Combined Result: ${data.result}`;
  messageElement.innerText = data.message;
}
