import Vue from 'vue'
import VueRouter from 'vue-router'
import ImageUpload from "../components/ImageUpload.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Root',
            components: {
                content: ImageUpload
            }
        },
        {
            path: '/login',
            name: 'Login',
            components: {
                content: Login
            }
        }
    ]
})