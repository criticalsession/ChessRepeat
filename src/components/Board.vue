<template>
    <div class="board">
        <BoardTiles style="position: absolute; top: 0; left: 0;" :tileSize="tileSize" :pov="pov" />
        <Pieces ref="piecesHandler" style="position: absolute; top: 0; left: 0;" :pov="pov" :pieceList="pieces" :startWhiteToMove="whiteToMove" v-on:updatedPieceList="updatePieces" />
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
            loadFEN(f) {
                if (f.length > 0) {
                    let reader = new FENReader();
                    this.pieces = reader.convert(f);
                }

                //todo: player to move from FEN
                this.whiteToMove = true;

                this.$refs['piecesHandler'].reset(this.pieces, this.whiteToMove);
            },
            updatePieces(pieces, whiteToMove) {
                this.pieces = pieces;
                this.whiteToMove = whiteToMove;
            }
        },
        watch: {

        },
        mounted() {

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

