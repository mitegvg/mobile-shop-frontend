<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h2>Add New Device</h2>
          <v-text-field v-model="model" :rules="valRules" :counter="10" label="Model" required></v-text-field>

          <v-text-field v-model="brand" :rules="valRules" :counter="10" label="Brand" required></v-text-field>

          <v-text-field v-model="os" :rules="valRules" label="OS" required></v-text-field>
          <v-text-field v-model="release_date" :rules="valRules" label="Release Date" required></v-text-field>
          <v-btn :disabled="!isFormValid" size="x-large" variant="flat" color="primary"
            @click="insertDevice">Submit</v-btn>
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
  data: () => ({
    valid: false,
    model: '',
    brand: '',
    os: '',
    release_date: '',
    isFormValid: true,
    message: '',
    valRules: [
      value => {
        if (value) return true
        return 'Value is requred.'
      },
      value => {
        if (value?.length <= 20) return true
        return 'Value must be less than 20 characters.'
      },
    ],
  }),
  methods: {
    async insertDevice() {
      this.isFormValid = false;
      const res = await axios({
        method: 'post',
        url: API_GATEWAY,
        data: {
          model: this.model,
          brand: this.brand,
          os: this.os,
          release_date: this.release_date
        }
      });

      if (res.data === 1) {
        this.message = 'Successfully inserted';
        setTimeout(() => {
          this.$router.push({ path: '/' });
        }, 1000)
      }
    }
  }
}
</script>