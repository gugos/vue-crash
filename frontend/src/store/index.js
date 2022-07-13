import { createStore } from "vuex"

import mainbarModule from "./modules/mainbar/index.js"
import authModule from "./modules/auth/index.js"

const store = createStore({
    modules: {
        mainbar: mainbarModule,
        auth: authModule
    }
})

export default store