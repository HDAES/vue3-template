import { StorageSerializers, useStorage } from '@vueuse/core'

import { ColumnProps } from '../types/Column'
import { Pagination } from '../types/Pagination'
import { Props } from '../types/Props'
import { TableConfig } from '../types/TableConfig'
import { ElMessageBox } from 'element-plus'
import { useSelect } from './useSelect'
import { TableInstance } from 'types/elemntPlus'

interface DialogConfigType {
  visible: boolean
  type: 'edit' | 'add'
  row: any
}

const { selectList } = useSelect()

//表格数据
const data = ref<any[]>([])

//表格Ref
const tableRef = ref<TableInstance>()

//表格加载状态
const loading = ref<boolean>(true)

//刷新表格数据
const refreshState = ref<boolean>(false)

//表格名字
const title = ref<string>('默认名字')

//表格列配置
const columns = ref<ColumnProps[]>([])

//自定义操作列
const customOperate = ref<boolean>(false)

//自定义左边栏
const haveSlot = ref<boolean>(false)

//分页配置
const pagination = reactive<Pagination>({
  total: 0, //总条数
  currentPage: 1, //当前页
  pageSize: 10 //每页条数
})

//表格默认配置
const tableConfig = ref<TableConfig>({
  stripe: true,
  border: false,
  size: 'small',
  showHeader: true,
  index: false,
  indexName: '序号',
  selection: true,
  haveSlot: false
})

const dialogConfig = reactive<DialogConfigType>({
  visible: false,
  type: 'add',
  row: null
})

//编辑或者新增按钮
const handleUpDate = (type: boolean, row?: any) => {
  dialogConfig.visible = true
  dialogConfig.type = type ? 'add' : 'edit'
  dialogConfig.row = row
}

const handleDelete = ref<(type: 'single' | 'multiple', arg1: any) => void>(
  () => {}
)
const handleCellClick = ref<(arg0: any) => void>(() => {})

const resetColumns = ref<() => void>(() => {})

/**
 * 刷新表格
 */
function refresh(): void {
  refreshState.value = !refreshState.value
}

export function useTable() {
  return {
    data,
    tableRef,
    loading,
    title,
    columns,
    customOperate,
    haveSlot,
    pagination,
    tableConfig,
    dialogConfig,
    refresh,
    handleUpDate,
    resetColumns,
    handleDelete,
    handleCellClick
  }
}

/**
 * 注册表格
 * @param tableProps
 */
export function registerTable<T>(tableProps: Props): void {
  //表格名字
  title.value = tableProps.title || '默认名字'

  //分页配置
  pagination.currentPage = tableProps.page || 1

  pagination.pageSize = tableProps.size || 10

  //自定义操作列
  customOperate.value = tableProps.customOperate || false

  //表格配置
  tableConfig.value = { ...tableConfig.value, ...tableProps.tableConfig }

  //自定义左边栏
  haveSlot.value = tableProps.tableConfig?.haveSlot || false

  //列点击事件
  handleCellClick.value = row => {
    tableProps.cellClick ? tableProps.cellClick(row) : null
  }

  // 监听 page,size 的变化 请求接口
  watchEffect(() => {
    loading.value = true
    refreshState.value
    tableProps
      ?.apiList({ page: pagination.currentPage, size: pagination.pageSize })
      .then(res => {
        if (res instanceof Array) {
          data.value = res
        } else {
          data.value = res.list
          pagination.currentPage = res.page
          pagination.pageSize = res.size
          pagination.total = res.total
        }
        loading.value = false
      })
  })

  useColums(tableProps)

  deleteHooks(tableProps)

  resetDialogConfig()
}

/**
 * 表格列hooks
 * @param tableProps
 * @returns
 */
export function useColums(tableProps: Props) {
  const columnsStorage = useStorage(
    'vueuse-local-' + tableProps.apiList.name,
    null,
    undefined,
    {
      serializer: StorageSerializers.object
    }
  )

  let tempColumns: ColumnProps[] = []
  tableProps.columns.forEach((item: ColumnProps) => {
    item.show = true
    tempColumns.push(item)
  })

  if (!columnsStorage.value) {
    columnsStorage.value = tempColumns
    columns.value = tempColumns
  } else {
    columns.value = columnsStorage.value
  }

  resetColumns.value = () => {
    columnsStorage.value = tempColumns
    columns.value = tempColumns
  }
}

/**
 * 重置删除按钮事件
 * @param tableProps
 */
function deleteHooks(tableProps: Props): void {
  handleDelete.value = (type: 'single' | 'multiple', row: []) => {
    let title = <any>[]
    let ids = <any>[]
    if (tableProps.apiDelele) {
      if (type === 'single') {
        title = row[tableProps.apiDelele.name || 'name']
        ids = [row[tableProps.apiDelele.id || 'id']]
      } else if (type === 'multiple') {
        selectList.value.forEach(item => {
          ids.push(item[tableProps.apiDelele?.id || 'id'])
          title.push(item[tableProps.apiDelele?.name || 'name'])
        })
      }

      ElMessageBox.confirm(`此操作将永久删除 ${title} , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tableProps.apiDelele?.api({ ids: ids.toString() }).then(res => {
          refresh()
        })
      })
    } else {
      console.log('--暂未实现--')
    }
  }
}

/**
 * 重置弹窗
 */
function resetDialogConfig(): void {
  dialogConfig.visible = false
  dialogConfig.type = 'add'
  dialogConfig.row = null
}
