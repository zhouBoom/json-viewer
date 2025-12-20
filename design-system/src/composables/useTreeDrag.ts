import { ref, onMounted, onUnmounted } from 'vue'

// Type Definitions
export interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  expanded?: boolean
  icon?: string
  [key: string]: any
}

export interface UseTreeDragOptions {
  itemHeight: number
  onDragEnd: (updatedData: TreeNode[]) => void
}

export const useTreeDrag = (data: TreeNode[], options: UseTreeDragOptions) => {
  const draggedNode = ref<TreeNode | null>(null)
  const draggedNodeId = ref<string | number | null>(null)
  const indicatorPosition = ref<{ top: number; type: 'before' | 'after' | 'inside' } | null>(null)
  const containerRef = ref<HTMLElement | null>(null)

  // Check if a node is an ancestor of another node
  const isAncestor = (ancestorId: string | number, descendant: TreeNode): boolean => {
    const checkChildren = (node: TreeNode): boolean => {
      if (node.id === ancestorId) return true
      if (node.children) {
        for (const child of node.children) {
          if (checkChildren(child)) return true
        }
      }
      return false
    }
    return checkChildren(descendant)
  }

  // Find node by ID and its parent
  const findNode = (nodes: TreeNode[], id: string | number): { node: TreeNode; parent: TreeNode | null; index: number } | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.id === id) {
        return { node, parent: null, index: i }
      }
      if (node.children) {
        const result = findNode(node.children, id)
        if (result) {
          return { ...result, parent: node }
        }
      }
    }
    return null
  }

  // Remove node from its current position
  const removeNode = (nodes: TreeNode[], id: string | number): TreeNode | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.id === id) {
        return nodes.splice(i, 1)[0]
      }
      if (node.children) {
        const removed = removeNode(node.children, id)
        if (removed) return removed
      }
    }
    return null
  }

  // Update tree data after drop
  const updateTreeData = (targetId: string | number, position: 'before' | 'after' | 'inside') => {
    if (!draggedNodeId.value) return

    const tempData = JSON.parse(JSON.stringify(data)) as TreeNode[]
    const dragged = removeNode(tempData, draggedNodeId.value)
    if (!dragged) return

    const targetInfo = findNode(tempData, targetId)
    if (!targetInfo) return

    // Prevent dragging a node into its own descendant
    if (isAncestor(draggedNodeId.value, targetInfo.node)) {
      indicatorPosition.value = null
      draggedNode.value = null
      draggedNodeId.value = null
      return
    }

    if (position === 'inside') {
      // Add as child
      if (!targetInfo.node.children) {
        targetInfo.node.children = []
      }
      targetInfo.node.children.push(dragged)
      targetInfo.node.expanded = true // Auto-expand parent
    } else if (targetInfo.parent) {
      // Add to parent's children array before/after target
      const parentChildren = targetInfo.parent.children || []
      const targetIndex = parentChildren.findIndex(child => child.id === targetId)
      if (targetIndex !== -1) {
        const insertIndex = position === 'before' ? targetIndex : targetIndex + 1
        parentChildren.splice(insertIndex, 0, dragged)
      }
    } else {
      // Add to root array before/after target
      const insertIndex = position === 'before' ? targetInfo.index : targetInfo.index + 1
      tempData.splice(insertIndex, 0, dragged)
    }

    // Notify parent component
    options.onDragEnd(tempData)

    // Reset state
    indicatorPosition.value = null
    draggedNode.value = null
    draggedNodeId.value = null
  }

  // Handle drag start
  const handleDragStart = (node: TreeNode, event: DragEvent) => {
    draggedNode.value = node
    draggedNodeId.value = node.id
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', JSON.stringify(node))
    }
  }

  // Handle drag over
  const handleDragOver = (targetNode: TreeNode, event: DragEvent, element: HTMLElement) => {
    event.preventDefault()
    if (!draggedNodeId.value || draggedNodeId.value === targetNode.id) return

    const rect = element.getBoundingClientRect()
    const y = event.clientY - rect.top
    const height = rect.height

    let position: 'before' | 'after' | 'inside'
    if (y < height * 0.33) {
      position = 'before'
    } else if (y > height * 0.66) {
      position = 'after'
    } else {
      position = 'inside'
    }

    // Update indicator
    let top: number
    if (position === 'before') {
      top = element.offsetTop
    } else if (position === 'after') {
      top = element.offsetTop + height
    } else {
      top = element.offsetTop + height / 2
    }

    indicatorPosition.value = { top, type: position }
  }

  // Handle drop
  const handleDrop = (targetNode: TreeNode, event: DragEvent) => {
    event.preventDefault()
    if (!indicatorPosition.value) return

    updateTreeData(targetNode.id, indicatorPosition.value.type)
  }

  // Handle drag end (cleanup)
  const handleDragEnd = () => {
    indicatorPosition.value = null
    draggedNode.value = null
    draggedNodeId.value = null
  }

  return {
    containerRef,
    indicatorPosition,
    draggedNode,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  }
}
