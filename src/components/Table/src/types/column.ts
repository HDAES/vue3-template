import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { RendererElement, RendererNode, VNode } from 'vue'

export type Alignment = 'left' | 'center' | 'right'

export interface ColumnProps {
  //列标题名字
  label: string
  //数据索引值
  dataIndex?: string
  //过滤数据方法
  formatter?: (
    row: any,
    column: TableColumnCtx<any>,
    cellValue: any,
    index: number
  ) => string | VNode<RendererNode, RendererElement>

  // 对齐方式
  align?: Alignment

  //自定义slote名
  slotname?: string

  //是否显示列
  show?: boolean

  //列宽
  width?: number

  //对应列是否可以排序
  sortable?: boolean

  //当内容过长被隐藏时显示
  showOverflowTooltip?: boolean
}
