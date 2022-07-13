<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.card {
    border-radius: 5px;
    @include box-shadow;
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
}
</style>