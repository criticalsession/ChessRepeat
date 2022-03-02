<template>
    <div class="tile" 
         v-bind:class="{ 'selected' : isSelected(), 'isPrevious' : isPrevious(), 'isLastMoved' : isLastMoved() }"
         v-on:click="selectTile"
         v-bind:style="getPosition()">
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
        },
        computed: {
            absoluteX() {
                return this.adjustToAbsolute(this.coords.x);
            },
            absoluteY() {
                return this.adjustToAbsolute(this.coords.y);
            }
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

    .tile {
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
    }
</style>

