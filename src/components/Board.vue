<template>
    <div class="board">
        <BoardTiles style="position: absolute; top: 0; left: 0;" :tileSize="tileSize" :pov="pov" />
        <Pieces style="position: absolute; top: 0; left: 0;" :pov="pov" :pieces="pieces" />
    </div>
</template>

<script>
    import BoardTiles from './BoardTiles.vue';
    import Pieces from './Pieces.vue';
    import PieceType from '../PieceType.js';
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
                whiteToPlay: true,
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
            },
            movePiece(piece) {
                piece.color === 1 ? piece.positionY-- : piece.positionY++;
                this.checkPromote(piece);
            },
            checkPromote(piece) {
                if (new PieceType().isPawn(piece)) {
                    if ((piece.color === 1 && piece.positionY === 1) || (piece.color === 0 && piece.positionY === 8)) {
                        piece.type = PieceType.QUEEN;
                    }
                }
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

<style scoped lang="scss">
    $tileSize: 70px;

    .board {
        position: relative;
        width: $tileSize * 8;
        height: $tileSize * 8;
    }
</style>

