<template>
    <div class="body">
        <nav class="navbar navbar-expand navbar-dark navbar">
            <a href="/" class="navbar-brand">Stark</a>
            <div class="navbar-nav mr-auto">
                <li class="nav-item" v-if="currentUser">
                    <router-link to="/user-room" class="nav-link">My room</router-link>
                </li>
                <li class="nav-item" v-if="currentUser">
                    <user-search></user-search>
                </li>
            </div>

            <div v-if="!currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">
                        <font-awesome-icon icon="user-plus"/>
                        Sign Up
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">
                        <font-awesome-icon icon="sign-in-alt"/>
                        Login
                    </router-link>
                </li>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        <font-awesome-icon icon="user"/>
                        {{ currentUser.name }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt"/>
                        LogOut
                    </a>
                </li>
            </div>
        </nav>

        <div class="container-fluid" id="content">
            <div class="row">
                <div class="col-12">
                    <div id="route-content" class="row">
                        <router-view :key="$route.fullPath"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/app.scss";
</style>

<script>

import UserSearch from '@/components/Search.vue'

export default {
    components: { UserSearch },
    computed: {
        currentUser() {
            return this.$store.state.auth.user
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        },
    },
}
</script>