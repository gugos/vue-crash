<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.container {
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 1rem;
    margin: 4rem auto 1rem auto;
    width: 80%;
}
</style>