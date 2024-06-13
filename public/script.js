// public/script.js
document.getElementById('combineButton').addEventListener('click', async () => {
    const word1 = document.getElementById('word1').value;
    const word2 = document.getElementById('word2').value;
    const loading = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';
    loading.style.display = 'block';

    const response = await fetch('/combine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word1, word2 })
    });

    const data = await response.json();
    loading.style.display = 'none';

    if (data.result) {
        resultDiv.innerHTML = `Combined result: ${data.result} ${data.emoji || ''}`;
    } else {
        resultDiv.innerHTML = 'Error combining words.';
    }
});
