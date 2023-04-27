<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="10">
          <h2>Update Device</h2>
          <v-text-field v-model="update_model" :rules="valRules" label="Model" required></v-text-field>

          <v-text-field v-model="update_brand" :rules="valRules" label="Brand" required></v-text-field>

          <v-text-field v-model="update_os" :rules="valRules" label="OS" required></v-text-field>
          <v-text-field v-model="update_release_date" :rules="valRules" label="Release Date" required></v-text-field>
          <v-btn :disabled="!isFormValid" size="x-large" variant="flat" color="primary" @click="updateDevice">Save</v-btn>
          <v-btn :disabled="!isFormValid" size="x-large" variant="flat" color="danger"
            @click="deleteDevice">Delete</v-btn>
          <div class="success" v-if="message">
            {{ this.message }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { API_GATEWAY } from '@/constants';
import axios from 'axios';
export default {
  props: ['id', 'model', 'brand', 'os', 'release_date'],
  data: () => ({
    valid: false,
    update_id: '',
    update_model: '',
    update_brand: '',
    update_os: '',
    update_release_date: '',
    isFormValid: true,
    message: '',
    valRules: [
      value => {
        if (value) return true
        return 'Value is requred.'
      },
      value => {
        if (value?.length <= 50) return true
        return 'Value must be less than 50 characters.'
      },
    ],
  }),
  methods: {
    async updateDevice() {
      this.isFormValid = false;
      const res = await axios({
        method: 'put',
        url: API_GATEWAY,
        data: {
          id: this.update_id,
          model: this.update_model,
          brand: this.update_brand,
          os: this.update_os,
          release_date: this.update_release_date
        }
      });
      this.message = 'Successfully updated';
      setTimeout(() => {
        this.$router.push({ path: '/' });
      }, 1000)

    },
    async deleteDevice() {
      this.isFormValid = false;
      const res = await axios({
        method: 'delete',
        url: API_GATEWAY,
        data: {
          id: this.update_id,
        }
      });


      this.message = 'Successfully deleted';
      setTimeout(() => {
        this.$router.go();
      }, 1000)
    }
  },

  watch: {
    id: function (newVal) {
      this.update_id = newVal;
    },
    model: function (newVal) {
      this.update_model = newVal;
    },
    brand: function (newVal) {
      this.update_brand = newVal;
    },
    os: function (newVal) {
      this.update_os = newVal;
    },
    release_date: function (newVal) {
      this.update_release_date = newVal;
    }
  },
  mounted() {

    this.update_id = this.id;
    this.update_model = this.model;
    this.update_brand = this.brand;
    this.update_os = this.os;
    this.update_release_date = this.release_date;
  }
}
</script>