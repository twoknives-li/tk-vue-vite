import { defineComponent, reactive, ref, toRefs, getCurrentInstance } from 'vue';
export default {
  name: 'App',
  components: {
  },
  data(){
    const list:any =  [{
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
    const user:Record<string, any> = {
      id:'12321312',
      name:"王五"
    }
    return {
      list,
      user
    }
  },
  methods: {
    clickTest() {
      console.log('is test');
      console.log(this.list[0]);
    }
  }
}