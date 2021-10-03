Vue.component('basket-cart', {
    data() {
        return {
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            this.$parent.bascetSpan++;
            this.$parent.sumProd += product.price;
            let itemPrice = product.price;
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1, itemPrice });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.bascetSpan--;
            this.$parent.sumProd -= item.price;
            let itemPrice = item.price;
            if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: -1, itemPrice });
                find.quantity--;
            } else if (find.quantity === 1) {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`, item)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });

        this.$parent.getJson('/api/cart')
            .then(data => {
                return this.$parent.bascetSpan = data.countGoods;
            });
        this.$parent.getJson('/api/cart')
            .then(data => {
                return this.$parent.sumProd = data.amount;
            });
    },
    template: `
        <div>
            <div class="cart_block_basket">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <shop-cart-list-item1 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
                </shop-cart-list-item1>
            </div>
        </div>`
});

Vue.component('shop-cart-list-item1', {
    props: ['cartItem', 'img'],
    template: `
            <div class="shop-cart-list-item1">
                <a href="product.html"><img class="shop_cart_list_item1_img" :src="cartItem.img_product" alt="Some image""></a>
                <div class="shop_cart_list_item1_txt">
                    <a href="product.html">
                        <p class="shop_cart_item_p1">{{cartItem.product_name}}</p>
                    </a>
                    <p class="shop_cart_item_p2">Price: <span class="cart_p_span1">{{cartItem.price}}$</span></p>
                    <p class="shop_cart_item_p2">Color: Red</p>
                    <p class="shop_cart_item_p2">Size: Xl </p>
                    <p class="shop_cart_item_p2">Количество: {{cartItem.quantity}}</p>
                    <p class="shop_cart_item_p2">Сумма: <span class="cart_p_span1">{{cartItem.quantity*cartItem.price}}$</span></p>
                </div>
                <label for="cart_cloes">
                    <img class="svg_clos" src="img/cart_clos.svg" alt="clos" @click="$emit('remove', cartItem)">
                </label>
            </div>


                
    `
});
/*<div class="cart-item">
                <div class="product-bio">
                    <img :src="cartItem.img_product" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.product_name}}</p>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}}$ за единицу</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{cartItem.quantity*cartItem.price}}$</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>*/