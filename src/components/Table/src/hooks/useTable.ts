/*
 * @Descripttion:
 * @Author: Hades
 * @Date: 2022-01-19 22:57:00
 */
import { ref, reactive, watchEffect } from 'vue'
import { ColumnProps } from '../types/Column'
import { Pagination } from '../types/Pagination'
import { Props } from '../types/Props'
import { TableConfig } from '../types/TableConfig'

interface TableActionType {
  load: Function
  refresh: Function
}

const data = ref([])
const loading = ref<boolean>(false)
const refresh = ref<boolean>(false)
const title = ref<string>('默认名字')
const columns = ref<ColumnProps[]>([])
const customOperate = ref<boolean>(false)
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
  selection: true
})
const edit = ref<(arg0: any) => void>(() => {})
const add = ref<() => void>(() => {})
export function useTableRef() {
  return {
    data,
    loading,
    columns,
    title,
    customOperate,
    pagination,
    tableConfig,
    refresh: () => (refresh.value = !refresh.value),
    edit,
    add
  }
}

export function useTable(
  tableProps: Props
): [(instance: TableActionType, _init: Function) => void, TableActionType] {
  let tempColumns: ColumnProps[] = []
  tableProps.columns.forEach(item => {
    item.show = true
    tempColumns.push(item)
  })
  columns.value = tempColumns

  title.value = tableProps.title || '默认名字'
  pagination.currentPage = tableProps.page || 1
  pagination.pageSize = tableProps.size || 10
  customOperate.value = tableProps.customOperate || false
  tableConfig.value = { ...tableConfig.value, ...tableProps.tableConfig }
  edit.value =
    tableProps.handleEdit ||
    (() => {
      console.log('编辑点击')
    })
  add.value =
    tableProps.handleAdd ||
    (() => {
      console.log('新增点击')
    })
  function register(instance: TableActionType, _init: Function) {}

  // 监听 page,size 的变化 请求接口
  watchEffect(() => {
    loading.value = true
    refresh.value
    tableProps
      ?.api({ page: pagination.currentPage, size: pagination.pageSize })
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
    refresh: () => (refresh.value = !refresh.value)
  }

  return [register, methods]
}
