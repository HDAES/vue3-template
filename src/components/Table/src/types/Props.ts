import { ColumnProps } from './Column'
import { TableConfig } from './TableConfig'

export interface Props {
  //表格名称
  title?: string

  // 请求api方法
  api: Function

  // 列数据
  columns: ColumnProps[]

  // 第几页
  page?: number

  // 每页多少条
  size?: number

  customOperate?: boolean

  // 表格配置
  tableConfig?: TableConfig

  //编辑方法
  handleEdit?: (arg0: any) => void

  //新增方法
  handleAdd?: () => void
}
