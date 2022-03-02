<template>
    <div class="board" v-bind:style="boardWidthHeight">
        <BoardTiles 
            style="position: absolute; top: 0; left: 0;" 
            :tileSize="tileSize" 
            :pov="pov" />
        <Pieces 
            ref="piecesHandler" 
            style="position: absolute; top: 0; left: 0;" 
            :pov="pov" 
            :tileSize="tileSize" 
            :pieceList="pieces" 
            :startWhiteToMove="whiteToMove" 
            v-on:updatedPieceList="updatePieces" 
            :allowAnimate="animatePieces" />
    </div>
</template>

<script>
    import BoardTiles from './BoardTiles.vue';
    import Pieces from './PiecesManager.vue';
    import FENReader from '../FENReader.js';

    export default {
        name: 'BoardContainer',
        props: {
            pov: Number,
            tileSize: Number,
        },
        components: {
            BoardTiles,
            Pieces,
        },
        data() {
            return {
                whiteToMove: true,
                pieces: [],
                animatePieces: true,
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
                this.pauseAnimation();
                this.$refs['piecesHandler'].reset(this.pieces, this.whiteToMove);
            },
            updatePieces(pieces, whiteToMove) {
                this.pieces = pieces;
                this.whiteToMove = whiteToMove;
            },
            pauseAnimation() {
                this.animatePieces = false;
                setTimeout(() => {
                    this.animatePieces = true;
                }, 500);
            }
        },
        computed: {
            boardWidthHeight() {
                return {
                    width: (this.tileSize * 8) + 'px',
                    height: (this.tileSize * 8) + 'px',
                }
            }
        },
        watch: {
            pov() {
                this.pauseAnimation();
            },
            tileSize() {
                this.pauseAnimation();
            },
        },
        mounted() {

        },
    };
</script>

<style lang="scss">
    .board {
        position: relative;
    }
</style>

