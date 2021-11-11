<template>
  <div
    class="ep-select-container"
    :class="{ active: isActive, error }"
    v-click-outside="closeDrawer"
  >
    <label>{{ label }}</label>
    <div class="select-input" @click="toggleDrawer">
      <div class="selected">
        {{ selected ? selected[titleKey] : "" }}
      </div>
      <div class="arrow"></div>
    </div>
    <div v-if="error" class="error-msg">{{ error }}</div>

    <div v-if="isActive" class="drawer">
      <div v-if="withFilter" class="filter">
        <input
          type="text"
          placeholder="Поиск..."
          :value="filterValue"
          @input="onInputFilter"
        />
      </div>

      <div class="options">
        <template v-if="options.length">
          <div
            v-for="opt in options"
            :key="opt.id"
            class="option"
            @click="onClickOption(opt)"
          >
            {{ opt[titleKey] }}
          </div>
        </template>

        <div v-else class="options__empty">Нет вариантов</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    event: "change",
    prop: "selected",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: null,
    },
    titleKey: {
      type: String,
      default: "title",
    },
    withFilter: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      filterValue: "",
      isActive: false,
    };
  },

  methods: {
    toggleDrawer() {
      this.isActive = !this.isActive;
    },
    closeDrawer() {
      this.isActive = false;
    },

    // events
    onInputFilter(event) {
      this.filterValue = event.target.value;
      this.$emit("filter:input", this.filterValue);
    },
    onClickOption(option) {
      this.$emit("change", { ...option });
      this.closeDrawer();
    },
  },
};
</script>

<style scoped>
.ep-select-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 8px;

  font-size: 16px;
  color: #8c9aad;
}

.select-input {
  position: relative;
  padding: 8px;
  background: #fff;
  border: 2px solid #d6dfe7;
  border-radius: 5px;

  color: #2c3e50;

  cursor: pointer;
}

.selected {
  height: 18px;
  padding-right: 20px;
}

.arrow {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: rotate(45deg);
}

.arrow::before {
  content: "";
  display: block;
  border-width: 5px;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #2c3e50;
  border-right-color: #2c3e50;
}

.drawer {
  position: absolute;
  z-index: 2;
  top: 105%;
  left: 0;
  display: flex;
  flex-direction: column;
  max-height: 230px;
  width: 100%;
  padding: 8px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.05);

  overflow: hidden;
}

.drawer .filter {
  width: 100%;
  margin-bottom: 8px;
  padding: 0 20px;
}

.drawer .filter input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d6dfe7;

  font-size: 16px;

  outline: none;
}

.drawer .options {
  overflow: auto;
  user-select: none;
}

.drawer .options__empty {
  padding: 8px 20px;
}

.drawer .option {
  padding: 8px 20px;
  cursor: pointer;
}

.drawer .option:hover {
  background: #d6dfe7;
}

.ep-select-container.active .select-input {
  border-color: #265af7;
}

.ep-select-container.active .select-input .arrow {
  top: 15px;
  transform: rotate(225deg);
}

.error-msg {
  margin-top: 4px;
  padding: 0 4px;
  font-size: 12px;

  color: rgb(196, 1, 1);
}

.ep-select-container.error .select-input {
  border: 2px solid rgb(196, 1, 1);
}
</style>
