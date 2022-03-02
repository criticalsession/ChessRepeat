<template>
    <section>
        <TileTarget v-for="p in (8*8)"
                    :key="'tile' + p"
                    v-on:tileClicked="tileClicked(p)"
                    :coords="getCoords64(p)" 
                    :hasPrevious="findPrevious(p)"
                    :hasLastMoved="findLastMoved(p)" 
                    :isSelected="isTileSelected(p)" 
                    :allowAnimate="allowAnimate" 
                    :tileSize="tileSize" />
        <PieceImage v-for="(piece,index) in pieces" 
                    :key="'piece' + index" 
                    :piece="piece" 
                    :pov="pov" 
                    :allowAnimate="allowAnimate" 
                    :tileSize="tileSize" />
    </section>
</template>

<script>
    import PieceImage from './PieceImage.vue';
    import TileTarget from './TileTarget.vue';

    export default {
        name: 'PiecesManager',
        props: {
            pov: Number,
            allowAnimate: Boolean,
            tileSize: Number,
        },
        components: {
            PieceImage,
            TileTarget,
        },
        data() {
            return {
                pieces: [],
                whiteToMove: true,
            }
        },
        methods: {
            getTileRef(p) {
                return 'tile' + p;
            },
            reset(pieces, whiteToMove) {
                this.pieces = pieces;
                this.whiteToMove = whiteToMove;
            },
            getCoords64(p) {
                p = p - 1; //make 0-based
                const x = (p % 8) + 1;
                const y = parseInt(p / 8) + 1;

                return { x, y };
            },
            getPiece(x, y) {
                let foundPieces = this.activePieces.filter(item => {
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
                    p.lastMoved = false;
                });
            },
            pieceCorrectColor(piece) {
                return ((piece.color === 0 && !this.whiteToMove) || (piece.color === 1 && this.whiteToMove));
            },
            tileClicked(p64) {
                const coords = this.getCoords64(p64);

                let piece = this.getPiece(coords.x, coords.y);
                let selectedPiece = this.selectedPiece;

                if (piece !== null && this.pieceCorrectColor(piece)) { //if my piece, select it
                    this.clearSelections();
                    piece.isSelected = true;
                } else if (selectedPiece !== null) {
                    this.tryMovePiece(coords.x, coords.y, selectedPiece);
                }

                this.$emit('updatePieceList', this.pieces, this.whiteToMove);
            },
            capturePiece(toCapture) {
                toCapture.captured = true;
            },
            tryMovePiece(x, y, piece) {
                //todo: check can move
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

                    piece.lastMoved = true;
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
            findPrevious(p64) {
                const coords = this.getCoords64(p64);
                let found = this.pieces.filter(p => p.previousPosition[0] === this.adjustToAbsolute(coords.x) && p.previousPosition[1] === this.adjustToAbsolute(coords.y));

                return found.length > 0;
            },
            findLastMoved(p64) {
                const coords = this.getCoords64(p64);
                let found = this.pieces.filter(p => p.positionX === this.adjustToAbsolute(coords.x) && p.positionY === this.adjustToAbsolute(coords.y) && p.lastMoved);

                return found.length > 0;
            },
            isTileSelected(p64) {
                if (this.selectedPiece !== null) {
                    const coords = this.getCoords64(p64);
                    let found = this.pieces.filter(p => p.positionX === this.adjustToAbsolute(coords.x) && p.positionY === this.adjustToAbsolute(coords.y) && p.isSelected);

                    return found.length > 0;
                }
            }
        },
        computed: {
            selectedPiece() {
                let selected = this.pieces.filter(p => p.isSelected);
                if (selected.length === 0) return null;
                else return selected[0];
            },
            activePieces() {
                return this.pieces.filter(p => !p.captured);
            },
        },
        watch: {

        },
        mounted() {

        },
    };
</script>

<style scoped lang="scss">

</style>

