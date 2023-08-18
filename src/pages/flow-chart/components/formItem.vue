<template>
  <div>
    <div v-if="element.type === 'text'">
      <el-input
        :disabled="element.disabled"
        v-model="state.info[element.nameEN]"
        :name="element.nameEN"
        placeholder=""
      ></el-input>
    </div>
    <div v-if="element.type === 'radio'">
      <el-radio-group v-model="state.info[element.nameEN]">
        <el-radio
          v-for="(childItem, childKey) in element.valueList"
          :key="childKey"
          :label="childItem"
          >{{ element.labelList[childKey] }}</el-radio
        >
      </el-radio-group>
      +
    </div>
    <div v-if="element.type === 'date'">
      <el-date-picker
        v-model="state.info[element.nameEN]"
        :format="element.format"
        :value-format="element.format"
        placeholder="请选择"
      ></el-date-picker>
    </div>
    <div v-if="element.type === 'select'">
      <el-select v-model="state.info[element.nameEN]" placeholder="请选择">
        <el-option
          v-for="dictItem in state.dictList[element.nameEN]"
          :key="dictItem.value"
          :label="dictItem.label"
          :value="dictItem.value"
        >
        </el-option>
      </el-select>
    </div>
    <div v-if="element.type === 'checkbox'">
      <el-checkbox-group v-model="state.info[element.nameEN]">
        <el-checkbox
          v-for="(childItem, childKey) in element.valueList"
          :key="childItem"
          :label="childItem"
          >{{ element.labelList[childKey] }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <div v-if="element.type === 'cascader'">
      {{ element.changeFun }}
      <el-cascader
        v-model="state.info[element.nameEN]"
        :props="{ multiple: false, checkStrictly: true }"
        :options="state.treeList[element.nameEN]"
        @change="(v) => element.changeFun && handleChange(v, element.nameEN)"
      ></el-cascader>
    </div>
    <div v-if="element.type === 'components-form'">
      {{ element.changeFun }}
       <test-form></test-form>
    </div>
  </div>
</template>
<script setup lang="ts" name="form-item">
import { Prop, reactive, onMounted, ref} from "vue";
import testForm from './testForm.vue';
const props = defineProps({
  element: {
    type: Object,
    default: () => {},
  },
  state: {
    type: Object,
    default: () => {},
  }
});
const state = ref();
const element = ref({});

const handleChange = (v, str) => {
  console.log("handleChange", v, str);
  // console.log(name, e);
};

onMounted(()=>{
  console.log('props', props.element);
  state.value = props.state
  element.value = props.element
  console.log('state', state);
})
</script>
