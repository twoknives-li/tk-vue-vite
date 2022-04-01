import { defineComponent, reactive, ref, toRefs } from 'vue';
export default {
  name: 'App',
  components: {
  },
  data(){
    const list =  [{
      id: 1,
      name: '测试名称',
      is_choose: true
    },
    {
      id: 1,
      name: '测试名称',
      is_choose: true
    },
    {
      id: 1,
      name: '测试名称',
      is_choose: true
    }]
    return {
      list
    }
  },
  setup(){

  },
  methods: {
    clickTest() {
      console.log('is test');
      console.log(this.list[0]);
    }
  }
}