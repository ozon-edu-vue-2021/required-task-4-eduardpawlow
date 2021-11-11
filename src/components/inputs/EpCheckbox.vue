<template>
  <div class="ep-checkbox-container" @click="$emit('change', !checked)">
    <input
      style="display: none"
      type="checkbox"
      name="name"
      :checked="checked"
      :id="name"
    />
    <div class="mark"></div>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.ep-checkbox-container {
  display: flex;

  font-size: 16px;

  cursor: pointer;
  user-select: none;
}

.mark {
  position: relative;
  display: inline;
  min-width: 16px;
  min-height: 16px;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  border: 1px solid #d6dfe7;
  border-radius: 50%;
}

.mark::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  display: block;
  min-width: 8px;
  min-height: 8px;
  background: #fff;
  border-radius: 50%;
}

input:checked + .mark {
  background: #265af7;
}

label {
  cursor: pointer;
}
</style>