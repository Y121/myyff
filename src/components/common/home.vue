<!-- 组件说明 -->
<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <!-- 回到顶部 -->
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import bus from './bus';
    export default {
        components: {
            vHead,
            vSidebar
        },
        data () {
            return {
                collapse:false
            };
        },
        methods: {

        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });
        },
        mounted() {

        },
    }
</script>

<style lang='scss' scoped>
    .content-box {
        position: absolute;
        left: 180px;
        right: 0;
        top: 70px;
        bottom: 0;
        padding-bottom: 30px;
        -webkit-transition: left .3s ease-in-out;
        transition: left .3s ease-in-out;
        background: #f0f0f0;
    }

    .content {
        width: auto;
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
        box-sizing: border-box;
    }

    .content-collapse {
        left: 65px;
    }

</style>