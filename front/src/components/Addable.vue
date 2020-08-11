<template>
  <div>
    <h2
      v-show="isAdding"
      ref="addableField"
      :class="{'is-editing': isAdding}"
      contenteditable="true"
      @keydown.enter="submit"
      @blur="onBlur"
      @keydown.esc="escape"
    >{{ inputText }}</h2>
    <h2>{{ inputText }}</h2>
    <template v-if="isAdding === false">
      <div @click="onTitleClick()">
        <slot/>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isAdding: false,
      inputText: ""
    }
  },
  methods: {
    onTitleClick () {
      this.$set(this, "isAdding", true)
      setTimeout((() => {
        this.$refs.addableField.focus()
      }).bind(this), 200)
    },
    onBlur () {
      this.$set(this, "isAdding", false)
    },
    escape () {
      this.emptyInput()
    },
    submit (event) {
      this.$emit("addable-submit", event.currentTarget.innerText)
      this.emptyInput()
    },
    emptyInput () {
      this.$set(this, "inputText", "")
      this.$refs.addableField.innerText = ""
      this.$set(this, "isAdding", false);
    }
  }
}
</script>      
