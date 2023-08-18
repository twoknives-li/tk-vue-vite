<template>
    <div style="padding: 10px">
        这里是表格
        <div class="tabCalss" v-loading="state.loadingTable">
            <grationTab :defaultArray="state.tabelArr" v-if="state.showTable"></grationTab>
            <!-- <newTable  :defaultArray="state.tabelArr" v-if="state.showTable"></newTable> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import grationTab from "./table-info.vue";
import newTable from "./table-v2.vue";
import { watch, nextTick, reactive, onMounted, computed } from "vue";
import resetTableVue from "../../ship-library/ship/components/reset-table.vue";
const state = reactive({
    loadingTable: false,
    showTable: false,
    tabelArr: []
})
onMounted(() => {
    state.loadingTable = true;
    for (let i = 0; i < 20; i++) {
        state.tabelArr.push({
            "id": i,
            "deptId": "46350101",
            "deptName": "红岛-" + i,
            "divisionCode": "460100",
            "divisionName": "海口",
            "portCode": "4635010106001",
            "portName": "11",
            "tjType": 5,
            "tjDate": "2023-02-21",
            "bgjInPort": "0",
            "bgjInReport": "0",
            "wgjInPort": "0",
            "wgjReport": "0",
            "bgjOutPort": "0",
            "bgjOutReport": "0",
            "wgjOutPort": "0",
            "wgjOutReport": "0",
            "yyblInPort": "0",
            "yyblInReport": "0",
            "ytInPort": "0",
            "ytInReport": "0",
            "hcInPort": "0",
            "hcInReport": "0",
            "kcInPort": "0",
            "kcInReport": "0",
            "wtInPort": "0",
            "wtInReport": "0",
            "jyInPort": "0",
            "jyInReport": "0",
            "gcInPort": "0",
            "gcInReport": "0",
            "qtInPort": "0",
            "qtInReport": "0",
            "yyblOutPort": "0",
            "yyblOutReport": "0",
            "ytOutPort": "0",
            "ytOutReport": "0",
            "hcOutPort": "0",
            "hcOutReport": "0",
            "kcOutPort": "0",
            "kcOutReport": "0",
            "wtOutPort": "0",
            "wtOutReport": "0",
            "jyOutPort": "0",
            "jyOutReport": "0",
            "gcOutPort": "0",
            "gcOutReport": "0",
            "qtOutPort": "0",
            "qtOutReport": "0",
            "personInPort": "115",
            "personOutPort": "129",
            "checkShip": "328",
            "checkPerson": "1068",
            "below3InReport": "0",
            "below3OutReport": "0",
            "below3InPerson": "0",
            "below3OutPerson": "0",
            "below6InReport": "0",
            "below6OutReport": "0",
            "below6InPerson": "0",
            "below6OutPerson": "0",
            "below9InReport": "0",
            "below9OutReport": "0",
            "below9InPerson": "0",
            "below9OutPerson": "0",
            "below12InReport": "0",
            "below12OutReport": "0",
            "below12InPerson": "0",
            "below12OutPerson": "0",
            "below15InReport": "0",
            "below15OutReport": "0",
            "below15InPerson": "0",
            "below15OutPerson": "0",
            "below18InReport": "0",
            "below18OutReport": "0",
            "below18InPerson": "0",
            "below18OutPerson": "0",
            "below21InReport": "0",
            "below21OutReport": "0",
            "below21InPerson": "0",
            "below21OutPerson": "0",
            "below24InReport": "0",
            "below24OutReport": "0",
            "below24InPerson": "0",
            "below24OutPerson": "0",
            "createBy": "席位定时统计",
            "createTime": "2023-02-22T03:30:01.000+0800",
            "updateBy": "",
            "updateTime": null,
            "remark": null
        })
    }
    state.showTable = true;
    state.loadingTable = false;

})
</script>