<template>
  <div class="about">
    <el-table
      :data="state.list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="enterpriseName" label="A" sortable />
      <el-table-column prop="ownProductionTotalQuantity" label="B" sortable />
      <el-table-column prop="residentTotalQuantity" label="C" sortable />
    </el-table>
    <el-button type="text" @click="clickTest">测试</el-button>

    <el-table
      class="dataTabler"
      row-key="enterpriseCode"
      ref="multipleTable"
      :data="state.dataList"
      :tree-props="{ children: 'upstreamGasFieldPublicityPoList' }"
    >
      <el-table-column type="index" label="序号" width="50" align="center">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="enterpriseName"
        label="企业名称"
        min-width="130"
      >
      </el-table-column>
      <el-table-column prop="name" label="总量" width="120" align="center">
        <el-table-column
          align="center"
          prop="ownProductionTotalQuantity"
          label="自产量"
          min-width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="residentTotalQuantity"
          label="民生量"
          min-width="150"
        >
          <template #default="scope">
            <!-- {{ scope.row.residentTotalQuantity }} -->
            <span v-if="!scope.row.isEdit">{{
              scope.row.residentTotalQuantity
            }}</span>
            <span v-else>
              <el-input v-model="scope.row.residentTotalQuantity"></el-input>
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        v-for="(item, key) in state.monthList"
        :key="key"
        align="center"
        prop=""
        :label="item.yearMonth"
        min-width="130"
      >
        <el-table-column align="center" prop="" label="自产量" min-width="150">
          <template #default="scope">
            <span>{{ makeInfo(scope.row, key) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="" label="民生量" min-width="150">
         <template #default="scope">
            <span v-if="!scope.row.isEdit">{{
              scope.row.upstreamPublicityMonthPoList[key].residentQuantity
            }}</span>
            <span v-else>
              <el-input
                v-model="
                  scope.row.upstreamPublicityMonthPoList[key].residentQuantity
                "
              ></el-input>
            </span>
          </template>
        </el-table-column> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
import Vue from "vue";
const list: User[] = [
  {
    id: "sy001",
    enterpriseName: "中石油",
    ownProductionTotalQuantity: "120000",
    residentTotalQuantity: "12000",
    hasChildren: true,
    children: [
      {
        id: "1",
        enterpriseName: "气源1",
        ownProductionTotalQuantity: "100000",
        residentTotalQuantity: "200000",
      },
    ],
  },
];
const state = reactive({
  list,
  dataList: [
    {
      enterpriseCode: "sy001",
      enterpriseName: "中石油",
      ownProductionTotalQuantity: "120000",
      residentTotalQuantity: "12000",
      upstreamPublicityMonthPoList: [
        {
          id: "4d326fda29c542a7bf17787151ef7201",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7202",
          ownProductionQuantity: "2222",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7203",
          ownProductionQuantity: "3333",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7204",
          ownProductionQuantity: "4444",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7205",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7206",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7207",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7208",
          ownProductionQuantity: "222",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7209",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7210",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7211",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
        {
          id: "4d326fda29c542a7bf17787151ef7212",
          ownProductionQuantity: "10000",
          residentQuantity: "1000",
        },
      ],
      upstreamGasFieldPublicityPoList: [
        {
          enterpriseCode: "1",
          enterpriseName: "气源1",
          gasFieldCode: "1",
          gasFieldName: "气源1",
          ownProductionTotalQuantity: "100000",
          residentTotalQuantity: "200000",
          upstreamGasFieldPublicityMonthPoList: [
            {
              id: "5112adae744a48c1a01b5b2061d55901",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "1000",
              residentQuantity: "1000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55902",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "2000",
              residentQuantity: "2000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55903",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "3000",
              residentQuantity: "3000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55904",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "4000",
              residentQuantity: "4000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55905",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "5000",
              residentQuantity: "5000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55906",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "6000",
              residentQuantity: "6000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55907",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "7000",
              residentQuantity: "7000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55908",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "8000",
              residentQuantity: "8000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55909",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "9000",
              residentQuantity: "9000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55910",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "10000",
              residentQuantity: "10000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55911",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "11000",
              residentQuantity: "11000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55912",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "12000",
              residentQuantity: "12000",
            },
          ],
        },
        {
          enterpriseCode: "2",
          enterpriseName: "气源2",
          gasFieldCode: "2",
          gasFieldName: "气源2",
          ownProductionTotalQuantity: "100000",
          residentTotalQuantity: "200000",
          upstreamGasFieldPublicityMonthPoList: [
            {
              id: "5112adae744a48c1a01b5b2061d55101",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "2000",
              residentQuantity: "2000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55102",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "2000",
              residentQuantity: "2000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55103",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "3000",
              residentQuantity: "3000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55104",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "4000",
              residentQuantity: "4000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55105",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "5000",
              residentQuantity: "5000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55106",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "6000",
              residentQuantity: "6000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55107",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "7000",
              residentQuantity: "7000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55108",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "8000",
              residentQuantity: "8000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55109",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "9000",
              residentQuantity: "9000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55110",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "10000",
              residentQuantity: "10000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55111",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "11000",
              residentQuantity: "11000",
            },
            {
              id: "5112adae744a48c1a01b5b2061d55112",
              publicityYear: null,
              year: null,
              month: null,
              ownProductionQuantity: "12000",
              residentQuantity: "12000",
            },
          ],
        },
      ],
    },
  ],
  monthList: [
    {
      yearMonth: "2023年4月",
    },
    {
      yearMonth: "2023年5月",
    },
    {
      yearMonth: "2023年6月",
    },
    {
      yearMonth: "2023年7月",
    },
    {
      yearMonth: "2023年8月",
    },
    {
      yearMonth: "2023年9月",
    },
    {
      yearMonth: "2023年10月",
    },
    {
      yearMonth: "2023年11月",
    },
    {
      yearMonth: "2023年12月",
    },
    {
      yearMonth: "2024年1月",
    },
    {
      yearMonth: "2024年2月",
    },
    {
      yearMonth: "2024年3月",
    },
  ],
});
interface User {
  id: string;
  enterpriseName: string;
  ownProductionTotalQuantity: string;
  residentTotalQuantity: string;
  hasChildren?: boolean;
  children?: User[];
}

const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        id: "2",
        enterpriseName: "气源1",
        ownProductionTotalQuantity: "100000",
        residentTotalQuantity: "200000",
      },
      {
        id: "3",
        enterpriseName: "气源1",
        ownProductionTotalQuantity: "100000",
        residentTotalQuantity: "200000",
      },
      {
        id: "1",
        enterpriseName: "气源1",
        ownProductionTotalQuantity: "100000",
        residentTotalQuantity: "200000",
      },
    ]);
  }, 1000);
};

function showInfo() {
  console.log("is test");
  console.log(list[0]);
}
const clickTest = () => {
  console.log("is test");
  console.log(list[0]);
};

const makeInfo = (row, key) => {
  console.log(row.upstreamPublicityMonthPoList, key);
  // const rowInfo = JSON.parse(row);
  const info = row.upstreamPublicityMonthPoList
    ? row.upstreamPublicityMonthPoList[key]
    : "--";
  console.log(info);
  console.log(key);
  return info ? info.residentQuantity : "---";
};
</script>