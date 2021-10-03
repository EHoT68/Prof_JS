Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: [],
            filterCat: [],

        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.filterCat = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filterCat.push(el);
                    if (this.filtered.length < 6) {
                        this.filtered.push(el);
                    }
                }
            });
    },
    template: `
        <div class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],

    template: `
    <div class="prod_item1">
        <a class="prod_item1_link" href="product.html">
        <img class="img_prod_item" :src="product.img_product" alt="одежда">
            <div class="prod_item1_title">
                <h3 class="prod_item_h3">{{product.product_name}}</h3>
                <p class="prod_item_p">{{product.product_title}}</p>
                <h4 class="prod_item_h4">{{product.price}}$</h4>
            </div>
        </a>
        <div class="prod_add_cart">
            <div class="add_cart" @click="$root.$refs.cart.addProduct(product)">
                <img src="img/add.svg" alt="корзина">
                <p class="add_cart_p">Add to Cart</p>
            </div>
        </div>
    </div>
    `
});
