<template>
    <section>
        <TileTarget v-for="p in (8*8)"
                    :key="'tile' + p"
                    v-on:tileClicked="tileClicked(p)"
                    :coords="getCoords64(p)" 
                    :allowAnimate="allowAnimate" 
                    :pov="pov"
                    :pieces="activePieces"
                    :tileSize="tileSize" 
                    :possibleMoves="possibleMoves"
                    :pieceIsSelected="selectedPiece !== null" 
                    :colorPlaying="whiteToMove ? 1 : 0" />
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
    import Movement from '../Movement.js';
    import PieceType from '../PieceType.js';

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
                moveManager: null,
                possibleMoves: [],
            }
        },
        methods: {
            getTileRef(p) {
                return 'tile' + p;
            },
            reset(pieces, whiteToMove) {
                this.pieces = pieces;
                this.whiteToMove = whiteToMove;
                this.possibleMoves = [];
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
                });

                this.possibleMoves = [];
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
                    this.workoutPossibleMoves(piece);
                } else if (selectedPiece !== null) {
                    this.tryMovePiece(coords.x, coords.y, selectedPiece);
                }

                this.$emit('updatePieceList', this.pieces, this.whiteToMove);
            },
            workoutPossibleMoves(piece) {
                this.possibleMoves = this.moveManager.getMovePositions(piece);
            },
            capturePiece(toCapture) {
                toCapture.captured = true;
                this.moveManager.pieces = this.activePieces;
            },
            tryMovePiece(x, y, piece) {
                if (this.canMoveHere(x, y)) {
                    let pieceOnTargetTile = this.getPiece(x, y);

                    if (pieceOnTargetTile !== null) this.capturePiece(pieceOnTargetTile); // capture
                    this.movePieceTo(piece, x, y); // then move
                } else {
                    this.clearSelections();
                }
            },
            canMoveHere(x, y) {
                if (this.possibleMoves.length > 0) {
                    let possible = this.possibleMoves.filter(p => p.x === this.adjustToAbsolute(x) && p.y === this.adjustToAbsolute(y));
                    return possible.length > 0;
                }

                return false;
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

                if (this.moveManager.shouldPromote(piece)) {
                    piece.type = PieceType.QUEEN;
                }

                this.clearSelections();
                this.whiteToMove = !this.whiteToMove;
                this.markChecks();
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
            initMoveManager() {
                this.moveManager = new Movement(this.pov, this.activePieces);
            },
            getKings() {
                return this.pieces.filter(p => p.type === PieceType.KING);
            },
            markChecks() {
                this.getKings().forEach(king => {
                    king.isInCheck = this.moveManager.isKingInCheck(king);
                });
            },
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
            pov() {
                this.initMoveManager();
            },
            activePieces() {
                this.initMoveManager();
            }
        },
        mounted() {
            this.initMoveManager();
        },
    };
</script>

<style scoped lang="scss">

</style>

