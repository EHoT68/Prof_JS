Vue.component('cart', {
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
            <div class="cart-block">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
            <div class="cart-item">
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
            </div>
    `
});
