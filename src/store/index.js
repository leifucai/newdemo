import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import person from './person'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,
        person
    },
    plugins:[
        persistedstate({
            key:'erabbit-client-pc-store',
            paths:['user']
        })
    ]
})