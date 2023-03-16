<template>
  <div class="p-10">
    <el-form :model="state.info" :rules="rules" ref="formRef">
      <div v-for="(groupItem, key) in fromList" :key="key">
        <div>分组：{{ groupItem.groupName }}</div>

        <div v-for="(item, key) in groupItem.fromList" :key="key">
          <el-form-item :label="item.nameENEN" :prop="item.nameEN">
            <br />
            <div v-if="item.type === 'text'">
              <el-input
                v-model="state.info[item.nameEN]"
                :name="item.nameEN"
                placeholder=""
              ></el-input>
            </div>
            <div v-if="item.type === 'radio'">
              <el-radio-group v-model="state.info[item.nameEN]">
                <el-radio
                  v-for="(childItem, childKey) in item.valueList"
                  :key="childKey"
                  :label="childItem"
                  >{{ item.labelList[childKey] }}</el-radio
                >
              </el-radio-group>
            </div>
            <div v-if="item.type === 'date'">
              <el-date-picker
                v-model="state.info[item.nameEN]"
                :format="item.format"
                :value-format="item.format"
                placeholder="请选择"
              ></el-date-picker>
            </div>
            <div v-if="item.type === 'select'">
              <el-select v-model="state.info[item.nameEN]" placeholder="请选择">
                <el-option
                  v-for="dictItem in state.dictList[item.nameEN]"
                  :key="dictItem.value"
                  :label="dictItem.label"
                  :value="dictItem.value"
                >
                </el-option>
              </el-select>
            </div>
            <div v-if="item.type === 'checkbox'">
              <el-checkbox-group v-model="state.info[item.nameEN]">
                <el-checkbox
                  v-for="(childItem, childKey) in item.valueList"
                  :key="childItem"
                  :label="childItem"
                  >{{ item.labelList[childKey] }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div v-if="item.type === 'cascader'">
              {{ item.changeFun }}
              <el-cascader
                v-model="state.info[item.nameEN]"
                :props="{ multiple: false, checkStrictly: true }"
                :options="state.treeList[item.nameEN]"
                @change="(v) => item.changeFun && handleChange(v, item.nameEN)"
              ></el-cascader>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-button type="primary" @click="doSave()">提交</el-button>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { checkboxProps } from "element-plus/lib/components";
const state = reactive({
  info: {},
  dictList: {}, // 字典
  treeList: {}, // 树形
  functionList: {},
});
const formRef = ref();

const rules: any = reactive({
  // nameB: [ { validator: checkNameb, trigger: "blur" }]
});
const fromList: any = ref([]);
const list: any = ref([
  {
    group: "分组a", // 分组
    type: "text", // 类型  单选:radio 多选：checkbox 下拉:select  单行文本框:text  文本域：textarea 级联：cascader 数字：number
    order: "1", // 排序
    nameEN: "nameA", // 字段英文
    nameZH: "字段A", // 字段中文
    required: false, // 是否必填
    disable: false, // 是否可编辑
    regex: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, // 正则
    value: "默认值0001", // 默认值
    dictCode: "dictcode123", // 字典id （仅多选、单选、下拉）
    treeCode: "treeCode", // 树形菜单id  （仅级联选择器)
    precision: "2", // 精度 (仅数字)
    format: "YYYY-MM-DD", // 格式化 (日期时)
    inputWay: "manually", // 获取方式 手动:manually  自动:byDefault
    inputWayDefault: "", // 自动时从哪个字段获值
    changeFun: "nameC", // 切换时给指定字段选项赋值
    unitName: "万立方米", // 显示用单位
  },
  {
    group: "分组B",
    type: "text",
    nameZH: "nameB",
    nameEN: "nameB",
    // validator: "checkNameb",
    regex: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    required: true,
    disable: false,
    value: "",
  },
  {
    group: "分组B",
    type: "radio",
    nameEN:"nameC",
    // validator: "myCustomFunction",
    disable: false,
    labelList: ["选项1", "选项2", "选项3"],
    valueList: ["1", "2", "3"],
    value: "",
  },
  {
    group: "分组B",
    type: "date",
    nameEN:"nameD",
    disable: false,
    value: "",
    format: "YYYY-MM-DD",
  },
  {
    group: "分组B",
    type: "select",
    nameEN:"nameE",
    disable: false,
    dictCode: "dictcode123",
    value: "",
  },
  {
    group: "分组B",
    type: "checkbox",
    nameEN:"nameF",
    disable: false,
    dictCode: "",
    value: "3",
  },
  {
    group: "分组a",
    type: "cascader",
    nameEN:"nameG",
    treeCode: "treeCode",
    changeFun: "changeFunA",
    disable: false,
    value: "",
  },
  {
    group: "分组c",
    type: "cascader",
    nameEN:"mdd",
    treeCode: "treeCode",
    changeFun: "",
    disable: false,
    value: "",
  },
]);
const handleChange = (v, str) => {
  console.log("handleChange", v, str);
  // console.log(name, e);
};
/* 正则校验 */
const checkByZZ = ( rule, value, callback) => {
  console.log('rule.field', rule.field);
  let zzRegex
  list.value.map(item=>{
    if(item.nameEN === rule.field){
      zzRegex = item.regex;
    }
  })
  if (
    zzRegex.test(
      value
    ) === false
  ) {
    callback(new Error("请正确输入"));
  } else {
    callback();
  }
};
const doSave = async () => {
  console.log(state.info);
  const refForm: any = formRef.value;
  await refForm.validate((valid: any, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("校验不通过", fields);
    }
  });
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
// 处理数据
const makeData = () => {
  console.log(list.value);
  let allGroup: any = [];
  list.value.map((item: any, key) => {
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
    if (item.value) {
      state.info[item.nameEN] = item.value;
      if (item.type === "checkbox") {
        state.info[item.nameEN] = item.value.split(",");
      }
    }
  });
  console.log("rules", rules);
  // 处理重复
  allGroup = Array.from(new Set(allGroup));
  console.log(allGroup);
  allGroup.map((groupItem) => {
    let info: any = {
      groupName: groupItem,
      fromList: [],
    };
    list.value.map((item: any, key) => {
      if (item.group === groupItem) {
        info.fromList.push(item);
      }
    });

    fromList.value.push(info);
  });

  // console.log(fromList.value);

  console.log(rules);
};

onMounted(() => {
  console.log("begin");
  makeFun();
  console.log(state.functionList);
  state.functionList["myCustomFunction"];
  makeData();
});
</script>
