<template>
    <div class="container-fluid">
        <h3 class="mt-3">
            <template v-if="activeView === 'list'">
                <h3 class="mt-3">Users</h3>
            </template>
        </h3>
        <template v-if="activeView === 'list'">
            <div>
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Groups</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(user,index) in users" :key="user">
                        <tr>
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <div v-for="group in user.groups" :key="group">
                                    {{ group }}
                                </div>
                            </td>
                            <td>
                                <button type="button" class="btn btn-primary mr-3" v-on:click="block(user.id)">Block</button>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
</template>

<script>
import UserService from '../../services/admin/user.service'

export default {
    name: 'component-user',
    data() {
        return {
            users: Array,
            activeView: 'list',
        }
    },
    methods: {
        goToList() {
            this.activeView = 'list'
        },
        block(id) {
            console.log(id)
        },
        getList() {
            let self = this

            UserService.getAll().then(
                (response) => {
                    self.users = response.data
                },
                (error) => {
                    console.log(error)
                },
            )
        },
    },
    mounted() {
        if (this.activeView === 'list') {
            this.getList()
        }
    },
}
</script>
