import { ref, reactive, watchEffect, Ref } from 'vue'
import { StorageSerializers, useStorage } from '@vueuse/core'

import { ColumnProps } from '../types/Column'
import { Pagination } from '../types/Pagination'
import { Props } from '../types/Props'
import { TableConfig } from '../types/TableConfig'
import { ElMessageBox } from 'element-plus'
import { useSelect } from './useSelect'

export type ModifyType = 'edit' | 'add'
export type DeleletType = 'single' | 'multiple'
interface TableActionType {
  load: Function
  refresh: Function
  dialogVisible: Ref<boolean>
  modifyType: Ref<ModifyType>
}

const { selectList } = useSelect()

const data = ref([])
const loading = ref<boolean>(false)
const refreshState = ref<boolean>(false)
const title = ref<string>('默认名字')
const titleEn = ref<string>('en_table')
const columns = ref<ColumnProps[]>([])
const customOperate = ref<boolean>(false)
const haveSlot = ref<boolean>(false)
const pagination = reactive<Pagination>({
  total: 0,
  currentPage: 1,
  pageSize: 10
})
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
const edit = ref<(arg0: any) => void>(() => {})
const add = ref<() => void>(() => {})
const refresh = ref(() => (refreshState.value = !refreshState.value))
const resetColumns = ref<(arg0: any) => void>(() => {})
const handleDelete = ref<(type: DeleletType, arg1: any) => void>(() => {})
const dialogVisible = ref<boolean>(false)
const modifyType = ref<ModifyType>('add')

export function useTableRef() {
  return {
    data,
    loading,
    columns,
    title,
    customOperate,
    pagination,
    tableConfig,
    refresh,
    edit,
    add,
    resetColumns,
    handleDelete,
    haveSlot
  }
}

export function useTable(
  tableProps: Props
): [(instance: TableActionType, _init: Function) => void, TableActionType] {
  const columnsStorage = useStorage(
    'vueuse-local-' + tableProps.title_en,
    null,
    undefined,
    {
      serializer: StorageSerializers.object
    }
  )

  let tempColumns: ColumnProps[] = []
  tableProps.columns.forEach(item => {
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
  titleEn.value = tableProps.title_en || 'en_table'
  title.value = tableProps.title || '默认名字'
  pagination.currentPage = tableProps.page || 1
  pagination.pageSize = tableProps.size || 10
  customOperate.value = tableProps.customOperate || false
  tableConfig.value = { ...tableConfig.value, ...tableProps.tableConfig }

  edit.value = row => {
    tableProps.handleEdit ? tableProps.handleEdit(row) : null
    dialogVisible.value = true
    modifyType.value = 'edit'
    console.log('编辑点击')
  }

  add.value = () => {
    tableProps.handleAdd ? tableProps.handleAdd() : null
    dialogVisible.value = true
    modifyType.value = 'add'
    console.log('新增点击')
  }

  // 删除
  handleDelete.value = (type: DeleletType, row: []) => {
    let title = <any>[]
    let ids = <any>[]
    if (tableProps.apiDelele) {
      if (type == 'single') {
        title = row[tableProps.apiDelele.name || 'name']
        ids = [row[tableProps.apiDelele.id || 'id']]
      } else if (type == 'multiple') {
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
          methods.refresh()
        })
      })
    } else {
      console.log('--暂未实现--')
    }
  }

  function register(instance: TableActionType, _init: Function) {}

  // 监听 page,size 的变化 请求接口
  watchEffect(() => {
    loading.value = true
    refreshState.value
    tableProps
      ?.apiList({ page: pagination.currentPage, size: pagination.pageSize })
      .then(res => {
        data.value = res.list
        pagination.currentPage = res.page
        pagination.pageSize = res.size
        pagination.total = res.total
        loading.value = false
      })
  })

  const methods: TableActionType = {
    load: () => {},
    refresh: () => (refreshState.value = !refreshState.value),
    dialogVisible,
    modifyType
  }

  return [register, methods]
}
