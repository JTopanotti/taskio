<template>
  <div>
    <h2
      v-show="isEditing"
      ref="editableField"
      :class="{'is-editing': isEditing}"
      contenteditable="true"
      @keydown.enter="submit"
      @blur="onBlur"
      @keydown.esc="escape"
    >{{ inputText }}</h2>
    <template v-if="isEditing === false">
      <div @click="onBoardTitleClick()">
        <slot
          :isEditing="isEditing"
          :inputText="inputText"/>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["fieldValue"],
  data() {
    return {
      inputText: "",
      isEditing: false
    };
  },
  mounted() {
    this.$set(this, "inputText", this.fieldValue);
  },
  methods: {
    onBoardTitleClick() {
      this.$set(this, "isEditing", true);
      setTimeout((() => {
        this.$refs.editableField.focus()
      }).bind(this), 200)
    },
    submit(event) {
      this.$set(this, "inputText", event.currentTarget.innerText)
      this.$emit("editable-submit", event.currentTarget.innerText)
      this.$set(this, "isEditing", false);
    },
    escape(event) {
      this.$set(this, "inputText", event.currentTarget.innerText)
      this.$emit("editable-submit", event.currentTarget.innerText);
      this.$set(this, "isEditing", false);
    },
    onBlur (event) {
      this.$set(this, "inputText", event.currentTarget.innerText)
      this.$emit("editable-submit", event.currentTarget.innerText);
      this.$set(this, "isEditing", false);
    }
  }
};
</script>
