<template>
  <div>
      这里是测试子组件
    </div> 
</template>
<script setup lang="ts" name="test-form">
import { Prop, reactive, onMounted, ref} from "vue";
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
