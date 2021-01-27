<!-- 组件说明 -->
<template>
    <div class="dashboard">
        <area-nav></area-nav>
        <!--<el-row :gutter="20" class="dashboardTop">
           <el-col :span="4" v-for="item in topList" :key="item">
                <dl class="topItem">
                    <dd class="flc">
                        <span class="iconfont iconcheliangshangxianshu topImg"></span>
                    </dd>
                    <dt>
                        <p class="topTitle">集中器上线数/总数</p>
                        <p>1/7</p>
                    </dt>
                </dl>
          </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">

            </el-col>
            <el-col :span="12">
            
            </el-col>-->
        </el-row>
    </div>
</template>

<script>
    //import x from ''
    import areaNav from '@/components/common/areaNav'
    export default {
        components: {
            areaNav:areaNav,
        },
        data () {
            return {
                topList:[1,2,3,4,5,6],
                
            };
        },
        methods: {
            
        },
        mounted() {

        },
    }
</script>

<style lang='scss' scoped>
.dashboard{
    height:100%;
}
 .dashboardTop{
    background:#fff;
    .topItem{
      @include fj();
      padding:10px 0;
      dd{
            .topImg{
                font-size: 22px;
                background: orange;
                padding: 8px;
                border-radius: 20.5px;
                color: #fff;
            }
        }
        .topTitle{
            @include sc(14px,#aaa);
        }
    }
 }
</style>