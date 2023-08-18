<template>
  <el-row>
    <el-col :span="18">
      <el-button type="primary" @click="makeJson">生成JSON</el-button>
      <el-button type="primary" @click="addStep">增加步骤</el-button>
      <div class="flex flex-row">
        <div class="m-4" v-for="(item, key) in stepList" :key="key">
          <el-link>{{ item.label }}</el-link>
        </div>
      </div>

      <div v-for="(groupItem, key) in fromList" :key="key" @contextmenu.prevent>
        <div>分组：{{ groupItem.groupName }}</div>
        <!-- {{ groupItem.fromList }} -->

        <draggable
          v-model="groupItem.fromList"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="1000"
          @start="data.drag = true"
          @end="data.drag = false"
          item-key="index"
        >
          <template #item="{ element }">
            <div
              @mousedown="getInfo($event, element)"
              class="form-item m-3 cursor-move"
            >
              <!-- {{ element.type }} -->
              <el-form-item :label="element.nameZH" :prop="element.nameEN">
                <div class="cursor-auto">
                  <div v-if="element.formType === 'list'">
                    <el-button @click="addList(element)">增加年份</el-button>
                  {{ state.info[element.nameEN] }}
                    {{ element.listOption }} 
                    <div v-for="(yearItem, yearKey) in state.info[element.nameEN]">
                    {{yearItem.nameZH}}
                     <div v-for="(listItem, listKey) in element.listOption.option"> 
                      <form-item
                        :element="listItem"
                        :state="state"
                        :key="listKey"
                      ></form-item>
                    </div>
                    </div>
                  </div>
                  <form-item
                    :element="element"
                    :state="state"
                    :key="key"
                  ></form-item>
                </div>
              </el-form-item>
            </div>
          </template>
        </draggable>
      </div>
    </el-col>
    <!-- 右侧编辑详情 -->
    <el-col :span="6">
      <div class="fixed columns-1 right-0 w-300">
        <div>选中的div: {{ data.currtRow.nameZH }}</div>
        <el-form>
          <el-form-item label="类型">
            <el-select v-model="data.currtRow.type" placeholder="">
              <el-option :value="'text'" :label="'文本框'"></el-option>
              <el-option :value="'radio'" :label="'单选'"></el-option>
              <el-option :value="'select'" :label="'下拉'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段名">
            <el-input v-model="data.currtRow.nameZH"></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input v-model="state.info[data.currtRow.nameEN]"></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <!-- {{ state.treeList[data.currtRow.nameEN] }} -->
            <el-select
              v-model="state.treeList[data.currtRow.nameEN]"
              placeholder=""
            >
              <el-option
                v-for="(item, key) in state.treeList[data.currtRow.nameEN]"
                :key="key"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  ref,
  useAttrs,
  watch,
  nextTick,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
  onBeforeUnmount,
} from "vue";
import draggable from "vuedraggable";
import formItem from "./components/formItem.vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
const state = reactive({
  info: {},
  dictList: {}, // 字典
  treeList: {}, // 树形
  functionList: {},
});
const fromList: any = ref([]);
const rules: any = reactive({
  // nameB: [ { validator: checkNameb, trigger: "blur" }]
});
const stepList: any = ref([]);
const list: any = ref([
  {
    fieldType: "", // 字段类型
    formType: "list", // 表单类型 动态列表：list 日期:date  单选:radio 多选：checkbox 下拉:select  单行文本框:text  文本域：textarea 级联：cascader 数字：number
    order: 1, // 排序
    nameEN: "", // 字段英文
    nameZH: "", // 字段中文
    required: false, // 是否必填
    disable: false, // 是否可编辑
    regex: null, // 正则
    value: "", // 默认值
    dictCode: "", // 字典id （仅多选、单选、下拉）
    treeCode: "", // 树形菜单id  （仅级联选择器)
    precision: "", // 精度 (仅数字)
    format: "", // 格式化 (日期时)
    dateType: "", // 时间格式的类型
    inputWay: "manually", // 获取方式 手动:manually  自动:byDefault
    inputWayDefault: "", // 自动时从哪个字段获值
    changeFun: "", // 切换时给指定字段选项赋值
    unitName: "", // 显示用单位
    placeholder: "", // 提示语
    groupCode: "", //分组code
    groupName: "", // 分组名称
    groupOrder: "", // 分组排序
    lgNumber: 12, // 字段栅格
    remark: "", // 备注提醒
    radioType: "default", // 单选框样式类型
    showWordLimit: true, // 是否显示字符串统计
    maxlength: 20, // 可输入最大字符串限制
    optionType: "dict", // 配置项取值类型   dict:字典， option：本地配置项,  byApi:接口获取
    option: [], // 可选项
    apiUrl: "",
    apiData: {}, // 接口传参， byApi接口获取配置项时传参数据
    filterable: false, // 下拉选项是否允许搜索
    group: "动态列",
    listOption: {
      option: [
        {
          group: "分组B",
          type: "date",
          nameEN: "nameD",
          nameZH: "列表选项A",
          disable: false,
          value: "",
          format: "YYYY-MM-DD",
        },
      ],
      name: "ddd",
    },
  },
  {
    group: "分组B",
    type: "text",
    nameZH: "字段名B",
    nameEN: "nameB",
    // validator: "checkNameb",
    regex:
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    required: true,
    disable: false,
    value: "",
  },
  {
    group: "分组B",
    type: "radio",
    nameEN: "nameC",
    nameZH: "nameC",
    // validator: "myCustomFunction",
    disable: false,
    labelList: ["选项1", "选项2", "选项3"],
    valueList: ["1", "2", "3"],
    value: "",
  },
  {
    group: "分组B",
    type: "date",
    nameEN: "nameD",
    nameZH: "nameD",
    disable: false,
    value: "",
    format: "YYYY-MM-DD",
  },
  {
    group: "分组B",
    type: "select",
    nameEN: "nameE",
    nameZH: "nameE",
    disable: false,
    dictCode: "dictcode123",
    value: "",
  },
  {
    group: "分组B",
    type: "checkbox",
    nameZH: "checkbox",
    nameEN: "nameF",
    disable: false,
    dictCode: "",
    value: "3",
  },
  {
    group: "分组a",
    type: "cascader",
    nameEN: "nameG",
    nameZH: "nameG",
    treeCode: "treeCode",
    changeFun: "changeFunA",
    disable: false,
    value: "",
  },
  {
    group: "分组c",
    type: "cascader",
    nameEN: "mdd",
    nameZH: "树形",
    treeCode: "treeCode",
    changeFun: "",
    disable: false,
    value: "",
  },{
    group: "测试直接引用组件",
    type: "components",
    nameEN: "test-comp",
    nameZH: "测试直接引用组件",
    treeCode: "",
    changeFun: "",
    disable: false,
    value: "",
  },
]);
const data: any = reactive({
  drag: false,
  myArray: [
    { id: 1, name: "Jenny" },
    { id: 2, name: "kevin" },
    { id: 3, name: "lili" },
  ],
  currtRow: {},
  showCurrt: false,
});

const getInfo = (event, row) => {
  console.log(event);
  console.log(row);
  if (event.button === 0) {
    console.log("点击左键");
    // clearCurrt();
  } else if (event.button === 1) {
    console.log("点击滚轮");
  } else {
    console.log("点击右键");
  }

  getCurrtInfo(row);
};

const clearCurrt = () => {
  data.showCurrt = false;
  data.currtRow = {};
};
const getCurrtInfo = (row) => {
  data.showCurrt = true;
  data.currtRow = row;
};
const handleChange = (v, str) => {
  console.log("handleChange", v, str);
  // console.log(name, e);
};
// 处理数据
const makeData = (list) => {
  console.log(list.value);
  let allGroup: any = [];
  list.map((item: any, key) => {
    allGroup.push(item.group);
    if (item.dictCode) {
      getDict(item);
    }
    if (item.treeCode) {
      getTree(item);
    }
    if (item.required) {
      rules[item.nameEN] = [
        { required: true, message: "请输入", trigger: "blur" },
      ];
    }
    // 正则校验
    if (item.regex) {
      rules[item.nameEN] = [{ validator: checkByZZ, trigger: "blur" }];
    }
    if (item.formType === "list") {
      const childList: any = [];
      const childListItem: any = {};
      item.listOption.option.map((listItem) => {
        childListItem[listItem.nameEN] = listItem.value;
      });
      childList.push(childListItem);
      state.info[item.nameEN] = childList;
    }
    if (item.value) {
      state.info[item.nameEN] = item.value;
      if (item.type === "checkbox") {
        state.info[item.nameEN] = item.value.split(",");
      }
    }
  });
  // console.log("rules", rules);
  // 处理重复
  allGroup = Array.from(new Set(allGroup));
  console.log(allGroup);
  allGroup.map((groupItem) => {
    let info: any = {
      groupName: groupItem,
      fromList: [],
    };
    list.map((item: any, key) => {
      if (item.group === groupItem) {
        info.fromList.push(item);
      }
    });

    fromList.value.push(info);
  });

  console.log("fromList", fromList.value);

  // console.log(rules);
};

// 获取字典
const getDict = (val) => {
  console.log(val.name);
  state.dictList[val.name] = [
    {
      label: "字典1",
      value: "111",
    },
    {
      label: "字典2",
      value: "222",
    },
    {
      label: "字典3",
      value: "333",
    },
  ];
};
// 获取树形结构
const getTree = (val) => {
  state.treeList[val.name] = [
    {
      value: "zhinan",
      label: "指南",
      children: [
        {
          value: "shejiyuanze",
          label: "设计原则",
          children: [
            {
              value: "111",
              label: "1111",
            },
            {
              value: "12222",
              label: "2222",
            },
          ],
        },
      ],
    },
  ];
};
// 动态构建方法
const makeFun = () => {
  state.functionList["myCustomFunction"] = () => {
    console.log("whoohoo, it was added dynamically");
  };
};
/* 正则校验 */
const checkByZZ = (rule, value, callback) => {
  console.log("rule.field", rule.field);
  let zzRegex;
  list.value.map((item) => {
    if (item.nameEN === rule.field) {
      zzRegex = item.regex;
    }
  });
  if (zzRegex.test(value) === false) {
    callback(new Error("请正确输入"));
  } else {
    callback();
  }
};

// 显示最终数据json
const makeJson = () => {
  console.log(fromList);
};

// 增加list
const addList = (item) => {
  console.log(item);
  const childListItem: any = {};
  item.listOption.option.map((listItem) => {
    childListItem[listItem.nameEN] = listItem.value;
  });
  childListItem.nameZH = '测试A'
  state.info[item.nameEN].push(childListItem);
};

/**
 * @name: 增加步骤
 * @desc:
 * @return {*}
 */
const addStep = () => {
  const info = {
    label: "步骤 - " + Number(stepList.value.length + 1),
  };
  stepList.value.push(info);
};
onMounted(() => {
  console.log("vuedraggable", props.list);
  if (props.list && props.list.length > 0) {
    console.log("子组件");
    makeData(props.list);
  } else {
    const alllist = list.value;
    makeData(alllist);
  }
});
</script>

<style lang="scss" scoped>
.form-item {
  border: 1px solid #dedede;
  padding: 10px;
}
</style>
