<!-- 嵌套表格示例 -->
<template>
    <div class=''>
         <el-table border :data="tableData" @expand-change="expandSelect" @row-click="clickRow" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table border :data="props.row.tableData2" style="width: 100%" @row-click="clickRow">
                        <el-table-column label="商品 ID" prop="id"></el-table-column>
                        <el-table-column label="商品名称" prop="name"></el-table-column>
                        <el-table-column label="描述" prop="desc"></el-table-column>
                    </el-table>
                    <el-pagination
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                    </el-pagination>
                    <el-table border :data="props.row.tableData2" style="width: 100%" @row-click="clickRow">
                        <el-table-column label="商品 ID" prop="id"></el-table-column>
                        <el-table-column label="商品名称" prop="name"></el-table-column>
                        <el-table-column label="描述" prop="desc"></el-table-column>
                    </el-table>
                    <el-pagination
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                    </el-pagination>
                </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="id"></el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
        </el-table>
        
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {
                tableData: [
                    {
                    id: "12987122",
                    name: "好滋好味鸡蛋仔",
                    category: "江浙小吃、小吃零食",
                    desc: "荷兰优质淡奶，奶香浓而不腻",
                    address: "上海市普陀区真北路",
                    shop: "王小虎夫妻店",
                    shopId: "10333"
                    },
                    {
                    id: "12987123",
                    name: "好滋好味鸡蛋仔",
                    category: "江浙小吃、小吃零食",
                    desc: "荷兰优质淡奶，奶香浓而不腻",
                    address: "上海市普陀区真北路",
                    shop: "王小虎夫妻店",
                    shopId: "10333"
                    },
                    {
                    id: "12987125",
                    name: "好滋好味鸡蛋仔",
                    category: "江浙小吃、小吃零食",
                    desc: "荷兰优质淡奶，奶香浓而不腻",
                    address: "上海市普陀区真北路",
                    shop: "王小虎夫妻店",
                    shopId: "10333"
                    },
                    {
                    id: "12987126",
                    name: "好滋好味鸡蛋仔",
                    category: "江浙小吃、小吃零食",
                    desc: "荷兰优质淡奶，奶香浓而不腻",
                    address: "上海市普陀区真北路",
                    shop: "王小虎夫妻店",
                    shopId: "10333"
                    }
                ]
            };
        },
        methods: {
            expandSelect(row, expandedRows) {
                // expandedRows.length != 0 ? console.log(row.id) : ''
                if(expandedRows.length != 0){
                    row.tableData2 = [{
                        id: row.id,
                        name: "好滋好味鸡蛋仔",
                        category: "江浙小吃、小吃零食",
                        desc: "荷兰优质淡奶，奶香浓而不腻",
                        address: "上海市普陀区真北路",
                        shop: "王小虎夫妻店",
                        shopId: "10333"
                    }]
                }
            },
            clickRow (row, column, event) {
                console.log(row.id)
                // console.log(column)
                // console.log(event)
            }
        },
        mounted() {

        },
    }
</script>

<style lang='scss' scoped>
/*@import url()*/

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>