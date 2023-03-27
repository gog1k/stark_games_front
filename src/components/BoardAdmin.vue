<template>
    <div class="row">
        <div class="container">
            <header>
                <router-link to="/room-items" class="nav-link">Room items</router-link>
                <router-link to="/room-item-templates" class="nav-link">Room items templates</router-link>
            </header>
        </div>
    </div>
</template>

<script>

export default {
    name: 'board-admin',
    data() {
        return {
            content: '',
        }
    },
}
</script>
