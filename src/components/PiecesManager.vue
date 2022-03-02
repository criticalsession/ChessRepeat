<template>
    <section>
        <div v-for="y in 8" :key="y" class="row">
            <PieceImage v-for="x in 8" :key="x + y" :piece="getPiece(x, y)" :hasPrevious="findPrevious(x, y)" v-on:tileClicked="tileClicked(x, y)"></PieceImage>
        </div>
    </section>
</template>

<script>
    import PieceImage from './PieceImage.vue';
    import Movement from '../Movement.js';

    export default {
        name: 'PiecesManager',
        props: {
            pov: Number,
        },
        components: {
            PieceImage,
        },
        data() {
            return {
                pieces: [],
                whiteToMove: true,
                possibleMoves: [],
                moveManager: null,
            }
        },
        methods: {
            reset(pieces, whiteToMove) {
                this.pieces = pieces;
                this.whiteToMove = whiteToMove;
            },
            getPiece(x, y) {
                let foundPieces = this.pieces.filter(item => {
                    return item.positionX === (this.pov === 1 ? x : 9 - x) && item.positionY === (this.pov === 1 ? y : 9 - y) && !item.captured;
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
            tileClicked(x, y) {
                let piece = this.getPiece(x, y);
                let selectedPiece = this.selectedPiece;

                if (piece !== null && this.pieceCorrectColor(piece)) { //if my piece, select it
                    this.clearSelections();
                    piece.isSelected = true;
                    this.highlightPossibleMoves(piece);
                } else if (selectedPiece !== null) {
                    this.tryMovePiece(x, y, selectedPiece);
                }

                this.$emit('updatePieceList', this.pieces, this.whiteToMove);
            },
            highlightPossibleMoves(piece) {
                const positions = this.moveManager.getMovePositions(piece);
                this.possibleMoves = positions;
            },
            capturePiece(toCapture) {
                toCapture.captured = true;
            },
            tryMovePiece(x, y, piece) {
                let pieceOnTargetTile = this.getPiece(x, y);

                if (pieceOnTargetTile !== null) this.capturePiece(pieceOnTargetTile); // capture
                this.movePieceTo(piece, x, y); // then move
            },
            movePieceTo(piece, x, y) {
                let coords = this.adjustXYToAbsolute(x, y);

                this.clearPreviousPositions();
                if (piece !== null) {
                    piece.previousPosition = [piece.positionX, piece.positionY];

                    piece.positionX = coords[0];
                    piece.positionY = coords[1];
                    piece.movedOnce = true;
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

                if (found.length === 0) return false;
                else return true;
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
            this.moveManager = new Movement();
        },
    };
</script>

<style scoped lang="scss">
    .row {
        clear: both;
    }
</style>

