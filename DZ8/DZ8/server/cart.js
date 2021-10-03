const add = (cart, req) => {
  cart.contents.push(req.body);
  cart.countGoods++;
  cart.amount += +req.body.price;
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (+req.body.quantity > 0) {
    cart.countGoods++;
    cart.amount += +req.body.itemPrice;
    find.quantity += +req.body.quantity;
  } else {
    cart.countGoods--;
    cart.amount += -req.body.itemPrice;
    find.quantity -= -req.body.quantity;
  };
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  cart.countGoods--;
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  cart.amount -= req.body.price;
  if (find) {
    cart.contents.splice(cart.contents.indexOf(find), 1);
  };
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
