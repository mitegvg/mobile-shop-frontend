/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify';
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'

// Plugins
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
    components: {
        VDataTable,
        VDataTableServer
    },
})

const app = createApp(App)

app.use(vuetify);
registerPlugins(app)

app.mount('#app')
