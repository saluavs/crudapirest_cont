<template>
    <div class="private">
        <h1>This is a private page</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
export default {
    name:'private',
    methods: {
        logout(){
            firebase.auth().signOut()
            .then(() => {
                this.$router.replace('/')
            })
        }
    },
    
}
</script>