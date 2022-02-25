<template>
    <section>
        <div v-for="y in 8" :key="y" class="row">
            <PieceImage v-for="x in 8" :key="x + y" :piece="getPiece(x, y)"></PieceImage>
        </div>
    </section>
</template>

<script>
    import PieceImage from './PieceImage.vue';

    export default {
        name: 'Pieces',
        props: {
            pov: Number,
            pieces: Array,
        },
        components: {
            PieceImage,
        },
        data() {
            return {
            }
        },
        methods: {
            getPiece(x, y) {
                let foundPieces = this.pieces.filter(item => {
                    return item.positionX === (this.pov === 1 ? x : 9 - x) && item.positionY === (this.pov === 1 ? y : 9 - y);
                });

                if (foundPieces.length > 0) return foundPieces[0];
                else return null;
            }
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

