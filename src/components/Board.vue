<template>
    <div class="board">
        <div v-for="i in 8" :key="i" class="row">
            <BoardTile v-for="j in 8" :key="i + j" :row="i" :column="j" :piece="checkPiece(j, i)" :povRow="pov === 0 ? i : 9 - i" :povColumn="pov === 1 ? j : 9 - j"></BoardTile>
        </div>
    </div>
</template>

<script>
    import BoardTile from './BoardTile.vue';
    import FENReader from '../FENReader.js';

    export default {
        name: 'Board',
        props: {
            pov: Number,
            FEN: String,
        },
        components: {
            BoardTile,
        },
        data() {
            return {
                whiteToPlay: true,
                pieces: [ ],
            }
        },
        methods: {
            checkPiece(x, y) {
                let foundPieces = this.pieces.filter(item => {
                    return item.positionX === (this.pov === 1 ? x : 9 - x) && item.positionY === (this.pov === 1 ? y : 9 - y);
                });

                if (foundPieces.length > 0) return foundPieces[0];
                else return null;
            },
            loadFEN() {
                if (this.FEN.length > 0) {
                    let reader = new FENReader();
                    this.pieces = reader.convert(this.FEN);
                }
            }
        },
        watch: {
            FEN() {
                this.loadFEN();
            }
        },
        mounted() {
            this.loadFEN();
        },
    };
</script>

<style scoped lang="scss">
    .row {
        clear: both;
    }
</style>

