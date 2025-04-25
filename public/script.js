document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const res = await fetch(`/api/search`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query })
    });
    const results = await res.json();
    const ul = document.getElementById('results');
    ul.innerHTML = results;
});
