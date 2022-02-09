import { ref } from 'vue'
const selectList = ref([])

export function useSelect() {
  const handleSelectionChange = (e: never[]) => {
    selectList.value = e
  }

  const handleSelect = (selection, row) => {}
  return {
    handleSelect,
    handleSelectionChange,
    selectList
  }
}
