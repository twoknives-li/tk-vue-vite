import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
} from "vue";
import Vue from "vue";
import formInfo from "./info/info.vue";
import type { FormInstance } from "element-plus";
export default {
  name: "news-list",
  components: {
    formInfo,
  },
  data() {
    const list:any = [];
    return {
      info: {
        neame: '',
        phone: ''
      },
      formListInfo: {
        list: [],
        idCard: '444'
      },
      list,
      rules: {
        idCard: [{ required: true, message: "证件号", trigger: "blur" }],
      }
    }
  },
  methods: {
    clickTest() {
      console.log("is test");
      const arr: any = [];
      const info: any =  {
        name: 'fff',
        phone: ''
      }
      arr.push(info);
      if (this.list !== null && this.list !== undefined) {
        this.list = arr.concat(this.list);
      } else {
        console.log('44');
        this.list = arr;
      }
      console.log(this.list);
    },

    rest() {
      // list = [];
      this.list.splice(this.list.length - 1, 1);
    },
    doSave(formEl: FormInstance | undefined) {
      console.log("保存");
      // this.$refs.infoChildRef.validate((valid: any) => {
      //           if (valid) {
      //             console.log('通过');
      //           } else {
      //             console.log('不通过');
      //           }
      //         });
      // console.log(formEl);
      const childList = this.$refs.childForm
      console.log(childList)
      const formList: any = [];
      childList.forEach(v => {
        formList.push(
          new Promise((resolve) => {
            console.log(v);
            v.$refs.infoRef.validate((valid: any) => {
              if (valid) {
                resolve(true);
              } else {
                resolve(false);
              }
            });
          })
        );
      });
      Promise.all(formList).then((res) => {
        console.log("校验完成");
        console.log(res);
      });
    },
    doReset() {
      console.log("重置");
    }

  },
  setup() {
    const {
      proxy: { $nextTick, $forceUpdate },
    }: any = getCurrentInstance();
    return {
    };
  },
};
