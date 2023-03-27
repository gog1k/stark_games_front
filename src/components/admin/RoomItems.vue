<template>
    <div class="container">
        <header>
            <h3>Room items</h3>
        </header>
        <template v-if="activeView !== 'edit'">
            <div class="btn btn-primary mb-3 mr-3" v-on:click="editItem()">Create new</div>
        </template>
        <template v-if="activeView === 'list'">
            <div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Active</th>
                        <th scope="col">Name</th>
                        <th scope="col">type</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(group,index) in groups" :key="group">
                        <tr>
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                                <template v-if="group.active">
                                    <i class="fa-xl bi bi-check-circle-fill text-success"></i>
                                </template>
                                <template v-else>
                                    <i class="fa-xl bi bi-x-circle-fill text-danger"></i>
                                </template>
                            </td>
                            <td>{{ group.name }}</td>
                            <td>{{ group.type }}</td>
                            <td>
                                <button type="button" class="btn btn-primary mr-3" v-on:click="editItem(group.id)">Edit</button>
                                <button type="button" class="btn btn-warning mr-3" v-on:click="getTemplates(group.id)">Templates</button>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </template>
        <template v-if="activeView === 'edit'">
            <div>
                <template v-if="issetItem">
                    Edit item
                </template>
                <template v-else>
                    Create item
                </template>
                <div class="row">
                    <div class="form-group col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="currentItem.active">
                            <label class="form-check-label" for="activeCheckBox">
                                Active
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-12">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="email" class="form-control" placeholder="Item name" v-model="currentItem.name">
                    </div>
                    <div class="form-group col-12">
                        <label for="exampleInputEmail1">Type</label>
                        <input type="email" class="form-control" placeholder="Item type" v-model="currentItem.type">
                    </div>
                </div>
                <div>
                    <div class="btn btn-success mr-3" v-on:click="saveItem()">
                        <template v-if="issetItem">
                            Update
                        </template>
                        <template v-else>
                            Create
                        </template>
                    </div>
                    <div class="btn btn-primary mr-3" v-on:click="goToList()">Back</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import RoomService from '../../services/admin/room.service'
import router from '@/router'

export default {
    name: 'room-items',
    data() {
        return {
            groups: Array,
            activeView: 'list',
            currentItem: {},
        }
    },
    methods: {
        goToList() {
            this.activeView = 'list'
        },
        editItem(id) {

            this.currentItem = typeof id !== 'undefined' ? this.groups?.find(
                (item) => item.id === id,
            ) : {
                active: true,
                name: '',
                type: '',
            }

            this.currentItem.active = !!this.currentItem.active
            this.activeView = 'edit'
        },
        getTemplates(id) {
            router.push('/room-item-templates/template/' + id)
        },
        saveItem() {
            let self = this

            RoomService.saveItem(this.currentItem).then(
                () => {
                    self.getItemList()
                    self.activeView = 'list'
                },
                (error) => {
                    console.log(error)
                },
            )
        },
        getItemList() {
            let self = this

            RoomService.getAllItems().then(
                (response) => {
                    self.groups = response.data
                },
                (error) => {
                    console.log(error)
                },
            )
        },
    },
    computed: {
        issetItem() {
            return typeof this.currentItem.id !== 'undefined'
        },
    },
    mounted() {
        if (this.activeView === 'list') {
            this.getItemList()
        }
    },
}
</script>
