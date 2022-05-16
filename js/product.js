//On récupére l'id dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");

// initialisation du produit affiché sur la page
let product = [];

// On pointe les sélecteurs pour pouvoir afficher les produits
const productImage = document.querySelector('.item__img');
const produtcTitle = document.getElementById('title');
const produtcPrice = document.getElementById('price');
const productDescription = document.getElementById('description');
const colorSelect = document.getElementById('colors');
const addToBasket = document.getElementById('addToCart');
const quantitySelect = document.getElementById("quantity");

// Récupére les articles deja présent dans le panier
let cart = JSON.parse(localStorage.getItem('cart')) 

// Récupération du produit avec l'ID
const getProduct = async () => {
    await fetch("https://kanap-backend-damiendem.herokuapp.com/api/products/" + id)
    .then((res) => res.json())
    .then((data) => product = data) 
    .catch(() => alert('error'));
};

// Affichage du produit
const productDisplay = async () => {
    await getProduct();
    productImage.innerHTML = `<img src= "${product.imageUrl}" alt="${product.altTxt}, ${product.name}">`;
    produtcTitle.innerHTML = `${product.name}`;
    produtcPrice.innerHTML = `${product.price}`;
    productDescription.innerHTML = `${product.description}`;
    colorSelect.innerHTML = product.colors.map((color) =>
     `
     <option value="${color}"> ${color} </option>
    `)
    .join("");
};

// On écoute l'événement clic sur le bouton ajouter au panier
const addToCart = async () => {
    await productDisplay();
    addToBasket.addEventListener('click', () => {
// On déclare une variable contenant un objet produit ajouté avec toute les caratéristiques
        let productAdd = {
            name: `${product.name}`,
            productId : id,
            imageUrl : `${product.imageUrl}`,
            alt :`${product.altTxt}`,
            colorProduct : colorSelect.value,
            quantityTotal : parseInt(quantitySelect.value,10), 
            price: `${product.price}`
        };
// Création d'un condition pour modifier la quantité si le produit est déja présent dans le panier       
    if(cart)
    {
        productInCart = false;
        for(let i=0; i<cart.length ; i++)
        {
            if(cart[i].productId == productAdd.productId && cart[i].colorProduct == productAdd.colorProduct)
            {
                cart[i].quantityTotal += productAdd.quantityTotal;
                productInCart = true;
                break;
            }
        }
            if(!productInCart)
        {
            cart.push(productAdd);
        }   
    }
    else
    {
        cart = [productAdd];
    }
    localStorage.setItem('cart',JSON.stringify(cart));  // Ajoute le produit au local storage 
    alert('Le produit a été ajouté au panier')
    });
}
addToCart();




