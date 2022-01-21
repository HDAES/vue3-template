import { ref } from 'vue'
const selectList = ref([])

export function useSelect() {
  const handleSelectionChange = (e: never[]) => {
    selectList.value = e
  }
  return {
    handleSelectionChange,
    selectList
  }
}
