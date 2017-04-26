console.log("food.js loaded");

var catBtn = document.getElementById("catBtn");
var dogBtn = document.getElementById("dogBtn");

var productPage = document.getElementById("productPage");
var productItems;
var productRequest = new XMLHttpRequest();
var productRequest2 = new XMLHttpRequest();
productRequest.addEventListener("load", loadDataComplete);
productRequest.addEventListener("error", loadDataError);
productRequest2.addEventListener("load", loadDataComplete);
productRequest2.addEventListener("error", loadDataError);

function loadDataComplete(event) {
	console.log("Product Request Loaded");
	productItems = JSON.parse(event.target.responseText);
	console.log(productItems);
	pagePopulate(productItems);
}

function loadDataError(event) {
	console.log("Product Requested Failed");
}

productRequest.open("GET","dogfood.json");
productRequest2.open("GET","catfood.json");
dogBtn.addEventListener("click", function(){
	productRequest.send();
});
catBtn.addEventListener("click", function(){
	productRequest2.send();
});


function pagePopulate(object) {
	var writer = '';
	for(i in object) {
		if (i == "dog_brands") {
			writer += `<h1>Dog Food</h1>`;
		} else if(i == "cat_brands") {
			writer += `<h1>Cat Food</h1>`;
		}
		brands = object[i];
		//console.log(brandType);
		for (n in brands) {
			//console.log(brands[n]);
			writer += `<h2>`+brands[n].name+`</h2>`;
			brandType = brands[n].types;
			for (j in brandType) {
				console.log(brandType[j]);
				writer += `<p>`+brandType[j].type+`</p>`;
				volume = brandType[j].volumes;
				for(i in volume) {
					console.log(volume[i]);
					writer += `<p>`+volume[i].name+`</p>`;
					writer += `<p>`+volume[i].price+`</p>`;
				}
			}
		}
	}


	// var brands = object.dog_brands;
	// for(n=0;n<brands.length;n+=1) {
	// 	console.log(brands[n]);

	//}
	productPage.innerHTML = writer;
}