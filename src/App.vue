<template>
  <div id="app">
    <div class="container">
      <Form />
    </div>
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  border: none;
  background: transparent;

  font-size: 16px;
  cursor: pointer;
}

.btn:active {
  opacity: 0.9;
}

.btn.btn--primary {
  padding: 10px 30px;
  background: #265af7;
  border-radius: 5px;

  color: #fff;
}

.btn.btn--primary:hover {
  background: #0742f3;
}
.btn.btn--ternary {
  color: #0742f3;
}

.btn.btn--ternary:hover {
  color: #265af7;
}
</style>
