import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/index.js"
import router from "./router.js"
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faAngleRight,
    faAngleLeft,
    faHouse,
    faGear,
    faCircleInfo,
    faPersonRunning,
    faLock
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import MainBar from "./components/mainbar/MainBar.vue"
import BaseContainer from "./components/ui/BaseContainer.vue"
import BaseButton from "./components/ui/BaseButton.vue"
import BaseCard from "./components/ui/BaseCard.vue"
import BaseSpinner from "./components/ui/BaseSpinner.vue"
import BaseDialog from "./components/ui/BaseDialog.vue"
import BaseContextMenu from "./components/ui/BaseContextMenu.vue"

library.add(
    faAngleRight,
    faAngleLeft,
    faHouse,
    faGear,
    faCircleInfo,
    faPersonRunning,
    faLock
)

const app = createApp(App)
app.use(store)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.component("main-bar", MainBar)
app.component("base-container", BaseContainer)
app.component("base-button", BaseButton)
app.component("base-card", BaseCard)
app.component("base-spinner", BaseSpinner)
app.component("base-dialog", BaseDialog)
app.component("base-context-menu", BaseContextMenu)
app.mount('#app')
