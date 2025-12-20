import { ref, onMounted, onUnmounted, Ref } from 'vue'

interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  expanded?: boolean
  icon?: string
  [key: string]: any
}

interface FlattenedNode extends TreeNode {
  level: number
  parentId: string | number | null
  isVisible: boolean
}

export const useTreeDrag = ({
  flattenedData,
  itemHeight,
  indentSize
}: {
  flattenedData: Ref<FlattenedNode[]>
  itemHeight: Ref<number>
  indentSize: Ref<number>
}) => {
  const draggedNode = ref<FlattenedNode | null>(null)
  const dragOverNode = ref<FlattenedNode | null>(null)
  const dropPosition = ref<'before' | 'after' | 'inside' | null>(null)
  const indicatorStyle = ref<{ top: string; left: string; width: string; height: string }>({ top: '0px', left: '0px', width: '0px', height: '0px' })

  // 检查是否可以将父节点拖入子节点（防止死循环）
  const canDrop = (dragged: FlattenedNode, target: FlattenedNode, position: 'before' | 'after' | 'inside'): boolean => {
    if (position !== 'inside') return true
    
    // 检查 target 是否是 dragged 的子节点
    const isDescendant = (node: FlattenedNode, ancestorId: string | number): boolean => {
      if (node.parentId === ancestorId) return true
      if (node.parentId === null) return false
      const parent = flattenedData.value.find(n => n.id === node.parentId)
      return parent ? isDescendant(parent, ancestorId) : false
    }
    
    return !isDescendant(target, dragged.id)
  }

  // 更新指示线位置
  const updateIndicator = (targetNode: FlattenedNode, position: 'before' | 'after' | 'inside', targetElement: HTMLElement) => {
    const targetRect = targetElement.getBoundingClientRect()
    const containerRect = targetElement.closest('.virtual-tree-container')?.getBoundingClientRect()
    
    if (!containerRect) return

    let top: number
    let left: number
    let width: number
    let height: number

    if (position === 'before' || position === 'after') {
      top = targetRect.top - containerRect.top + (position === 'after' ? itemHeight.value : 0)
      left = 0
      width = targetRect.width
      height = 2
      indicatorStyle.value = { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` }
    } else {
      top = targetRect.top - containerRect.top
      left = targetNode.level * indentSize.value + indentSize.value
      width = targetRect.width - left
      height = itemHeight.value
      indicatorStyle.value = { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` }
    }
  }

  // 处理拖拽开始
  const handleDragStart = (node: FlattenedNode) => {
    draggedNode.value = node
  }

  // 处理拖拽结束
  const handleDragEnd = () => {
    draggedNode.value = null
    dragOverNode.value = null
    dropPosition.value = null
    indicatorStyle.value = { top: '0px', left: '0px', width: '0px', height: '0px' }
  }

  // 处理拖拽经过
  const handleDragOver = (e: DragEvent, node: FlattenedNode, targetElement: HTMLElement) => {
    e.preventDefault()
    
    if (!draggedNode.value || draggedNode.value.id === node.id) return

    const rect = targetElement.getBoundingClientRect()
    const y = e.clientY - rect.top
    const third = itemHeight.value / 3
    
    let position: 'before' | 'after' | 'inside'
    if (y < third) {
      position = 'before'
    } else if (y > itemHeight.value - third) {
      position = 'after'
    } else {
      position = 'inside'
    }

    // 校验是否可以放置
    if (!canDrop(draggedNode.value, node, position)) {
      dropPosition.value = null
      indicatorStyle.value = { top: '0px', left: '0px', width: '0px', height: '0px' }
      return
    }

    dragOverNode.value = node
    dropPosition.value = position
    updateIndicator(node, position, targetElement)
  }

  // 重建树结构关系
  const rebuildTreeRelations = () => {
    // 创建节点映射
    const nodeMap = new Map()
    flattenedData.value.forEach(node => {
      nodeMap.set(node.id, node)
    })
    
    // 首先，清空所有节点的 children 数组，但保留其存在性以保持展开按钮显示
    flattenedData.value.forEach(node => {
      if (!node.children) {
        node.children = []
      } else {
        // 只清空数组内容，不删除数组本身
        node.children.length = 0
      }
    })
    
    // 然后，重新构建父子关系
    flattenedData.value.forEach(node => {
      if (node.parentId !== null) {
        const parent = nodeMap.get(node.parentId)
        if (parent && parent.children) {
          parent.children.push(node)
        }
      }
    })
  }

  // 处理放置
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    
    if (!draggedNode.value || !dragOverNode.value || !dropPosition.value) return

    // 校验是否可以放置
    if (!canDrop(draggedNode.value, dragOverNode.value, dropPosition.value)) return

    // 查找被拖拽节点和目标节点在 flattenedData 中的索引
    const draggedIndex = flattenedData.value.findIndex(n => n.id === draggedNode.value!.id)
    const targetIndex = flattenedData.value.findIndex(n => n.id === dragOverNode.value!.id)

    if (draggedIndex === -1 || targetIndex === -1) return

    // 移除被拖拽节点
    const [removed] = flattenedData.value.splice(draggedIndex, 1)

    // 根据放置位置重新插入
    if (dropPosition.value === 'before') {
      const insertIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex
      removed.level = dragOverNode.value!.level
      removed.parentId = dragOverNode.value!.parentId
      flattenedData.value.splice(insertIndex, 0, removed)
    } else if (dropPosition.value === 'after') {
      const insertIndex = draggedIndex < targetIndex ? targetIndex : targetIndex + 1
      removed.level = dragOverNode.value!.level
      removed.parentId = dragOverNode.value!.parentId
      flattenedData.value.splice(insertIndex, 0, removed)
    } else {
      // 成为子节点
      removed.level = dragOverNode.value!.level + 1
      removed.parentId = dragOverNode.value!.id
      
      // 确保目标节点有 children 数组
      if (!dragOverNode.value!.children) {
        dragOverNode.value!.children = []
      }
      
      // 如果目标节点没有展开，展开它
      if (!dragOverNode.value!.expanded) {
        dragOverNode.value!.expanded = true
      }

      // 找到目标节点的最后一个子节点
      let insertIndex = targetIndex + 1
      while (insertIndex < flattenedData.value.length && flattenedData.value[insertIndex].level > dragOverNode.value!.level) {
        insertIndex++
      }
      
      flattenedData.value.splice(insertIndex, 0, removed)
    }

    // 重建树关系，确保子节点不会被覆盖
    rebuildTreeRelations()
    
    // 重置状态
    handleDragEnd()
  }

  return {
    draggedNode,
    indicatorStyle,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  }
}
