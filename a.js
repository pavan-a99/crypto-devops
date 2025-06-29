const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
const container = document.getElementById('coinContainer');

window.onload = () => {
  fetchCoins();
};

async function fetchCoins() {
  const res = await fetch(API);
  const data = await res.json();
  showCoins(data);
}

function showCoins(coins) {
  container.innerHTML = "";
  coins.slice(0, 10).forEach(coin => {
    container.innerHTML += `
      <div class="coin-card">
        <img src="${coin.image}" height="30"><br/>
        ${coin.name}<br/>
        $${coin.current_price}
      </div>
    `;
  });
}

function searchCoins() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  fetch(API).then(res => res.json()).then(data => {
    const result = data.filter(c => c.name.toLowerCase().includes(query));
    showCoins(result);
  });
}