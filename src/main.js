import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

// global style
import "./assets/main.css"


let app

projectAuth.onAuthStateChanged(() => { // when page refresh, wait until user login info is fetched
    if (!app) { // if app already created, no need to recreate
        app = createApp(App).use(router).mount('#app')
    }

})

// createApp(App).use(router).mount('#app')
