// quantité
var quant = document.querySelector('[name="quantity"]');

// devise source
var src = document.getElementById("source");

// devise de destination
var target = document.getElementById("target");

// bouton
var button = document.querySelector('button');

// résultat
var result = document.querySelector('[name="result"]');

var conversionRate = 0;

// fetch currency + code
function myCurrency() {
    fetch("https://v6.exchangerate-api.com/v6/3f192ad3ea2590a89eab535d/codes")
    .then(response => response.json())
    .then(data => {
        data.supported_codes.forEach(pair => {
            src.innerHTML += `
                <option value="${pair[0]}">${pair[1]}</option>
            `;
            target.innerHTML += `
                <option value="${pair[0]}">${pair[1]}</option>
            `;
        });
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    }); 
}

// convertir avec le taux de change
function convertCurrency(quantity, rate) {
    result.value = Math.round((quantity * rate) * 100) / 100;
}

// mais d'abord obtenir le taux de change
function getRate(source, destination) {
    fetch(`https://open.er-api.com/v6/latest/${source}`)
    .then(response => response.json())
    .then(data => {
        conversionRate = data.rates[destination];
        convertCurrency(quant.value, conversionRate);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });
}

// click sur button pour convertir
button.addEventListener("click", function() {
    getRate(src.value, target.value); 
})