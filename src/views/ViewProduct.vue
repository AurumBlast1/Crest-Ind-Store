<template>
  <div class="view-product">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Type : {{ type }}</li>
      <li class="collection-item">Price : {{ price }}</li>
      <li class="collection-item">Seller : {{ seller }}</li>
    </ul>

    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteProduct" class="btn green">Buy</button>

    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'UpdateProduct', params: { name: name } }"
        class="btn-floating btn-large green"
      >
        <i class="material-icons">create</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '../database/init.js';

export default {
  data() {
    return {
      name: null,
      type: null,
      price: null,
      seller: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection('product')
      .where('name', '==', to.params.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          next((vm) => {
            vm.name = data.name;
            vm.type = data.type;
            vm.price = data.price;
            vm.seller = data.seller;
          });
        } else {
          // Handle the case when the product with the given name is not found
          next(false);
        }
      });
  },

  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      const productName = this.$route.params.name;
      console.log('Product Name:', productName); // Add this log to check the value

      if (productName) {
        db.collection('product')
          .where('name', '==', productName)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.name = doc.data().name;
              this.type = doc.data().type;
              this.price = doc.data().price;
              this.seller = doc.data().seller;
            });
          })
          .catch((error) => {
            console.error('Error fetching product:', error);
          });
      } else {
        console.error('Product name is undefined');
      }
    },
    deleteProduct() {
      if (confirm('Do You Want To Buy This Product?')) {
        db.collection('product')
          .where('name', '==', this.$route.params.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/');
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.view-product {
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 100px;
  text-align: left;
}
button {
  margin-left: 10px;
}
</style>
