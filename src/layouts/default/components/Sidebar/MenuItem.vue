<template>
  <el-sub-menu
    :index="route.path"
    v-if="route?.children && route.children.length > 0"
  >
    <template #title>
      <i class="pr-4">
        <Icon name="Dessert" style="color: #f9f9f9" />
      </i>
      <span>{{ route.meta.title }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in route.children"
      :key="index"
      :route="item"
      :path="route.path"
      :havecChildren="havecChildren"
    />
  </el-sub-menu>
  <el-menu-item
    :index="(havecChildren ? path : '') + '/' + route?.path"
    :key-data="(havecChildren ? path : '') + '/' + route?.path"
    v-else
  >
    <i :class="route?.meta.icon"></i>
    <template #title>
      {{ route?.meta.title }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SidebarItem } from 'types/store'
interface MenuItemState {
  route: Object
  path: string
  havecChildren: Boolean
  collapse: Boolean
}
export default defineComponent({
  name: 'MenuItem',
  props: {
    route: {
      type: Object as PropType<SidebarItem>
    },
    path: {
      type: String
    },
    havecChildren: {
      type: Boolean
    }
  },
  setup(props) {
    return {
      route: props.route,
      path: props.path,
      havecChildren: props.havecChildren
    }
  }
})
</script>
