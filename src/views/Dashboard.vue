<template>
  <div class="dashboard">
    <table v-if="product.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Seller</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="products in product" :key="products.id">
          <td>{{ products.name }}</td>
          <td>{{ products.type }}</td>
          <td>{{ products.price }}</td>
          <td>{{ products.seller }}</td>
          <td>
            <router-view></router-view>
            <router-link
              class="view"
              :to="{
                name: 'ViewProduct',
                params: { name: products.name },
              }"
            >
              View
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="fixed-action-btn">
      <router-link to="/add" class="btn-floating btn-large blue">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '../database/init.js';

export default {
  name: 'Dashboard',
  data() {
    return {
      product: [],
    };
  },
  methods: {},
  created() {
    db.collection('product')
      .orderBy('name')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            type: doc.data().type,
            price: doc.data().price,
            seller: doc.data().seller,
          };
          this.product.push(data);
        });
      });
  },
};
</script>

<style scoped>
table {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid teal;
  border-radius: 3px;
  background-color: #fff;
  width: 50%;
}
th {
  background-color: #555555;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
tr:hover {
  background-color: lightgrey;
}
td {
  text-align: center;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
router-link {
  background-color: lightslategray;
}
.view {
  padding: 10px 24px;
  cursor: pointer;
  text-align: center;
  background-color: #008cba;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
}
</style>
