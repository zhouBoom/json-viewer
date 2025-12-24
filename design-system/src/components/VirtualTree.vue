<template>
  <div 
    ref="treeContainerRef" 
    class="virtual-tree-container"
    :style="{ height: containerHeight }"
    @scroll="handleScroll"
  >
    <!-- Drag Indicator -->
    <div 
      v-if="indicatorPosition" 
      class="drag-indicator"
      :class="`drag-indicator-${indicatorPosition.type}`"
      :style="{ top: indicatorPosition.top + 'px' }"
    ></div>
    
    <div 
      class="virtual-tree-content"
      :style="{ 
        height: totalHeight + 'px',
        paddingTop: startIndex * itemHeight + 'px'
      }"
    >
      <div 
        v-for="(item, index) in visibleItems" 
        :key="item.id"
        :ref="el => { if (el) itemRefs[index + startIndex] = el }"
        class="tree-node"
        :class="{ 'dragging': draggedNode?.id === item.id }"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
        draggable="true"
        @dragstart.stop="handleDragStart(item, $event)"
        @dragover.stop="handleDragOver(item, $event, itemRefs[index + startIndex])"
        @drop.stop="handleDrop(item, $event)"
        @dragend.stop="handleDragEnd()"
        @click.stop="handleNodeClick(item)"
      >
        <span 
          class="node-indent"
          :style="{ width: item.level * indentSize + 'px' }"
        ></span>
        <span 
          class="node-toggle"
          :class="{ 'has-children': item.children && item.children.length > 0 }"
          @click.stop="handleToggle(item)"
        >
          <svg v-if="item.children && item.children.length > 0" :class="{ 'expanded': item.expanded }" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="node-icon" :class="item.icon"></span>
        <span class="node-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useTreeDrag } from '../composables/useTreeDrag'

// Type Definitions
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

// Props
const props = defineProps<{
  data: TreeNode[]
  height?: string | number
  itemHeight?: number
  indentSize?: number
}>()

// Default Props
const containerHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height || '500px'
})
const itemHeight = ref(props.itemHeight || 32)
const indentSize = ref(props.indentSize || 24)

// Emits
const emit = defineEmits<{
  'node-click': [item: FlattenedNode],
  'update:data': [data: any[]]
}>

// Tree Drag Composable
const {
  containerRef: treeContainerRef,
  indicatorPosition,
  draggedNode,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd
} = useTreeDrag(props.data, {
  itemHeight: itemHeight.value,
  onDragEnd: (updatedData) => {
    emit('update:data', updatedData)
  }
})

// Refs
const containerRef = ref<HTMLElement | null>(null)
const itemRefs = ref<(HTMLElement | null)[]>([])
const scrollTop = ref(0)

// State
const flattenedData = ref<FlattenedNode[]>([])
const startIndex = ref(0)
const endIndex = ref(0)

// Methods
const flattenTree = (nodes: TreeNode[], level: number = 0, parentId: string | number | null = null): FlattenedNode[] => {
  let result: FlattenedNode[] = []
  
  for (const node of nodes) {
    const flattenedNode: FlattenedNode = {
      ...node,
      level,
      parentId,
      isVisible: true,
      expanded: node.expanded || false
    }
    
    result.push(flattenedNode)
    
    if (flattenedNode.expanded && node.children) {
      result = result.concat(flattenTree(node.children, level + 1, node.id))
    }
  }
  
  return result
}

const updateVisibleItems = () => {
  if (!treeContainerRef.value) return
  
  const containerHeight = treeContainerRef.value.clientHeight
  const visibleCount = Math.ceil(containerHeight / itemHeight.value) + 10 // Add buffer
  
  startIndex.value = Math.floor(scrollTop.value / itemHeight.value)
  endIndex.value = Math.min(startIndex.value + visibleCount, flattenedData.value.length)
}

const handleToggle = (item: FlattenedNode) => {
  if (!item.children || item.children.length === 0) return
  
  item.expanded = !item.expanded
  
  const itemIndex = flattenedData.value.findIndex(node => node.id === item.id)
  if (itemIndex === -1) return
  
  // Remove existing children if collapsing
  if (!item.expanded) {
    let removeCount = 0
    for (let i = itemIndex + 1; i < flattenedData.value.length; i++) {
      if (flattenedData.value[i].level <= item.level) break
      removeCount++
    }
    if (removeCount > 0) {
      flattenedData.value.splice(itemIndex + 1, removeCount)
    }
  } 
  // Add children if expanding
  else {
    const children = flattenTree(item.children, item.level + 1, item.id)
    flattenedData.value.splice(itemIndex + 1, 0, ...children)
  }
  
  updateVisibleItems()
}

const handleNodeClick = (item: FlattenedNode) => {
  emit('node-click', item)
}

const handleScroll = () => {
  if (treeContainerRef.value) {
    scrollTop.value = treeContainerRef.value.scrollTop
    updateVisibleItems()
  }
}

// Computed
const visibleItems = computed(() => {
  return flattenedData.value.slice(startIndex.value, endIndex.value)
})

const totalHeight = computed(() => {
  return flattenedData.value.length * itemHeight.value
})

// Watch
watch(() => props.data, (newData) => {
  flattenedData.value = flattenTree(newData)
  updateVisibleItems()
}, { deep: true, immediate: true })

// Lifecycle
onMounted(() => {
  updateVisibleItems()
})
</script>

<style scoped>
.virtual-tree-container {
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #ffffff;
  position: relative;
}

.virtual-tree-content {
  position: relative;
}

.tree-node {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
  user-select: none;
}

.tree-node:hover {
  background-color: #f3f4f6;
}

.tree-node.dragging {
  opacity: 0.5;
  background-color: #e0e7ff;
}

.node-indent {
  display: inline-block;
}

.node-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  cursor: pointer;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.node-toggle:hover {
  color: #374151;
}

.node-toggle.expanded svg {
  transform: rotate(180deg);
}

.node-toggle:not(.has-children) {
  visibility: hidden;
}

.node-icon {
  margin-right: 6px;
  color: #6b7280;
}

.node-label {
  flex: 1;
  font-size: 14px;
  color: #111827;
}

.drag-indicator {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1000;
}

.drag-indicator-before,
.drag-indicator-after {
  height: 2px;
  background-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.drag-indicator-inside {
  height: 2px;
  background-color: #10b981;
  box-shadow: 0 0 0 1px #10b981;
  margin-left: 24px;
}
</style>