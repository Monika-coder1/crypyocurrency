document.addEventListener("DOMContentLoaded", function() {
    const bitcoinElement = document.getElementById("bitcoin");
    const ethereumElement = document.getElementById("ethereum");
    const dogecoinElement = document.getElementById("dogecoin");

    // Function to fetch cryptocurrency prices
    async function fetchCryptoPrices() {
        try {
            // Fetching data from the API
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd");
            
            // Check if the response is OK (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API response data:', data); // Debug: Log the API response
            
            // Check if data contains the expected keys
            if (data.bitcoin && data.ethereum && data.dogecoin) {
                // Update the HTML with the fetched prices
                bitcoinElement.innerText = data.bitcoin.usd.toLocaleString();
                ethereumElement.innerText = data.ethereum.usd.toLocaleString();
                dogecoinElement.innerText = data.dogecoin.usd.toLocaleString();
            } else {
                console.error("Unexpected API response structure:", data);
            }
        } catch (error) {
            console.error("Error fetching cryptocurrency prices:", error);
        }
    }

    // Fetch prices on page load
    fetchCryptoPrices();

    // Optionally, refresh prices every minute
    setInterval(fetchCryptoPrices, 60000);
});
