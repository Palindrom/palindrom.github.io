
<template>
  <input type="text" v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">
</template>

<script>
export default {
    props: ['value']
};
</script>

<style scoped>
input {
    border: 1px solid lightblue;
    border-radius: 15px;
    padding: 10px;
}
</style>