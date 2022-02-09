import { ref } from 'vue'
import { getPermissionTree } from '@/api/auth'
import { ElETree } from 'types/elemntPlus'

const treeRef = ref<ElETree>()

export function useTree() {
  const optionsTree = ref([])
  const cellId = ref(null)
  const defaultProps = {
    children: 'children',
    label: 'name',
    disabled: 'disabled'
  }

  function handleSave() {
    console.log(treeRef.value)
  }

  function getList() {
    getPermissionTree().then(res => {
      optionsTree.value = res
    })
  }

  const handleCellClick = row => {
    cellId.value = row.id
    let temp: string[] = []
    row.permissions.forEach(item => {
      temp.push(item.id)
    })

    treeRef.value?.setCheckedKeys(temp, false)
  }
  return {
    cellId,
    treeRef,
    optionsTree,
    defaultProps,
    getList,
    handleSave,
    handleCellClick
  }
}
