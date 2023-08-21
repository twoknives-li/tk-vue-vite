/**
 * @name: 所有表单配置
 * @return {*}
 */
export const formOption = {
  fieldType: '', // 字段类型
  formType: '', // 表单类型 日期:date  单选:radio 多选：checkbox 下拉:select  单行文本框:text  文本域：textarea 级联：cascader 数字：number
  order: 1, // 排序
  nameEN: '', // 字段英文
  nameZH: '', // 字段中文
  required: false, // 是否必填
  disabled: false, // 是否可编辑
  regex: null, // 正则
  value: '', // 默认值
  dictCode: '', // 字典id （仅多选、单选、下拉）
  dictCodeList: [], // 字典idList （用于匹配字典级联
  treeCode: '', // 树形菜单id  （仅级联选择器)
  precision: '', // 精度 (仅数字)
  format: '', // 格式化 (日期时)
  dateType: '', // 时间格式的类型
  inputWay: 'manually', // 获取方式 手动:manually  自动:byDefault
  inputWayDefault: '', // 自动时从哪个字段获值
  changeFun: '', // 切换时给指定字段选项赋值
  unitName: '', // 显示用单位
  placeholder: '', // 提示语
  groupCode: '', //分组code
  groupName: '', // 分组名称
  groupOrder: '', // 分组排序
  lgNumber: 12, // 字段栅格
  remark: '', // 备注提醒
  radioType: 'default', // 单选框样式类型
  showWordLimit: true, // 是否显示字符串统计
  maxlength: 20, // 可输入最大字符串限制
  optionType: 'dict', // 配置项取值类型   dict:字典， option：本地配置项,  byApi:接口获取
  option: [], // 可选项
  apiUrl: '',
  apiConfig: [], // 接口配置
  apiData: {}, // 接口传参， byApi接口获取配置项时传参数据
  filterable: false, // 下拉选项是否允许搜索
  functionName: '', // 自定义方法名
  function: '', // 动态change方法
  step: '', // 所属步骤
};

/**
 * @name: 步骤条配置
 * @desc: 
 * @return {*}
 */
export const stepOption = {
  name:'',
  value:''
}