import axios from 'axios';
import {
    ElMessageBox
} from 'element-plus';

const config = {
    // baseURL: process.env.baseURL
    baseURL: 'http://180.76.147.36:9006/',
    timeout: 2000,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
		'content-type': 'application/json',
        'access-token':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImRlcHROYW1lIjoi5a6j5rGJ5Y6_5Y2r5YGl5aeUIiwicm9sZUluZm9zIjpbeyJyb2xlQ29kZSI6Iklzb2xhdGVkX3VzZXIiLCJyb2xlSWRlbnRpdHkiOiIiLCJyb2xlTmFtZSI6IuaVsOaNrue7tOaKpOeuoeeQhuWRmCIsInJvbGVUeXBlIjoiIiwic2VsZWN0ZWQiOmZhbHNlfSx7InJvbGVDb2RlIjoiYXJlYV91c2VyIiwicm9sZUlkZW50aXR5IjoiIiwicm9sZU5hbWUiOiLljLrliJLnlKjmiLciLCJyb2xlVHlwZSI6IiIsInNlbGVjdGVkIjp0cnVlfV0sImRpc3RyaWN0Q29kZSI6IjUxMTcyMjAwMDAwMCIsIm9yZ05hbWUiOiLlrqPmsYnljr_ljavlgaXlp5QiLCJyb2xlcyI6WyJhcmVhX3VzZXIiXSwiZGVwdElkIjoiNTExNzIyMDAwMDAwIiwidGVsZXBob25lIjpudWxsLCJ1c2VySWQiOiIyMDIyMDUwMjIxMzUxNTQ5NS1GNDI0LUIyMDdGRDJDNiIsIm9yZ0lkIjoiNTExNzIyMDAwMDAwIiwib3JnQ29kZSI6IjUxMDAwMDAwMDAwMCw1MTE3MDAwMDAwMDAsNTExNzIyMDAwMDAwIiwicm9sZU5hbWUiOiJhcmVhX3VzZXIiLCJpZCI6IjIwMjIwNTAyMjEzNTE1NDk1LUY0MjQtQjIwN0ZEMkM2IiwidXNlcm5hbWUiOiLlp5rlsI_omY4ifSwiaXNzIjoieXV5b25nYm8iLCJzdWIiOiIyMDIyMDUwMjIxMzUxNTQ5NS1GNDI0LUIyMDdGRDJDNiIsImlhdCI6MTY1MzAxOTE3OSwiZXhwIjoxNjUzMTA1NTc5fQ.TAqQIAFOnK5Ody-W638j2f-La80czwENhXpoD6V7Nb8'
    },
    dataType: 'json',
    // responseType: 'text'
};

const api: any = axios.create(config);

// 默认 post 请求，使用 application/json 形式
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.get['Content-Type'] = 'application/json';

api.post = function (url:any, params:any) {
    return new Promise((resolve, reject) => {
        // console.log("****************************");
        axios({
            method: 'post',
            url: config.baseURL + url,
            params,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then(response => {
            if (response.status == 200) {
                // 根据实际情况进行更改
                resolve(response)
            } else {
                reject(response)
            }
        })
    })

}



// 添加请求拦截器
api.interceptors.request.use(function (config:any) {
    // 在发送请求之前做些什么
    return config;
}, function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// http response 拦截器
api.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.data.code) {
            // console.log(response.status);
            switch (response.status) {
                case 301:
                    console.log('登录过期');
                // store.state.isLogin = false
                // router.replace({
                //   path: 'login',
                //   query: {
                //     redirect: router.currentRoute.fullPath
                //   }
                // })
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })

export default api;
