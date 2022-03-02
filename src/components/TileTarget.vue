<template>
    <div class="tile-target" 
         v-bind:class="{ 'selected' : isSelected(), 'isPrevious' : isPrevious(), 'isLastMoved' : isLastMoved(), 'canCapture' : canCaptureHere }"
         v-on:click="selectTile"
         v-bind:style="getPosition()">
         <div 
            v-if="canMoveHere && getPieceOnTile() === null"
            class="possible-move" 
            v-bind:style="possibleMoveStyle()">
                <i class="fa-solid fa-circle"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PieceImage',
        props: {
            coords: Object,
            allowAnimate: Boolean,
            tileSize: Number,
            pov: Number,
            pieces: Array,
            pieceIsSelected: Boolean,
            possibleMoves: Array,
            colorPlaying: Number,
        },
        components: {

        },
        data() {
            return {

            }
        },
        methods: {
            selectTile() {
                this.$emit('tileClicked', this.piece);
            },
            getPosition() {
                return {
                    top: ((this.coords.y - 1) * this.tileSize) + 'px',
                    left: ((this.coords.x - 1) * this.tileSize) + 'px',
                    transition: this.allowAnimate ? 'all 0.2s' : 'none',
                    width: this.tileSize + 'px',
                    height: this.tileSize + 'px',
                };
            },
            possibleMoveStyle() {
                return {
                    'font-size': (this.tileSize / 2.5) + 'px',
                    'padding-top': (this.tileSize / 3.5) + 'px',
                };
            },
            isPrevious() {
                let found = this.pieces.filter(p => p.previousPosition[0] === this.absoluteX && p.previousPosition[1] === this.absoluteY);

                return found.length > 0;
            },
            isLastMoved() {
                let found = this.pieces.filter(p => p.positionX === this.absoluteX && p.positionY === this.absoluteY && p.lastMoved);

                return found.length > 0;
            },
            isSelected() {
                if (this.pieceIsSelected === true) {
                    let found = this.pieces.filter(p => p.positionX === this.absoluteX && p.positionY === this.absoluteY && p.isSelected);

                    return found.length > 0;
                }
            },
            adjustToAbsolute(p) {
                if (this.pov === 0) {
                    return 9 - p;
                } else return p;
            },
            getPieceOnTile() {
                const pieceOnTile = this.pieces.filter(p => p.positionX === this.adjustToAbsolute(this.coords.x) && p.positionY === this.adjustToAbsolute(this.coords.y));
                if (pieceOnTile.length > 0) return pieceOnTile[0];
                else return null;
            }
        },
        computed: {
            absoluteX() {
                return this.adjustToAbsolute(this.coords.x);
            },
            absoluteY() {
                return this.adjustToAbsolute(this.coords.y);
            },
            canMoveHere() {
                if (this.possibleMoves.length > 0) {
                    let possible = this.possibleMoves.filter(p => p.x === this.adjustToAbsolute(this.coords.x) && p.y === this.adjustToAbsolute(this.coords.y));
                    return possible.length > 0;
                }

                return false;
            },
            canCaptureHere() {
                const pieceOnTile = this.getPieceOnTile();

                return this.canMoveHere && pieceOnTile !== null && pieceOnTile.color !== this.colorPlaying;
            },
        },
        watch: {

        },
        mounted() {
            
        },
    };
</script>

<style scoped lang="scss">
    $pieceSize: 55px;
    $backgroundColorSelected: #e9d854;
    $previousTile: #80d3ec;

    .tile-target {
        position: absolute;
        cursor: pointer;
        z-index: 5;

        &.isPrevious {
            background-color: $previousTile;
            opacity: 0.8;
        }

        &.isLastMoved {
            background-color: $previousTile;
            opacity: 0.5;
        }

        &.selected {
            background-color: $backgroundColorSelected;
        }

        &.canCapture {
            background-color: red !important;
            opacity: 0.8;
        }

        .possible-move {
            width: 100%;
            text-align: center;
            color: white;
        }
    }
</style>

