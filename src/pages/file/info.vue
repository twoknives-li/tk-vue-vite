
<template>
  <div class="viewItemFile">
    <el-dialog title="文件预览" v-model="state.showInfo" @close="close(false)" width="60%">
      <div v-loading="state.loading" element-loading-text="数据正在为您载入 请稍后..." element-loading-spinner="el-icon-loading"
        element-loading-background="#ffffff" class="file-content">
        <div class="title" v-show="props.file.filName"> {{ props.file.filName }}</div>
        <iframe :src="state.objectUrl" v-if="state.fileplaytype === 'pdf'" class="file-pdf"></iframe>
        <img :src="state.objectUrl" v-if="state.fileplaytype === 'img'" class="file-img" />
      <!-- <iframe v-if="state.fileType === 'office'" :src="'https://view.officeapps.live.com/op/view.aspx?src=' + this.url">
                                          </iframe> -->

      <!-- <vue-office-excel :src="state.objectUrl" v-if="state.fileplaytype === 'office' && state.fileType === 'xlsx'"
                                @rendered="rendered" @error="showError" /> -->
      <!-- <vue-office-docx :src="state.objectUrl" v-if="state.fileplaytype === 'office' && state.fileType === 'docx'"
              style="height: 100vh;" @rendered="rendered" /> -->

        <div class="docWrap" v-if="state.fileplaytype === 'office' && state.fileType === 'docx'">
          <!-- 预览文件的地方（用于渲染） -->
          <div ref="file"></div>
        </div>

        <div ref="boxRef" v-loading="state.loading" class="office-box-table"
          v-if="state.fileplaytype === 'office' && state.fileType !== 'docx'">
          <div class="tab">
            <el-radio-group size="small" v-model="excel.sheetNameActive" class="tab-scroll" @change="getSheetNameTable">
              <el-radio-button v-for="(item, index) in excel.sheetNames" :key="index" :label="item"></el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 5px;border: 1px solid #a0a0a0;overflow:auto;">
            <div v-html="excel.SheetActiveTable" style="padding: 10px 15px"></div>
          </div>
        <!-- <div v-html="state.htmlUrl" v-if="state.fileplaytype === 'office' && state.fileType !== 'docx'"
                        class="office-box"></div> -->
        </div>

        <audio controls v-if="state.fileplaytype === 'audio' && state.showInfo" ref="audioplay" :src="state.objectUrl" />
        <video controls class="video" v-if="state.fileplaytype === 'video' && state.showInfo" ref="videoplay"
          :src="state.objectUrl" />
      </div>
      <div class="file-bottom">
        <el-button type="info" @click="down()">下载</el-button>
        <el-button type="info" @click="close(false)">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  defineProps,
  watch,
  defineEmits,
  onMounted,
  getCurrentInstance
} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import FileSaver from "file-saver";

// //引入VueOfficeExcel组件
// import VueOfficeExcel from '@vue-office/excel'
// //引入相关样式
// import '@vue-office/excel/lib/index.css'
// //引入VueOfficeDocx组件
// import VueOfficeDocx from '@vue-office/docx'
// //引入相关样式
// import '@vue-office/docx/lib/index.css'

import * as XLSX from 'xlsx'
import * as docx from 'docx-preview'
import {
  EvidenceMIMEtypes,
  BanEvidenceAccept,
  TransEvidenceAccpet,
  PicAccept,
  AudioAccept,
  PDFAccept,
  VideoAccept
} from './file-config';


const { proxy }: any = getCurrentInstance();
const fileInfo = ref();
const state: any = reactive({
  objectUrl: "", // 文件地址
  fileType: "pdf", // 文件类型
  fileplaytype: '',
  loading: false,
  showInfo: false,
  blobUrl: '',
  htmlUrl: '',

  MIMEtypes: EvidenceMIMEtypes, // 通用格式映射
  BanList: BanEvidenceAccept,// 禁止浏览的文件格式
  AccTransList: TransEvidenceAccpet, // 可访问文档格式 转换格式
  AccPicList: PicAccept, // 可访问图片格式
  AccPdf: PDFAccept, // 可访问pdf格式
  AccAudioList: AudioAccept, // 可访问音频格式 
  AccVideoList: VideoAccept,

});
const data = reactive({
  excel: {
    // 数据
    workbook: {},
    // 表名称集合
    sheetNames: [],
    // 激活项
    sheetNameActive: "",
    // 当前激活表格
    SheetActiveTable: ""
  }
})

const { excel }: any = toRefs(data);

const fullscreenLoading = ref();

const emptyTips = ref('暂无内容');
const boxRef = ref();
const props = defineProps({
  file: {
    type: Object,
    default: {},
  },
  showDialog: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['close']);
/**
 * @name: 处理文件
 * @return {*}
 */
const makeFile = () => {
  console.log('makeFile');
  state.loading = true;
  // 判断文件格式
  state.fileType = props.file.fileName.split('.').pop();
  state.objectUrl = props.file.s3Url;
  console.log('filesType', state.fileType);
  if (state.AccPicList.includes(state.fileType)) {
    state.fileplaytype = 'img';
    state.loading = false;
  } else if (state.AccPdf.includes(state.fileType)) {
    state.fileplaytype = 'pdf';
    state.loading = false;
  } else if (state.AccAudioList.includes(state.fileType)) {
    state.fileplaytype = 'audio';
    state.loading = false;
  } else if (state.AccVideoList.includes(state.fileType)) {
    state.fileplaytype = 'video';
    state.loading = false;
  } else if (state.AccTransList.includes(state.fileType)) {
    console.log(state.fileType);
    // state.fileplaytype = state.fileType;
    state.fileplaytype = 'office';
    if (state.fileType === 'docx') {
      makeDocx();
    } else {
      makeExcel();
    }
  } else {
    ElMessage.warning(`当前格式文件${state.fileType}尚未兼容，请下载后查看`);
    state.objectUrl = '';
    state.fileplaytype = '';
    state.loading = false;
    close(false);
  }

}

//  下载
const down = () => {
  let a = document.createElement('a')
  a.href = props.file.s3Url
  a.download = props.file.fileName
  a.target = '_blank'
  a.click()

}
// 关闭
const close = (statue) => {
  const info = {
    statue: statue
  }
  // state.showInfo = false;
  emit('close', info);
}
// 重新处理xlsx
const makeExcel = () => {
  console.log('重新处理Excel', props.file.s3Url);
  state.loading = true;
  // getFileArrayBuffer(props.file.s3Url).
  const controller = new AbortController();
  const { signal } = controller;
  let total = 1000;
  let canMake = false; // 是否允许构建
  axios.request({
    method: "GET",
    url: props.file.s3Url, //路径
    responseType: "arraybuffer", //响应格式
    headers: {
      "Content-Type":
        "application/vnd.ms-excel;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    signal: controller.signal,
    onDownloadProgress: (event:any) => {
      // 进度查看
      console.log(Math.round(event.loaded / event.total * 100) + '%');
      console.log(event);
      console.log(event.total);
      total = total/1024;
      if (event.total/1024 > 500) {
        console.log('中止');
        controller.abort(); //主动终止fetch请求
        ElMessage.warning(`文件过大请下载后查看`);
        close(false);
      }
    }
  }).then((res: any) => {
    const data = res.data
    console.log('makeExcel', data);
    if(total < 500){
      canMake = true;
    }
    if (data && canMake) {
      let resData: any = new Uint8Array(data);
      let workbook = XLSX.read(resData, { type: "array" });   //表格对象
      let sheetNames = workbook.SheetNames;  //获取到所有表格
      // let worksheet = workbook.Sheets[sheetNames[0]];  //取第一张表
      // state.htmlUrl = XLSX.utils.sheet_to_html(worksheet);
      // console.log('state.htmlUrl ', state.htmlUrl);
      // 赋值样式
      // let boxTable = boxRef.value.getElementsByTagName('tbody')[0];
      // console.log('tableDom', boxTable);
      // boxTable.className = 'office-box-table';
      // console.log(boxTable);

      excel.value.workbook = workbook
      excel.value.sheetNames = sheetNames
      excel.value.sheetNameActive = sheetNames[0]
      getSheetNameTable(sheetNames[0])

      // 处理空格
      // let tableDom = boxRef.value.querySelector(".office-box");
      // let trs = tableDom.querySelectorAll("tr");
      // trs.forEach((tr) => {
      //   if (!tr.innerText.trim()) {
      //     tr.className = 'office-box-table-tr';
      //     tr.remove();
      //   }
      // });
    } else {
      
      ElMessage.warning(`文件过大请下载后查看`);
    }
  }).finally(() => {
    console.log('下载完成');
    state.loading = false;
  });
}

const makeDocx = () => {
  axios.request({
    method: "GET", //这个不解释了吧
    url: props.file.s3Url, //路径
    responseType: "blob", //告诉服务器想到的响应格式
  })
    .then((res) => {
      console.log(res);
      if (res) {
        // let docx = require("docx-preview");
        docx.renderAsync(res.data, proxy.$refs.file);
        state.loading = false;
      } else {
        // Message.error({ title: "失败", message: "接口请求失败" });
        state.loading = false;
      }
    })
    .catch(function (error) {
      // Message.error({ title: "失败", message: "接口请求失败" });
      console.log(error);
      state.loading = false;
    });
}
const rendered = () => {
  console.log("渲染完成")
}
const showError = (err) => {
  console.log(err)
}
function getSheetNameTable(sheetName) {
  try {
    // 获取当前工作表的数据
    const worksheet = excel.value.workbook.Sheets[sheetName]
    // 转换为数据  1.json数据有些问题，2.如果是html那么样式需修改
    let htmlData = XLSX.utils.sheet_to_html(worksheet, { header: '', footer: '' })
    htmlData = htmlData === '' ? htmlData : htmlData.replace(/<table/, '<table class="default-table" border="1px solid #ccc" cellpadding="0" cellspacing="0"')
    // 第一行进行改颜色
    htmlData = htmlData === '' ? htmlData : htmlData.replace(/<tr/, '<tr style="background:#b4c9e8"')
    excel.value.SheetActiveTable = htmlData
  } catch (e) {
    // 如果工作表没有数据则到这里来处理
    excel.value.value.SheetActiveTable = '<h4 style="text-align: center">' + emptyTips.value + '</h4>'
  }
}

// 获取文件blob
const getFileArrayBuffer = (url) => {
  let _this = this;
  return new Promise((resolve, reject) => {
    // 通过请求获取文件blob格式
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.responseType = "blob";
    xmlhttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.status);
      }
    };
    xmlhttp.send();
  });
};


const openLoading = (string: any) => {
  fullscreenLoading.value = ElLoading.service({
    lock: false,
    text: string ? string : 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

const closeLoading = () => {
  fullscreenLoading.value.close()
}
watch(
  () => props.file,
  (val, oldVal) => {
    // console.log(val, oldVal);
    if (state.showInfo) {
      makeFile();
    }

    // if (val.fileId !== oldVal.fileId) {
    //   state.showInfo = props.showDialog;
    //   makeFile();
    // }
  }
);
watch(() => props.showDialog, (val, oldVal) => {
  // console.log(val, oldVal);

  console.log('state.showInfo ==============', state.showInfo)
  state.showInfo = val;
  console.log('state.showInfo ==============', state.showInfo)
});
onMounted(() => {
  // console.log('file info');
})

defineExpose({ fileInfo })
</script>



<style lang="scss" scoped>
.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}

.file-content {
  height: 500px;
  width: 100%;
  overflow: scroll;
}

.file-pdf {
  width: 100%;
  height: 500px;
}

.file-img {
  width: 100%;
  height: auto;
}

.file-bottom {
  margin: 10px 0;
  text-align: center;
}

.office-box-table-tr {
  padding: 3px;
  border: 1px solid #333 !important;
}

.default-table {
  width: 100%;

  tr {
    border: 1px solid #333 !important;
  }

  td {
    border: 1px solid #333 !important;
  }
}

.tab-scroll {
  overflow-x: scroll;
  width: 100%;
  flex-wrap: inherit;
  padding: 5px 0;
}

.table-html-wrap v-deep table {
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
  border-collapse: collapse;
  margin: auto;
}

.viewItemFile {
  .image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 600px;
      width: 600px;
    }
  }

  .divContent {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  v-deep .el-dialog {
    margin: 0 !important;
    height: 100vh !important;

    .el-dialog__footer {
      margin-bottom: 30px;
      padding: 0px;
    }
  }

  v-deep .el-dialog__body {
    height: 96%;
    width: 100%;
    padding: 0;
    overflow: auto;
  }
}

.viewItemFile {
  .file-pre {
    height: calc(100vh - 40px);
    padding: 20px;

    .table-html-wrap v-deep table {
      border-right: 1px solid #e8eaec;
      border-bottom: 1px solid #e8eaec;
      border-collapse: collapse;
      margin: auto;
    }

    .table-html-wrap v-deep table td {
      border-left: 1px solid #e8eaec;
      border-top: 1px solid #e8eaec;
      white-space: wrap;
      text-align: left;
      min-width: 100px;
      padding: 4px;
    }

    table {
      border-top: 1px solid #EBEEF5;
      border-left: 1px solid #EBEEF5;
      width: 100%;
      overflow: auto;

      tr {
        height: 44px;
      }

      td {
        min-width: 200px;
        max-width: 400px;
        padding: 4px 8px;
        border-right: 1px solid #EBEEF5;
        border-bottom: 1px solid #EBEEF5;
      }
    }

    .el-tabs--border-card>.el-tabs__content {
      overflow: auto;
      height: calc(100vh - 110px);
    }
  }

  v-deep table {
    width: 100% !important;
    border-collapse: collapse !important;
    border-spacing: 0 !important;
    text-align: center !important;
    border: 0px !important;
    overflow-x: auto !important;
  }

  v-deep table tr td {
    /* border: 1px solid gray !important; */
    border-right: 1px solid gray !important;
    border-bottom: 1px solid gray !important;
    width: 300px !important;
    height: 33px !important;
  }

  /**整体样式 */
  v-deep .excel-view-container {
    background-color: #ffffff;
  }

  /**标题样式 */
  v-deep .class4Title {
    font-size: 22px !important;
    font-weight: bold !important;
    padding: 10px !important;
  }

  /**表格表头样式 */
  v-deep.class4TableTh {
    /* font-size: 14px !important; */
    font-weight: bold !important;
    padding: 2px !important;
    background-color: #ccc !important;
  }
}

.video {

  height: auto;
  width: 100%
}
</style>