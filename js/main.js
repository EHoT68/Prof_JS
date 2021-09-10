
/* const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title, price) =>
  `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;


const renderProducts = list => {
  const productList = list.map(item => renderProduct(item.title, item.price));
  document.querySelector('.products').innerHTML = productList.join('');
};

renderProducts(products);*/
class ProductList {

   constructor(container = '.products') {
      this.container = container;
      this._goods = [];
      this._allProducts = [];
      this._sum = 0;

      this._fetchGoods();
      this._render();


   }

   _fetchGoods() {
      this._goods = [
         { id: 1, title: 'Notebook', price: 20000 },
         { id: 2, title: 'Mouse', price: 1500 },
         { id: 3, title: 'Keyboard', price: 5000 },
         { id: 4, title: 'Gamepad', price: 4500 },
      ];
   }

   _render() {
      const block = document.querySelector(this.container);

      for (let product of this._goods) {
         const productObject = new ProductItem(product);

         this._allProducts.push(productObject);
         block.insertAdjacentHTML('beforeend', productObject.render());
         this._sum += productObject.price;
      }
   }

}

class ProductItem {
   constructor(product, img = 'https://via.placeholder.com/200x150') {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
      this.img = img;
   }

   render() {
      return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button id="${this.id}" class="buy-btn">Купить</button>
              </div>
          </div>`;
   }
}


//Корзина

class Products extends ProductList {
   constructor(container, containerBascet = '.btn-cart') {
      super(container);
      this.containerBascet = containerBascet;
      this._bascetProducts = [];

      this.renderBascet();
   }


   renderBascet() {
      const button = document.querySelectorAll('.buy-btn');

      button.forEach(elem => {
         elem.addEventListener("click", (e) => {
            const prodId = e.currentTarget.id;
            for (let product of this._goods) {
               if (prodId == product.id) {
                  const objBascet = new ProductItem(product)
                  this._bascetProducts.push(objBascet);
                  document.querySelector('.btn-cart').insertAdjacentHTML('beforeend', objBascet.render());
               }
            }
         })
      })
   }
}
const list1 = new Products();
