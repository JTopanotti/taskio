<template>
  <div class="board-page-main">
    <template v-if="board">
      <div class="board-title">
        <editable
          v-slot:default="slotProps"
          :field-value="board.title"
          @editable-submit="editableSubmitted"
          >
          <h2>{{ slotProps.inputText }}</h2>
        </editable>
      </div>
      <div class="board-lists">
        <div class="board-lists-inner">
          <addable
            class="add-new-list"
            @addable-submit="addableSubmit">
            <div>Add list</div>
          </addable>
          <list
            v-for="(list, i) in lists"
            :key="list._id"
            :index="i"
            :list-prop="list"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import boardService from '../services/board.service'
import listService from "../services/list.service";
import Addable from "./Addable";
import List from './List'
import Editable from "./Editable";

export default {
  components: {
    List,
    Editable,
    Addable
  },
  data () {
    return {
      board: null,
      lists: [],
      fromListIndex: null,
    }
  },
  created () {
    this.$eventBus.$on("list-drag-started", this.onListDragStarted);
    this.$eventBus.$on("list-dragend", this.onListDragEnd);
    this.$eventBus.$on("list-dropped", this.onListDropped);
  },
  mounted () {
    boardService.findById(this.$route.params.boardId).then(
      board => {
        this.$set(this, 'board', board)
        this.$set(this, 'lists', board.lists)
      }
    )
  },
  methods: {
    editableSubmitted(inputText) {
      if (inputText === this.board.title) {
        return;
      }
      boardService.update(this.board._id, inputText).then(() => {
        this.board.title = inputText;
      })
    },
    addableSubmit(listTitle) {
      if (!listTitle || listTitle.length === 0) {
        return;
      }
      listService.create(this.board._id, listTitle).then((newList) => {
        this.board.lists.push(newList)
      })
    },
    onListDragStarted(fromListIndex) {
      this.$set(this, "fromListIndex", fromListIndex)
    },
    onListDragEnd(event) {
      this.$set(this, "fromListIndex", null);
    },
    onListDropped(toListIndex) {
      if (this.fromListIndex === toListIndex) {
        return;
      }
      this.switchListPositions(this.fromListIndex, toListIndex);
      this.updateListsOrder();
    },
    updateListsOrder() {
      let listIds = this.lists.map(list => list._id);
      boardService.updateListsOrder(this.board._id, listIds);
    },
    switchListPositions(fromListIndex, toListIndex) {
      if (this.fromListIndex === null) {
        return;
      }

      this.lists.splice(toListIndex, 0, this.lists.splice(fromListIndex, 1)[0]);
    },
  }
}
</script>

<style>
.board-title .is-editing {
  background-color: #ffffff;
  color: #000000;
  padding: 8px;
  display: inline-block;
  min-width: 600px;
}
.add-new-list .is-editing {
  background-color: #ffffff;
  color: #000000;
  padding: 8px;
  margin: 0;
}
</style>

<style scoped lang="scss">
.add-new-list {
  display: inline-block;
  width: 270px;
}
.board-title {
  color: #ffffff;
  padding: 10px;
  height: 90px;
}
.board-page-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.board-lists {
  flex-grow: 1;
  margin-bottom: 20px;
  position: relative;
}
.board-lists-inner {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: scroll;
  position: absolute;
  white-space: nowrap;
}
</style>
