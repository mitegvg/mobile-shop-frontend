
<template>
  <v-row>
    <v-col cols="12" sm="8">
      <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" class="elevation-1" @update:options="loadItems"
        @click:row="handleClickRow">
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field v-model="search" hide-details placeholder="Enter search here.." class="ma-2"
                density="compact"></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
      <v-btn size="x-large" variant="flat" color="primary" @click="$router.push('/add-new-device')">Add new
        device</v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <updatedevice v-if="updatePopup" :id="id" :model="model" :brand="brand" :os="os" :release_date="release_date">
      </updatedevice>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios';
import { API_GATEWAY } from '../constants';
import UpdateDevice from './UpdateDevice.vue';

const API = {
  async fetch({ page, itemsPerPage, sortBy, search }) {

    return new Promise(async resolve => {
      const start = (page - 1) * itemsPerPage
      const end = start + itemsPerPage
      const items = await axios({
        method: 'get',
        url: API_GATEWAY,
      });
      const data = items.data.slice().filter(item => {
        if (!search) {
          return true;
        }
        const columnIncludesSearch = ['model', 'brand', 'os', 'release_date'].filter((selectedColumn) => {
          if (item[selectedColumn].toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
          return false;
        })
        return columnIncludesSearch.length > 0 ? true : false;
      })

      if (sortBy.length) {
        const sortKey = sortBy[0].key
        const sortOrder = sortBy[0].order
        data.sort((a, b) => {
          const aValue = a[sortKey]
          const bValue = b[sortKey]
          return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
        })
      }

      const paginated = data.slice(start, end);
      resolve({ items: paginated, total: data.length })

    })
  },
}

export default {
  data: () => ({
    itemsPerPage: 10,
    updatePopup: false,
    headers: [
      {
        title: "ID",
        align: "start",
        key: "id",
      },
      {
        title: "Model",
        align: "start",
        key: "model",
      },
      { title: "Brand", key: "brand", align: "start" },
      { title: "OS", key: "os", align: "start" },
      { title: "Release Date", key: "release_date", align: "start" },
    ],
    model: '',
    brand: '',
    os: '',
    id: '',
    release_date: '',
    serverItems: [],
    loading: true,
    totalItems: 0,
    selectedColumn: "model",
    search: "",
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;
      API.fetch({
        page,
        itemsPerPage,
        sortBy,
        search: this.search,
        selectedColumn: this.selectedColumn
      }).then(({ items, total }) => {
        this.serverItems = items;
        this.totalItems = total;
        this.loading = false;
      });
    },
    handleClickRow(e, value) {
      this.updatePopup = true;
      this.id = value.item.columns.id;
      this.model = value.item.columns.model;
      this.brand = value.item.columns.brand;
      this.os = value.item.columns.os;
      this.release_date = value.item.columns.release_date;
    }
  },
  components: { updatedevice: UpdateDevice }

}
</script>