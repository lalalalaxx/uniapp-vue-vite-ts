import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import store from './store'

import util from '@/utils/util'
uni.$util = util

export function createApp() {
    const app = createSSRApp(App)
    app.use(uviewPlus)
    app.use(store)

    return {
        app
    }
}
