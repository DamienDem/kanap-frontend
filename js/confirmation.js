// On récupére L'id de la commande pour afficher le numéro de commande dur la page
let params = new URL(document.location).searchParams; 
let id = params.get("id");
let orderId = document.getElementById('orderId');
orderId.textContent = id;
