<template>
  <div class="ep-options-container">
    <label>{{ label }}</label>
    <div class="options">
      <EpCheckbox
        v-for="opt in options"
        :key="opt.id"
        class="option"
        :label="opt.title"
        :checked="checked ? opt.id === checked.id : false"
        @change="onChange(opt)"
      />
    </div>
  </div>
</template>

<script>
import EpCheckbox from "@/components/inputs/EpCheckbox";

export default {
  components: {
    EpCheckbox,
  },
  model: {
    event: "change",
    prop: "checked",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    checked: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onChange(option) {
      this.$emit("change", option);
    },
  },
};
</script>

<style scoped>
.ep-options-container {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  margin-bottom: 8px;
}

.options {
  display: flex;
}

.options > *:not(:last-child) {
  margin-right: 20px;
}
</style>