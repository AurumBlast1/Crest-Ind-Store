<template>
  <div class="update-product">
    <div class="row">
      <form @submit.prevent="updateProduct" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="type" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="number" v-model="price" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="seller" required />
          </div>
        </div>

        <button type="submit" class="btn">Update Product</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from '../database/init.js';

export default {
  data() {
    return {
      name: '',
      type: '',
      price: '',
      seller: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection('product')
      .where('name', '==', to.params.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((emp) => {
            emp.name = doc.data().name;
            emp.type = doc.data().type;
            emp.price = doc.data().price;
            emp.seller = doc.data().seller;
          });
        });
      });
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      db.collection('product')
        .where('name', '==', this.$route.params.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.name = doc.data().name;
            this.type = doc.data().type;
            this.price = doc.data().price;
            this.seller = doc.data().seller;
          });
        });
    },
    updateProduct() {
      db.collection('product')
        .where('name', '==', this.$route.params.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                name: this.name,
                type: this.type,
                price: this.price,
                seller: this.seller,
              })
              .then(() => {
                this.$router.push({
                  name: 'ViewProduct',
                  params: { name: this.name },
                });
              });
          });
        });
    },
  },
};
</script>

<style>
.update-product {
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 100px;
  text-align: left;
}
</style>
