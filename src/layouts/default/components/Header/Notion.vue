<template>
  <el-popover placement="bottom-start" :width="200" trigger="click">
    <template #reference>
      <div class="message relative w-6 h-6">
        <Icon name="ChatLineRound" />
      </div>
    </template>
    <div>未处理事项</div>
  </el-popover>
</template>

<style lang="scss" scoped>
.message {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #f00;
  }
}
</style>
