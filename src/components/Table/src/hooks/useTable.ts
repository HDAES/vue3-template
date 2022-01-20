/*
 * @Descripttion:
 * @Author: Hades
 * @Date: 2022-01-19 22:57:00
 */
import { ref, computed, reactive, watchEffect } from 'vue'
import { ColumnProps } from '../types/column'

interface TableActionType {
  load: Function
}

interface Props {
  title?: string
  api: Function
  columns: ColumnProps[]
  page?: number
  size?: number
  selection?: boolean
  customOperate?: boolean
}

interface Pagination {
  total: number
  currentPage: number
  pageSize: number
}

const data = ref([])
const loading = ref<boolean>(false)
const refresh = ref<boolean>(false)
const title = ref<string>('')
const columns = ref<ColumnProps[]>([])
const selection = ref<boolean>(false)
const customOperate = ref<boolean>(false)
const pagination = reactive<Pagination>({
  total: 0,
  currentPage: 1,
  pageSize: 10
})
const tableConfig = reactive({
  stripe: true,
  border: false,
  size: 'small',
  showHeader: true,
  index: false,
  indexName: '序号',
  selection: true
})

export function useTableRef() {
  return {
    data,
    loading,
    columns,
    title,
    customOperate,
    pagination,
    tableConfig,
    refresh: () => (refresh.value = !refresh.value)
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
  tableConfig.selection = tableProps.selection || false

  pagination.currentPage = tableProps.page || 1
  pagination.pageSize = tableProps.size || 10
  customOperate.value = tableProps.customOperate || false
  function register(instance: TableActionType, _init: Function) {}

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
    load: () => {}
  }

  return [register, methods]
}
