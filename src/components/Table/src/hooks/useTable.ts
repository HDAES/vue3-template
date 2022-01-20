/*
 * @Descripttion:
 * @Author: Hades
 * @Date: 2022-01-19 22:57:00
 */
import { ref, computed } from 'vue'
import { ColumnProps } from '../types/column'

interface TableActionType {
  load: Function
}

interface Props {
  api: Function
  columns: ColumnProps[]
  page?: Number
  size?: Number
}

const data = ref([])
const loading = ref(false)
const columns = ref<ColumnProps[]>([])

export function useTableRef() {
  return {
    data: computed(() => data.value),
    loading: computed(() => loading.value),
    columns: computed(() => columns.value)
  }
}

export function useTable(
  tableProps: Props
): [(instance: TableActionType, _init: Function) => void, TableActionType] {
  columns.value = tableProps.columns

  function register(instance: TableActionType, _init: Function) {}

  const methods: TableActionType = {
    load: () => {
      loading.value = true
      tableProps?.api({ page: 1, size: 10 }).then(res => {
        data.value = res.list
        loading.value = false
      })
    }
  }

  return [register, methods]
}
