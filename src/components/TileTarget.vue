<template>
    <div class="tile" 
         v-bind:class="{ 'selected' : isSelected, 'hasPrevious' : hasPrevious, 'lastMoved' : hasLastMoved }"
         v-on:click="selectTile"
         v-bind:style="getPosition()">
    </div>
</template>

<script>
    export default {
        name: 'PieceImage',
        props: {
            hasPrevious: Boolean,
            hasLastMoved: Boolean,
            isSelected: Boolean,
            coords: Object,
            allowAnimate: Boolean,
            tileSize: Number,
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
        },
        computed: {

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
    $previousTile: #acf3b0;

    .tile {
        position: absolute;
        cursor: pointer;
        z-index: 5;

        &.hasPrevious {
            background-color: $previousTile;
        }

        &.lastMoved {
            background-color: $previousTile;
            opacity: 0.8;
        }

        &.selected {
            background-color: $backgroundColorSelected;
        }
    }
</style>

