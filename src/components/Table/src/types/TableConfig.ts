export type TableSize = 'large' | 'default' | 'small'

export interface TableConfig {
  //是否为斑马纹
  stripe?: boolean

  //是否带有纵向边框
  border?: boolean

  //Table 的尺寸
  size?: TableSize

  //列的宽度是否自撑开
  fit?: boolean

  //是否显示表头
  showHeader?: boolean

  //是否显示序号
  index?: boolean

  //序号title
  indexName?: string

  //是否显示多选框
  selection?: boolean
}
