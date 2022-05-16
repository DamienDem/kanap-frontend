// On pointe la balise utile à l'affichage des produits et on initialise la variable products
const items = document.getElementById('items');
let products = [];

// On requête L'API pour récupérer ses données que l'ont va passer à l'array products
const getProducts = async () => {
    await fetch("https://kanap-backend-damiendem.herokuapp.com/api/products")
    .then((res) => res.json())
    .then((data) => products = data)
    .catch(() => alert('error'));  
};

// Fonction qui affiche les produits contenu dans L'API
const productsDisplay = async () => {
    await getProducts ();
    items.innerHTML = products.map((product) => 
    `
    <a href="./html/product.html?id=${product._id}">
    <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
    </article>
    </a>
    `)
    .join("");
}
productsDisplay();




