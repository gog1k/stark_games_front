<template>
    <div class="container-fluid">
        <div class="row">
            <div class="room" ref="room">
                <room-item-desk v-if="!loading"></room-item-desk>
            </div>
        </div>
    </div>
</template>
<script>
import * as THREE from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import RoomItemDesk from '@/components/room/RoomItemDesk.vue'

export default {
    name: 'page-home',
    data() {
        return {
            loading: true,
        }
    },
    components: {
        RoomItemDesk,
    },
    mounted() {
        let self = this
        let loader = new THREE.TextureLoader()
        let material = new THREE.MeshBasicMaterial({
            map: loader.load('/images/background.jpg'),
        })

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(45, this.$el.clientWidth / this.$el.clientHeight, 1, 1000)
        this.camera.position.set(500, 500, 500)
        this.camera.lookAt(0, 0, 0)

        // this.camera = new THREE.OrthographicCamera(-3, 3, 3, -3, -10, 10)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
        this.renderer.setClearColor(0x3B3B3B, 1)
        this.$refs.room.appendChild(this.renderer.domElement)

        let objLoader = new OBJLoader();
        objLoader.load('/images/tv.obj', (object) => {
            object.rotation.x = -1.57
            console.log(object)
            console.log(material)
            let tvMash = new THREE.Mesh(object, material)
            self.scene.add(tvMash);
        });

        let light = new THREE.DirectionalLight(0xFFFFFF, 3)
        light.position.set(5000, 20000, 5000)
        this.scene.add(light)

        this.renderer.render(this.scene, this.camera)
        this.animationLoop()

        this.loading = false
    },
    methods: {
        animationLoop() {
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame(this.animationLoop)
        },
    },
}
</script>

<style>
.room {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: -56px;
    padding-top: 56px;
    colo: #9e4c4c
}
</style>