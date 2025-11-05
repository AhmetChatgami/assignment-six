const loadCategories=()=>{
    const uri = "https://openapi.programming-hero.com/api/categories";
    fetch(uri)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
};

const loadItems=(id)=>{
     document.getElementById("items-container").classList.remove("hidden");
    document.getElementById("loading-spinner").classList.add("hidden");

    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    const activeButton= document.querySelectorAll(".btn-category");

    activeButton.forEach(btn=> btn.classList.remove("active"));

    const categoryButton = document.getElementById(`cat-btn-${id}`);
    console.log(categoryButton);
    categoryButton.classList.add("active")
    
    fetch(url)
    .then(res => res.json())
    .then((data) => displayItems(data.plants));
    
};

const loadItemDetails=(id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then(res => res.json())
    .then((data) => displayModal(data.plants));
};

let cart = [];
let total = 0;

const displayCategories = (categories)=>{
    // console.log(categories)
    const catConatiner = document.getElementById('category-container');
    catConatiner.innerHTML = "";
    for(let cat of categories){
        const categoryCard = document.createElement('div');
        categoryCard.innerHTML = `
        <li id="cat-btn-${cat.id}" class=" btn-category block text-black hover:bg-[#0b7a4f] hover:text-white px-3 py-2 rounded" onclick= "loadItems('${cat.id}')">${cat.category_name}
          </li>`;

          catConatiner.appendChild(categoryCard);
    }
};

const displayItems=(items)=>{
console.log(items);
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = "";
    
    items.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.innerHTML = `
        <div onclick="loadItemDetails(${item.id})" class="bg-white rounded-lg shadow-sm p-4">
          <div class="bg-gray-200 h-40 rounded mb-3"><img src="${item.image}" class="w-full h-full object-cover rounded food-img"></div>
          <h4 class="font-semibold food-title">${item.name}</h4>
          <p class="text-sm text-gray-600 mb-2">
            ${item.description}
          </p>
          <div class="flex justify-between items-center">
            <span class="bg-[#DCFCE7] text-[#15803D] font-semibold text-xs px-3 py-1 rounded-full">${item.category}</span>
            <span class="text-gray-800 font-semibold food-Price">৳${item.price}</span>
          </div>
          <button onclick="addToCart(this)" class="w-full mt-3 bg-[#0b7a4f] text-white rounded-full py-2 text-sm hover:bg-[#0d9660]">
            Add to Cart
          </button>
        </div>
        `;
        itemsContainer.append(itemCard);
    });


    document.getElementById("items-container").classList.remove("hidden");
    document.getElementById("loading-spinner").classList.add("hidden");

};

const displayModal=(item)=>{
  console.log(item)
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <div class="modal-box max-w-2xl rounded-lg">
  <div>
        <h2 class="text-2xl font-bold p-4">${item.name}</h2>
  </div>

   <div class="p-4 mb-4 max-h-25 max-w-2xl overflow-auto">
        <img src="${item.image}">
      </div>
      <p class="p-4">Details: ${item.description}</p>
      <p class="p-4 font-semibold">${item.category}</p>
      <p class="p-4">৳${item.price}</p>
   </div>
  `;
  document.getElementById("my_modal_3").showModal();
};

loadCategories();

// document.getElementById("items-container").addEventListener("click", (e)=>{
//   console.log(e.target);
// });

const addToCart=(btn)=>{
  const card = btn.parentNode.parentNode;
  const foodTitle= card.querySelector(".food-title").innerText;
  // const foodImg= card.querySelector(".food-img").src;
  const foodPrice= card.querySelector(".food-Price").innerText;
  console.log(foodTitle, foodPrice);
  const selectedItem = {
    foodTitle:foodTitle,
    // foodImg:foodImg,
    foodPrice:foodPrice,
  };
  cart.push(selectedItem);
  total= total+foodPrice;
  displayCart(cart);
  displayTotal(total);

};
const displayTotal=(val)=>{
  document.getElementById("cart-total").innerHTML= val;
}

const displayCart=()=>{
  const cartContainer= document.getElementById('cart-container');
  cartContainer.innerHTML= "";

  for(let item of cart){

    const newItem= document.createElement("div");
    newItem.innerHTML= `
   
        <ul class="space-y-3 text-sm">
          <li class="flex justify-between items-center bg-[#F0FDF4] w-full rounded-md">
            <div class="p-3 w-full">
              <p class="item-title font-medium">Mango Tree</p>
              <p class="text-gray-500">৳500 × 1</p>
            </div>
            <button onclick= "removeCart(this)" class="text-gray-400 hover:text-red-500 text-2xl p-3">×</button>
          </li>

        </ul>

    `;

    cartContainer.append(newItem);
  }

};

const removeCart=(btn)=>{
  const item= btn.parentNode;
  const foodTitle= item.querySelector(".item-title");
  console.log(btn);
};