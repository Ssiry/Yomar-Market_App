useEffect(() => {
    fetch('http://localhost:5001/api/endpoint')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
}, []);
