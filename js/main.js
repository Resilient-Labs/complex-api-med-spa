//Goal: Build a simple front-end app that uses data returned from one api to make a request to another api
//to create something that would be beneficial to a Med Spa

// Display: updates the page
class Display {
  constructor() {
    this.message = document.getElementById("message");
    this.productSection = document.getElementById("product-section");
    this.image = document.getElementById("product-image");
    this.name = document.getElementById("product-name");
    this.brand = document.getElementById("product-brand");
    this.ingredientsList = document.getElementById("ingredientsList");
    this.ingredientInfo = document.getElementById("ingredient-info");
  }

  showMessage(message) {
    this.message.textContent = message;
  }


  showProduct(product) {
    this.image.src = product.image_front_url;
    this.name.textContent = product.product_name_en || product.product_name;
    this.brand.textContent = product.brands;
    this.ingredientsList.innerHTML = "";

    const ingredients = product.ingredients_text; 

    ingredients.split(",").forEach(ingredient => {
      const item = document.createElement("li");
      item.textContent = ingredient.trim();
      this.ingredientsList.appendChild(item);
    });
  }

  showIngredient(data) {
    this.ingredientInfo.textContent = data.title + ": " + data.extract;
  }
}



// ProductAPI: API 1 - gets a product from Open Beauty Facts
class ProductAPI {
  constructor(display) {
    this.display = display;
  }

  search(searchTerm) {

    fetch("https://world.openbeautyfacts.org/cgi/search.pl?search_terms=" + searchTerm + "&search_simple=1&action=process&json=1&page_size=1")
      .then(response => response.json())
      .then(data => {
        if (data.products.length === 0) {
          this.display.showMessage("Product not found.");
          return;
        }
        this.display.showProduct(data.products[0]);
        this.display.showMessage("Product found!");
      })
      .catch(() => this.display.showMessage("Error."));
  }
}

// IngredientAPI: API 2 - uses ingredient name from API 1 to search Wikipedia
class IngredientAPI {
  constructor(display) {
    this.display = display;
  }

  
  search(ingredientName) {
    const url =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(ingredientName); //encode solves the issue with correct url/query to make sure wikipedia 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.extract) {
          this.display.showMessage("Ingredients not found.");
          return;
        }


        this.display.showIngredient(data);
        this.display.showMessage("Ingredients found!");


      })
      .catch(() => this.display.showMessage("Error"));
  }
}

// App: connects the page to the APIs
class App {
  constructor() {
    this.display = new Display();
    this.productAPI = new ProductAPI(this.display);
    this.ingredientAPI = new IngredientAPI(this.display);
    this.input = document.getElementById("search-input");

    document.getElementById("search-button").addEventListener("click", () => 
    this.search());

    // Clicking an ingredient sends its name to API 2
    this.display.ingredientsList.addEventListener("click", event => {
      //
      if (event.target.tagName === "LI") {
        this.ingredientAPI.search(event.target.textContent);
      }
    });
  }

  search() {
    const searchTerm = this.input.value.trim();

    if (searchTerm === "") {
      this.display.showMessage("Please enter a product.");
      return;
    }

    this.productAPI.search(searchTerm);
  }
}
//Starts the app
new App();