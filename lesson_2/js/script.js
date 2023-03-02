// cart
function Cart(goods = []) {
  this.goods = goods;
  this.totalPrice = 0;
  this.count = 0;
}

// пересчитывает стоимость всей корзины, записывает значение в totalPrice
Cart.prototype.calculateGoodsPrice = function() {
  this.totalPrice = this.goods.reduce((sum, currentGoods) => {
    return sum += currentGoods.price - ((currentGoods.price / 100) * currentGoods.discount);
  }, 0);
}

// принимает объект или несколько, записывает его в массив goods
Cart.prototype.addGoods = function(...goodsArr) {
  goodsArr.forEach(goodsItem => {
    this.goods.push(goodsItem);
    this.calculateGoodsPrice();
    this.increaseCount();
  });
}

// метод возвращает значение свойства totalPrice
Cart.prototype.getTotalPrice = function() {
  return this.totalPrice;
}

// увеличить количество товаров count  на 1, вызывается в методе addGoods
Cart.prototype.increaseCount = function() {
  this.count += 1;
}

// Очищает полностью нашу корзину, возвращает все значения в изначальные
Cart.prototype.clear = function() {
  this.goods = [];
  this.totalPrice = 0;
  this.count = 0;
}

// Выводит в консоль JSON строку из массива items и на следующей строке выводит общую стоимость корзины
Cart.prototype.print = function() {
  console.log('JSON cart', JSON.stringify(this.goods));
  console.log('TOTAL PRICE:', this.getTotalPrice());
}

//---------------------------------
// Goods
function Goods(price, title, discount) {
  this.price = price;
  this.title = title;
  this.discount = discount;
}

function FoodGoods(price, title, discount, calorie) {
  Goods.call(this, price, title, discount);
  this.calorie = calorie;
}

Object.setPrototypeOf(FoodGoods.prototype, Goods.prototype);

function ClothingGoods(price, title, discount, material) {
  Goods.call(this, price, title, discount);
  this.calorie = material;
}

Object.setPrototypeOf(ClothingGoods.prototype, Goods.prototype);

function TechnicsGoods(price, title, discount, type) {
  Goods.call(this, price, title, discount);
  this.type = type;
}

Object.setPrototypeOf(TechnicsGoods.prototype, Goods.prototype);

// create cart
const cart = new Cart();

// create goods
const bread = new FoodGoods(70, 'BREAD', 10, 1500);
const butter = new FoodGoods(100, 'BUTTER', 0, 1500);

const socks = new ClothingGoods(200, 'SOCKS', 0, 'textile');

const phone = new TechnicsGoods(20000, 'SAMSUNG 10R', 5, 'smartphone');


cart.addGoods(bread, butter, socks, phone);

console.log('current cart', cart);
cart.print();

cart.clear();

console.log('current cart (clear)', cart);
cart.print();
