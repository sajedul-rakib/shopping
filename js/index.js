const baseUrl = "https://fakestoreapi.com";

async function callApi(apiUrl) {
  console.log("api called");

  try {
    const response = await fetch(apiUrl);

    if (response.status == 200) {
      const res = await response.json();
      return res;
    } else {
      const res = await response.json();
      return res;
    }
  } catch (e) {
    return e;
  }
}

async function loadAllData() {
  const productContainer = document.querySelector(".products");
  const productData = await callApi(`${baseUrl}/products`);

  const data = JSON.parse(JSON.stringify(productData));

  productContainer.innerHTML = data
    .map((product) => {
      return `<div class="card" style="width: 18rem;">
     <img src="${product.image}" class="card-img-top img-fluid mx-auto" style="width:200px;height:200px" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            
            <div class="d-flex flex-row align-items-center justify-content-around">
                <a href="#" class="btn btn-primary" onclick="addToCart('${product.image}','${product.title},'${product.price}')">Add to Cart</a>
                <p class="m-0 p-0">Price: $${product.price}</p>
            </div>
        </div>
   </div>`;
    })
    .join("");
}
const cartList = [];
function addToCart(image, title, price) {
  const cartContainer = document.querySelector(".cartList");
  cartList.push({ image, title, price, unit: 1 });
  let totalItem = cartList.length;
  const totalOrderItem = document.querySelector(".total-order-item");
  const totalPriceContainer = document.querySelector(".totalPrice");
  totalOrderItem.innerText = totalItem;
  let totalPrice = 0;

  cartContainer.innerHTML = cartList
    .map((pr) => {
      totalPrice += pr.price * pr.unit;
      return `<div class="d-flex flex-row justify-content-between align-items-center mb-2 style="width:100% !important"">
                          <div class="d-flex flex-row justify-content-between align-items-center mb-2 style="width:50% !important"" >
                               <img src="${pr.image}" class="card-img-top img-fluid mx-auto" style="width:50px;height: 60px" alt="...">
                               <p class=text-break">${pr.title}</p>
                          </div>
                          <h5 style="width:20% !important">${pr.unit}</h5>
                          <h5 class="text-center" style="width:20% !important">${pr.price}</h5>
                      </div>`;
    })
    .join("");
  totalPriceContainer.innerHTML = totalPrice.toFixed(2);
}

loadAllData();
