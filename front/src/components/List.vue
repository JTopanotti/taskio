<template>
  <div class="board-list"
  :class="{'is-dragging-list': isDraggingList, 'drag-entered': dragEntered}"
  draggable="true"
  @dragstart="onListDragStart(index, $event)"
  @dragend="onListDragEnd"
  @drop="onListDrop(index)"
  @dragover.prevent
  @dragover="onListDragOver"
  @dragleave="onListDragLeave"
  >
    <div class="list-inner">
      <div
        v-if="list"
        class="list-title">
        <h3>
          {{ list.title }}
        </h3>
      </div>
      <div class="list-cards">
        <card
          v-for="(card, i) in cards"
          :card-prop="card"
          :list-prop="list"
          :key="card._id"
          :index="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card'
export default {
  components: {
    Card
  },
  props: [
    'listProp',
    'index'
  ],
  data () {
    return {
      list: null,
      cards: [],
      isDraggingList: false,
      dragEntered: false
    }
  },
  mounted () {
    this.$set(this, 'list', this.listProp)
    this.$set(this, 'cards', this.listProp.cards)
  },
  methods: {
    onListDragStart (fromIndex, event) {
      if (!fromIndex) {
        fromIndex = 0
      }

      this.$set(this, "isDraggingList", true)
      this.$eventBus.$emit("list-drag-started", fromIndex)
    },
    onListDragEnd () {
      this.$set(this, "isDraggingList", false)
      this.$eventBus.$emit("list-dragend")
    },
    onListDragOver (event) {
      this.$set(this, "dragEntered", true)
    },
    onListDragLeave (index, list) {
      this.$set(this, "dragEntered", false)
    },
    onListDrop (toIndex) {
      this.$set(this, "dragEntered", false)
      this.$eventBus.$emit("list-dropped", toIndex)
    }
  },
}
</script>

<style scoped lang="scss">
.list-inner {
  background-color: #dfe3e6;
  padding: 10px;
  white-space: normal;
  border-radius: 3px;
}
.board-list {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 10px;
  vertical-align: top;
  width: 270px;
  max-height: 100%;
  overflow-y: scroll;
  &.is-dragging-list {
    transform: rotate(1deg)
  }
  &.drag-entered {
    border: 3px solid #237bda;
  }
}
</style>
