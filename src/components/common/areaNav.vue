<!-- 左边区域数据 -->
<template>
    <div class="affixTree">
        <div v-show="isCollapsed" class="areaMain">区域原始数据</div>
        <div class="barRotate" @click="toggleCollapse">
            <span class="iconfont iconshousuo layout-header-bar affixTree-btn-img"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            synchronizationTextAndIcon: {
                type: Boolean,
                defalut: false 
            }, //选择文本时同步打开区域
            isDiffAreaAndRoom: {
                type: Boolean,
                default: true
            }, //是否区分区域和房间
            isSelected: {
                type: Boolean,
                default: true,
            }, //是否记住当前操作，并展示之前选中的内容， 默认记住
        },
        data() {
            return {
                tree: [],
                isCollapsed: true,
                initData: [], //区域原始数据
                selectedMsg: {}, //之前页面选中的项目信息，包括用户id
                myZTree: null,
            };
        },
        methods: {
            toggleCollapse () {
                this.isCollapsed = !this.isCollapsed;
            }
        },
        mounted() {

        },
    }
</script>

<style lang='scss' scoped>
    .affixTree{
      @include wh(180px,100%);
        display:flex;
        .areaMain {
            width:150px;
            background:#fff;
            padding: 5px 10px;
        }
        .barRotate{
            background:#fff;
            padding: 5px 10px;
        }
    }

</style>