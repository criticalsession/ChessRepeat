<template>
    <section>
        <div v-for="y in 8" :key="y" class="row">
            <PieceImage v-for="x in 8" :key="x + y" :piece="getPiece(x, y)" :hasPrevious="findPrevious(x, y)" v-on:pieceSelected="pieceSelected" v-on:tryMovePiece="tryMovePiece(x, y)"></PieceImage>
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
            whiteToMove: Boolean,
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
            },
            clearSelections() {
                this.pieces.forEach(p => {
                    p.isSelected = false;
                })
            },
            clearPreviousPositions() {
                this.pieces.forEach(p => {
                    p.previousPosition = [];
                });
            },
            pieceCorrectColor(piece) {
                return ((piece.color === 0 && !this.whiteToMove) || (piece.color === 1 && this.whiteToMove));
            },
            pieceSelected(piece) {
                this.clearSelections();
                if (this.pieceCorrectColor(piece)) {
                    piece.isSelected = true;
                }
            },
            tryMovePiece(x, y) {
                let piece = this.selectedPiece;

                if (piece !== null) {
                    //todo: check can move
                    this.movePieceTo(piece, x, y);
                }
            },
            movePieceTo(piece, x, y) {
                let coords = this.adjustXYToAbsolute(x, y);

                this.clearPreviousPositions();
                if (piece !== null) {
                    piece.previousPosition = [piece.positionX, piece.positionY];

                    piece.positionX = coords[0];
                    piece.positionY = coords[1];
                }

                this.clearSelections();
                this.whiteToMove = !this.whiteToMove;
            },
            adjustToAbsolute(p) {
                if (this.pov === 0) {
                    return 9 - p;
                } else return p;
            },
            adjustXYToAbsolute(x, y) {
                let coords = [x, y];

                if (this.pov === 0) { //for black, flip
                    coords = [9 - x, 9 - y];
                }

                return coords;
            },
            findPrevious(x, y) {
                let found = this.pieces.filter(p => p.previousPosition[0] === this.adjustToAbsolute(x) && p.previousPosition[1] === this.adjustToAbsolute(y));

                if (found.length === 0) return null;
                else return found[0];
            }
        },
        computed: {
            selectedPiece() {
                let selected = this.pieces.filter(p => p.isSelected);
                if (selected.length === 0) return null;
                else return selected[0];
            },
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

