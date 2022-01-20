export type Alignment = 'left' | 'center' | 'right'

export interface ColumnProps {
  title: string
  dataIndex: string
  formatter?: Function
  align?: Alignment
  slotname?: string
  show?: boolean
  width?: number
  sortable?: boolean
  showOverflowTooltip?: boolean
}
