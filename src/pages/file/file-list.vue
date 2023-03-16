<template>
  <div>
    <div class="text-4xl">文件预览与下载</div>
    <div class="m-2">
      <el-button type="primary" :loading="state.downLoading" @click="doDownload">下载</el-button>
      <el-button type="primary" :loading="state.downLoading" @click="closeLoading">关闭</el-button>
    </div>
    <el-table :data="state.list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="文件名称" prop="fileName"></el-table-column>
      <el-table-column label="操作" prop="fileName">
        <template #default="scope">
          <el-button type="primary" @click="viewInfo(scope.row)">查看</el-button>
          <el-button type="primary" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <fileInfo :file="state.currtRow" :showDialog="state.showInfo" @close="closeFileInfo"></fileInfo>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";

import fileInfo from './info.vue';
// 前端多文件打包zip
import JSZip from "jszip";
import FileSaver from "file-saver";
import * as docx from 'docx-preview'
// 预览
import XLSX from 'xlsx'
import axios from 'axios';

const state: any = reactive({
  list: [],
  loading: false,
  downLoading: false,
  selected: [],
  showInfo: false,
  currtRow: {}
})
const fullscreenLoading = ref();


const getTableDate = () => {
  state.list = [
    {
      id: '1',
      fileName: 'err.docx',
      s3Url: 'http://test.twoknives.cn/err.docx'
    }, {
      id: '1',
      fileName: 'err2.docx',
      s3Url: 'http://test.twoknives.cn/err2.docx'
    }, {
      id: '1',
      fileName: 'test日期表格.xlsx',
      s3Url: 'http://test.twoknives.cn/1.23M.xlsx'
    }, {
      id:34,
      fileName:'海岸警察总队海岸警察总队业务工作统计汇总表[2.8-2.14].xlsx',
      s3Url: 'http://test.twoknives.cn/海岸警察总队海岸警察总队业务工作统计汇总表[2.8-2.14].xlsx'
    },
    {
      id: '1',
      fileName: '港口船舶检查登记表111 .docx',
      s3Url: 'http://test.twoknives.cn/港口船舶检查登记表 .docx'
    },
    {
      id: '1',
      fileName: '调取日期不正确222.png',
      s3Url: 'http://test.twoknives.cn/调取日期不正确.png'
    },
    {
      id: '1',
      fileName: '001333.mp4',
      s3Url: 'http://test.twoknives.cn/001.mp4'
    },
    {
      id: '1',
      fileName: 'phpStudy_64 (3).zip',
      s3Url: 'http://test.twoknives.cn/phpStudy_64 (3).zip'
    },
    {
      id: '1',
      fileName: "James Blunt - You're Beautiful.mp3",
      s3Url: "http://test.twoknives.cn/James Blunt - You're Beautiful.mp3"
    },
    {
      id: '2',
      fileName: '附件2 公安机关信息化合作人员基本信息表(1).docx',
      s3Url: 'http://test.twoknives.cn/附件2 公安机关信息化合作人员基本信息表(1).docx'
    },
    {
      id: '3',
      fileName: '人、车、战果统计分析_表格样式.xlsx',
      s3Url: 'http://test.twoknives.cn/人、车、战果统计分析_表格样式.xlsx'
    },
    {
      id: '4',
      fileName: 'excle演示测试01.xls',
      s3Url: 'http://test.twoknives.cn/excle演示测试01.xls'
    },
    {
      id: '5',
      fileName: '3、融合输入输出标准设计1.9.xlsx',
      s3Url: 'http://test.twoknives.cn/3、融合输入输出标准设计1.9.xlsx'
    }
    , {
      id: '6',
      fileName: '1-97M.docx',
      s3Url: 'http://test.twoknives.cn/1-97M.docx'
    }, {
      id: '7',
      fileName: '2023-02-13席位今日应完成BUG+任务.pdf',
      s3Url: 'http://test.twoknives.cn/2023-02-13席位今日应完成BUG+任务.pdf'
    }
  ]
}

const handleSelectionChange = (list) => {
  console.log(list);
  state.selected = list;
}

const viewInfo = (row) => {

  state.showInfo = true;
  state.currtRow = row;
}
const closeFileInfo = (row) => {

  state.showInfo = false;
  state.currtRow = {};
}
const doDownload = () => {
  console.log("这里是导出");
  if (state.selected.length === 0) {
    ElMessage.error('请选择需要下载的文件');
    return false;
  }
  state.downLoading = true;
  console.log(state.selected);
  filesToRar(state.selected, '下载的文件.zip');
}


/***
* 文件打包
* filesArr: 需要打包的数据集合：[{fileUrl:文件url, fileName:文件名}]
* fileName: 压缩包名称
*/
const filesToRar = (filesArr, zipName) => {
  openLoading('开始下载，请耐心等待');
  let zip = new JSZip();
  let cache = {};
  let promises: any = [];
  const fileName = new Date().getTime() + '.zip';

  for (let i = 0, len = filesArr.length; i < len; i++) {
    let item = filesArr[i];
    if (item.s3Url) {
      const promise = getFileArrayBuffer(item.s3Url).then((data: any) => {
        // 下载文件， 并存储为ArrayBuffer对象（blob）
        // 逐个添加文件
        if (data) {
          // console.log('item', data);
          zip.file(item.fileName, data, { binary: true });
          cache[item.fileName] = data;

        } else {
          console.log(item.fileName);
        }
      }).catch(err => {
        console.log('下载失败', item.fileName);
        ElMessage.warning(`文件${item.fileName}下载失败`);
      });
      promises.push(promise);
    }
  }
  console.log('promises', promises);

  Promise.all(promises)
    .then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        // 生成二进制流
        // 利用file-saver保存文件，自定义文件名
        FileSaver.saveAs(content, fileName);
        state.downLoading = false;
        closeLoading();
      });
    })
    .catch((res) => {
      state.downLoading = false;
      ElMessage.error("文件压缩失败");
      closeLoading();
      state.downLoading = false;
    }).finally(() => {
      closeLoading();
      state.downLoading = false;
    });
};
// 获取文件blob
const getFileArrayBuffer = (url) => {
  return new Promise((resolve, reject) => {
    let _this = this;
    // 通过请求获取文件blob格式
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.responseType = "blob";


    xmlhttp.onload = function () {
      if (xmlhttp.status == 200) {
        resolve(xmlhttp.response);
      } else {
        reject(xmlhttp.status);
      }
    };
    xmlhttp.onerror = function (err) {
      console.log('err ===', err);
      reject(err)
    }
    xmlhttp.send();
  });
};

const download = (row) => {
  
  openLoading('下载中，请耐心等待');
  getFileArrayBuffer(row.s3Url).then((data: any) => {
    // 下载文件， 并存储为ArrayBuffer对象（blob）
    // 逐个添加文件
    if (data) {
      let blob = new Blob([data]);
      let objectUrl = URL.createObjectURL(blob);
      let link = document.createElement("a");
      let fname = row.fileName; //下载文件的名字
      link.href = objectUrl;
      link.setAttribute("download", fname);
      document.body.appendChild(link);
      link.click();
      closeLoading();

    } else {
      console.log(row.fileName);
      ElMessage.warning(`文件${row.fileName}下载失败`);
      closeLoading();
    }
  }).catch(err => {
    console.log('下载失败', row.fileName);
    ElMessage.warning(`文件${row.fileName}下载失败`);
    closeLoading();
  });
}
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

onMounted(() => {
  getTableDate();
});
</script>