<template>
  <div class="ep-input-container" :class="{ error }">
    <label class="ep-input__label" :for="name">{{ label }}</label>
    <input :id="name" :value="value" v-on="innerListeners" v-bind="$attrs" />
    <div v-if="error" class="error-msg">{{ error }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  computed: {
    innerListeners() {
      return Object.assign(this.$listeners, {
        input: (e) => {
          this.$emit("input", e.target.value);
        },
      });
    },
  },
};
</script>

<style scoped>
.ep-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ep-input__label {
  margin-bottom: 8px;

  font-size: 16px;
  color: #8c9aad;
}

input {
  min-width: 0;
  padding: 8px;
  border: 2px solid #d6dfe7;
  border-radius: 5px;

  font-size: 16px;
  color: #2c3e50;

  outline: none;
}

input:focus {
  border-color: #265af7;
}

.error-msg {
  margin-top: 4px;
  padding: 0 4px;
  font-size: 12px;

  color: rgb(196, 1, 1);
}

.ep-input-container.error input {
  border: 2px solid rgb(196, 1, 1);
}
</style>
