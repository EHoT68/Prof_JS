const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
   el: '#app',
   data: {
      catalogUrl: '/catalogData.json',
      products: [],
      imgCatalog: 'https://via.placeholder.com/200x150',
      searchLine: '',
      filterBox: [],
      basketBox: [],
      invisible: true,
      counter: 0,
   },
   methods: {
      prodSum() {
         return this.sum = product.price * quantity
      },

      addProduct(good) {
         console.log(good);
         return this.basketBox.push(good)
      },

   },
   computed: {
      inputSearchValue(event) {
         return this.searchLine = event.target.value;
      },
      FilterGoods() {
         const regexp = new RegExp(this.searchLine, 'i');
         this.filterBox = this.products.filter(product => regexp.test(product.product_name));
      },
   },
   beforeCreate() {

   },
   created() {

   },
   beforeMount() {
      fetch(`${API + this.catalogUrl}`)
         .then(response => response.json())
         .then(json => {
            this.products = json;
            this.filterBox = json;
         })
   },
   mounted() {

   },
   beforeUpdate() {

   },
   updated() {

   },
   beforeDestroy() {

   },
   destroyed() {

   }
});