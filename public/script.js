// public/script.js
document.getElementById('combineButton').addEventListener('click', async () => {
    const word1 = document.getElementById('word1').value;
    const word2 = document.getElementById('word2').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    // Show loading animation
    resultDiv.innerText = '';
    loadingDiv.style.display = 'block';

    try {
        const response = await fetch('/combine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word1, word2 })
        });

        const data = await response.json();
        // Hide loading animation and show result
        loadingDiv.style.display = 'none';
        resultDiv.innerText = data.result;
    } catch (error) {
        loadingDiv.style.display = 'none';
        resultDiv.innerText = 'Error generating content.';
    }
});
