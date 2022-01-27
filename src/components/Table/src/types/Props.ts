import { ColumnProps } from './Column'
import { TableConfig } from './TableConfig'

export interface ApiDelele {
  // 删除接口方法
  api: Function

  // 需要删除ID
  id?: string

  // 提示名字
  name?: string
}

export interface Props {
  //表格名称
  title?: string

  // 表格英文名字 用于缓存
  title_en?: string

  // 请求api方法
  apiList: Function

  // 删除接口方法
  apiDelele?: ApiDelele

  // 列数据
  columns: ColumnProps[]

  // 第几页
  page?: number

  // 每页多少条
  size?: number

  //自定义操作栏
  customOperate?: boolean

  // 表格配置
  tableConfig?: TableConfig

  //编辑方法
  handleEdit?: (arg0?: any) => void

  //新增方法
  handleAdd?: () => void
}
