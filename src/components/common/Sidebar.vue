<!-- 侧边栏 -->
<template>
    <div class='sidebar'>
     <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in MenuList">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {home} from '@/api/getData'
    import bus from './bus';
    export default {
        data () {
            return {
                MenuList:[],
                collapse:false,
            };
        },
        methods: {
            getMenus(){
                this.MenuList=[];
                home.getMenus().then(res => {
                    if (res.success) {
                        var dataList = res.data;
                        dataList.forEach( element=> {
                            if (!element.State) {
                                if (element.ParentID == 0) {
                                    var obj = {
                                        'title': element.Name,
                                        'index':element.Name,//以 index 作为 path 进行路由跳转
                                        'icon': 'img/left/' + element.ICO + '.svg',
                                        'ID': element.ID
                                    };
									if (element.Name != '首页') {
                                        obj.subs=[];
                                    }
                                    this.MenuList.push(obj);
                                }
                            }
                        });
                        this.MenuList.forEach( (item, index)=> {
                            for (var i = 0; i < dataList.length; i++) {
                                if (!dataList[i].State) {
                                    if (item.ID == dataList[i].ParentID) {
                                        this.MenuList[index].subs.push({
                                            'ID': dataList[i].ID,
                                            'index':dataList[i].Name,
                                            'title': dataList[i].Name,
                                            'address': dataList[i].Address
                                        })
                                    }
                                }
                            }
                        });
                    } else {
                        
                    }
                }).catch(error => {
                    //reject(error)
                })

            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            this.getMenus();
            //通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    }
</script>

<style lang='scss' scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 180px;
    }
    .sidebar > ul {
        height: 100%;
    }

</style>