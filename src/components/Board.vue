<template>
    <div class="board">
        <BoardTiles style="position: absolute; top: 0; left: 0;" :tileSize="tileSize" :pov="pov" />
        <Pieces style="position: absolute; top: 0; left: 0;" :pov="pov" :pieces="pieces" :whiteToMove="whiteToMove" />
    </div>
</template>

<script>
    import BoardTiles from './BoardTiles.vue';
    import Pieces from './Pieces.vue';
    import FENReader from '../FENReader.js';

    export default {
        name: 'Board',
        props: {
            pov: Number,
            FEN: String,
        },
        components: {
            BoardTiles,
            Pieces,
        },
        data() {
            return {
                whiteToMove: true,
                pieces: [],
                tileSize: 70,
            }
        },
        methods: {
            loadFEN() {
                if (this.FEN.length > 0) {
                    let reader = new FENReader();
                    this.pieces = reader.convert(this.FEN);
                }

                //todo: player to move from FEN
                this.whiteToMove = true;
            },
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

<style lang="scss">
    $tileSize: 70px;

    .board {
        position: relative;
        width: $tileSize * 8;
        height: $tileSize * 8;
    }
</style>

