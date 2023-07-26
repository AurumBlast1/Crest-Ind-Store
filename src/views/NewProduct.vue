<template>
  <div class="new-product">
    <div class="row">
      <form @submit.prevent="saveProduct" class="col s12">
        <div class="row">
          <label>Name</label>
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <label>Type</label>
          <div class="input-field col s12">
            <input type="text" v-model="type" required />
          </div>
        </div>
        <div class="row">
          <label>Price</label>
          <div class="input-field col s12">
            <input type="number" v-model="price" required />
          </div>
        </div>
        <div class="row">
          <label>Seller</label>
          <div class="input-field col s12">
            <input type="text" v-model="seller" required />
          </div>
        </div>

        <button type="submit" class="btn">Add Product</button>
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
      name: null,
      type: null,
      price: null,
      seller: null,
    };
  },
  methods: {
    saveProduct() {
      db.collection('product')
        .add({
          name: this.name,
          type: this.type,
          price: this.price,
          seller: this.seller,
        })
        .then((docRef) => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.new-employee {
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 100px;
  text-align: left;
}
label {
  text-align: left;
  font-size: 14px;
  color: black;
}
button {
  margin-right: 10px;
}
</style>
<style>
.new-employee {
  margin-top: 40px;
  margin-left: 130px;
  margin-right: 100px;
  text-align: left;
}
label {
  text-align: left;
  font-size: 14px;
  color: black;
}
button {
  margin-right: 10px;
}
</style>
