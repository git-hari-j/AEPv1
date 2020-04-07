function addToCart() {
	var cart = [];
	var currency = localStorage.brandcurrency;
	var price = Number(_satellite.getVar("productPrice").replace(currency,""));  // get selected product's price
	var name = _satellite.getVar("productName");  // get product name
	var qty = 1;  // get quantity
	var url = _satellite.getVar("pageUrl");
	var imageUrl = _satellite.getVar("productImageUrl");

	var item = {productName: name, productPrice: price, productQty: qty, productUrl: url, productImageUrl: imageUrl};
	
	if(localStorage.getItem("cart") === null){
		//console.log("Cart doesn't exist: ");
		cart.push(item);
	}else{
		cart = JSON.parse(localStorage.getItem("cart"));
		for (var i in cart) {
			//console.log(cart[i].productName);
			if(cart[i].productName == name){
				cart[i].productQty += qty; 
				saveCart(cart);
				showCart(cart);
				addToCartP();
				return
	        }
	    }
		cart.push(item);
	}    	
	saveCart(cart);
	showCart(cart);
	addToCartP();
}

function addToCartP() {
	var cartP = [];
	var currency = localStorage.getItem("brandcurrency");
	var channel = "Desktop";
	var price = Number(_satellite.getVar("productPrice").replace(currency,""));
	var productName = _satellite.getVar("productName");  // get product name
	var qty = 1;  // get quantity
	var url = _satellite.getVar("pageUrl");
	var imageUrl = _satellite.getVar("productImageUrl");
	var itemP = {SKU: productName, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};

	if(localStorage.getItem("cartP") === null){
		cartP.push(itemP);
	}else{
		cartP = JSON.parse(localStorage.getItem("cartP"));
		//var count = Object.keys(cart).length;
		//console.log("Cart exists - " + count + " items in cart.");
		for (var i in cartP) {
			//console.log(cart[i].productName);
			if(cartP[i].SKU == productName){
				cartP[i].quantity += qty; 
				saveCartP(cartP);
				return
	        }
	    }
		cartP.push(itemP);
	}    	
	saveCartP(cartP);
}

function thisAddToCart() {
		var thisAddToCart = [];
		var currency = localStorage.getItem("brandcurrency");
		var channel = "Desktop";
		var price = Number(_satellite.getVar("productPrice").replace(currency,""));
		var productName = _satellite.getVar("productName");  // get product name
		var qty = 1;  // get quantity
		var imageUrl = _satellite.getVar("productImageUrl");
		var thisAddToCartP = {SKU: productName, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};

		thisAddToCart.push(thisAddToCartP);
	
		if(localStorage.getItem("thisAddToCart") !== null){
			localStorage.removeItem("thisAddToCart")
			localStorage.setItem("thisAddToCart", JSON.stringify(thisAddToCart));
		}else{
			localStorage.setItem("thisAddToCart", JSON.stringify(thisAddToCart));
		}
}

function thisProductView() {
		localStorage.removeItem("thisProductView");
		var thisProductView = [];
		var currency = localStorage.getItem("brandcurrency");
		var channel = "Desktop";
		var price = Number(_satellite.getVar("productPrice").replace(currency,""));
		var productName = _satellite.getVar("productName");  // get product name
		var qty = 1;  // get quantity
		var imageUrl = _satellite.getVar("productImageUrl");
		var thisProductViewP = {SKU: productName, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};

		thisProductView.push(thisProductViewP);
		
		localStorage.setItem("thisProductView", JSON.stringify(thisProductView));

		_satellite.track('productview');
}

function saveCart(cart) {
	//*************************************************
	// Activate Direct Call Rule in Launch
	//*************************************************
	_satellite.track('addtocart');

	console.log(">>>>> Product Added To Cart");
	if (window.localStorage){
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	if(localStorage.getItem("cart") !== null){
        cart = JSON.parse(localStorage.getItem("cart"));
        var count = 0;

        for (var i in cart) {
            count += cart[i].productQty; 
        }

        console.log("Cart exists - " + count + " items in cart.");
        if(count > 0){
            $("#carticonqty").text(count);
            $("#carticonqty").attr("style", "display:block;");
        }
    }
}

function saveCartP(cart) {
	localStorage.setItem("cartP", JSON.stringify(cart));
}

function showCart(cart) {
	var count = Object.keys(cart).length;
	//console.log("Show Cart - " + count + " items in cart.");
	for (var i in cart) {
		var item = cart[i];
		console.log("Product in Cart " + i + " - Name: " + item.productName + " - Price: " +  item.productPrice + " - Qty: " + item.productQty + " - URL: " + item.productUrl + " - Image: " + item.productImageUrl);
	}
}