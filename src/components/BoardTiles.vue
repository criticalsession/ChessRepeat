<template>
    <section>
        <div v-for="i in 8" :key="i" class="row">
            <BoardTile v-for="j in 8" :key="i + j" :row="i" :column="j" :pov="pov"></BoardTile>
        </div>
    </section>
</template>

<script>
    import BoardTile from './BoardTile.vue';

    export default {
        name: 'BoardTiles',
        props: {
            pov: Number,
        },
        components: {
            BoardTile,
        },
        data() {
            return {

            }
        },
        methods: {

        },
        watch: {

        },
        mounted() {

        },
    };
</script>

<style scoped lang="scss">
    .row {
        clear: both;
    }
</style>

