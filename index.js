const fetchCryptoData = async () => {
    try {
        console.log("Attempting to connect to the market API...");
        
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,euro-coin&vs_currencies=usd&include_24hr_change=true');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const cleanData = await response.json();
        
    
        const btcPrice = cleanData.bitcoin.usd;
        const ethPrice = cleanData.ethereum.usd;
        const eurPrice = cleanData['euro-coin'].usd; 
        
        const btcChange = cleanData.bitcoin.usd_24h_change;
        const ethChange = cleanData.ethereum.usd_24h_change;
        const eurChange = cleanData['euro-coin'].usd_24h_change;

       
        const formattedBtc = parseFloat(btcPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        const formattedEth = parseFloat(ethPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        const formattedEur = parseFloat(eurPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        
     
        document.querySelector('.btc-table-price').innerText = formattedBtc;
        document.querySelector('.eth-table-price').innerText = formattedEth;
        document.querySelector('.eur-table-price').innerText = formattedEur;

        const btcTableChange = document.querySelector('.btc-table-change');
        const ethTableChange = document.querySelector('.eth-table-change');
        const eurTableChange = document.querySelector('.eur-table-change');
        
        btcTableChange.innerText = `${btcChange.toFixed(2)}%`;
        ethTableChange.innerText = `${ethChange.toFixed(2)}%`;
        eurTableChange.innerText = `${eurChange.toFixed(2)}%`;

        // DYNAMIC COLOR CODING
        btcTableChange.style.color = btcChange >= 0 ? '#22c55e' : '#ef4444';
        ethTableChange.style.color = ethChange >= 0 ? '#22c55e' : '#ef4444';
        eurTableChange.style.color = eurChange >= 0 ? '#22c55e' : '#ef4444';
        
    } catch (error) {
        console.error("Critical Dashboard Error: ", error.message);
    }
};

fetchCryptoData();

setInterval(fetchCryptoData, 150000);