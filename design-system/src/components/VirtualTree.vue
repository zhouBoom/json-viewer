<template>
  <div
    ref="containerRef"
    class="virtual-tree"
    :style="{ height: `${height}px` }"
    @scroll="handleScroll"
  >
    <div
      class="virtual-tree-viewport"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="virtual-tree-items"
        :style="{ transform: `translateY(${startIndex * itemHeight}px)` }"
      >
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="virtual-tree-item"
          :style="{ height: `${itemHeight}px` }"
          @click.stop="handleItemClick(item)"
        >
          <div class="virtual-tree-item-content">
            <span class="virtual-tree-indent" :style="{ width: `${item.level * indentSize}px` }"></span>
            <span
              class="virtual-tree-toggle"
              :class="{ 'has-children': item.children && item.children.length > 0 }"
              @click.stop="handleToggle(item)"
            >
              <svg v-if="item.children && item.children.length > 0" class="toggle-icon" :class="{ expanded: item.expanded }" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="virtual-tree-label">{{ item.label }} (层级: {{ item.level }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// 定义节点数据类型
interface TreeItem {
  id: string | number
  label: string
  children?: TreeItem[]
  [key: string]: any
}

interface FlattenedItem extends TreeItem {
  level: number
  expanded: boolean
  parentId: string | number | null
}

// Props 定义
interface Props {
  data: TreeItem[]
  height?: number
  itemHeight?: number
  indentSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  itemHeight: 32,
  indentSize: 24
})

// Emits 定义
interface Emits {
  (e: 'toggle', item: TreeItem): void
  (e: 'click', item: TreeItem): void
}

const emit = defineEmits<Emits>()

// Refs
const containerRef = ref<HTMLDivElement | null>(null)
const flattenedData = ref<FlattenedItem[]>([])
const expandedIds = ref<Set<string | number>>(new Set()) // 用独立的集合管理展开状态
const scrollTop = ref(0)

// Computed
const itemHeight = computed(() => props.itemHeight)
const totalHeight = computed(() => flattenedData.value.length * itemHeight.value)
const visibleCount = computed(() => Math.ceil(props.height / itemHeight.value) + 10) // 额外加载 10 个项用于缓冲
const startIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / itemHeight.value) - 5)) // 向上多加载 5 个
const endIndex = computed(() => Math.min(flattenedData.value.length, startIndex.value + visibleCount.value))
const visibleItems = computed(() => flattenedData.value.slice(startIndex.value, endIndex.value))

// 扁平化树形数据
const flattenTree = (tree: TreeItem[], level: number = 0, parentId: string | number | null = null): FlattenedItem[] => {
  let result: FlattenedItem[] = []
  for (const item of tree) {
    const flattenedItem: FlattenedItem = {
      ...item,
      level,
      expanded: expandedIds.value.has(item.id),
      parentId
    }
    result.push(flattenedItem)
    // 如果节点已展开，递归处理子节点
    if (expandedIds.value.has(item.id) && flattenedItem.children && flattenedItem.children.length > 0) {
      result = result.concat(flattenTree(flattenedItem.children, level + 1, flattenedItem.id))
    }
  }
  return result
}

// 重新生成扁平化数据
const regenerateFlattenedData = () => {
  flattenedData.value = flattenTree(props.data)
}

// 处理展开/收起
const handleToggle = (item: FlattenedItem) => {
  if (!item.children || item.children.length === 0) return

  // 更新展开状态
  if (expandedIds.value.has(item.id)) {
    expandedIds.value.delete(item.id)
  } else {
    expandedIds.value.add(item.id)
  }

  // 重新生成扁平化数据
  regenerateFlattenedData()
  emit('toggle', item)
}

// 处理项点击
const handleItemClick = (item: FlattenedItem) => {
  emit('click', item)
}

// 处理滚动
const handleScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

// 初始化和数据变化监听
watch(() => props.data, (newData) => {
  flattenedData.value = flattenTree(newData)
}, { deep: true, immediate: true })

onMounted(() => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
})
</script>

<style scoped>
.virtual-tree {
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #ffffff;
}

.virtual-tree-viewport {
  position: relative;
}

.virtual-tree-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.virtual-tree-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.virtual-tree-item:hover {
  background-color: #f3f4f6;
}

.virtual-tree-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
}

.virtual-tree-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  cursor: pointer;
  color: #6b7280;
}

.virtual-tree-toggle:hover {
  color: #374151;
}

.toggle-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.virtual-tree-indent {
  flex-shrink: 0;
}

.virtual-tree-label {
  flex: 1;
  color: #1f2937;
  font-size: 14px;
}
</style>