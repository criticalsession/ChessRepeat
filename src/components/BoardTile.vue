<template>
    <div class="tile" v-bind:class="{ 'white' : (column + row) % 2 === 0 }" v-bind:style="sizeStyle">
        <div v-if="column === 1 || row === 8">
            <div class="colDisplay tileMarker" v-bind="colDisplayTopStyle">{{ colDisplay }}</div>
            <div class="rowDisplay tileMarker">{{ rowDisplay }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BoardTile',
        data() {
            return {

            }
        },
        methods: {
            alphabetFromNumber(number) {
                return (number + 9).toString(36);
            },
        },
        props: {
            row: Number,
            column: Number,
            pov: Number,
            tileSize: Number,
        },
        computed: {
            colDisplay() {
                if (this.row !== 8) {
                    return null;
                } else {
                    return this.alphabetFromNumber(this.povColumn);
                }
            },
            rowDisplay() {
                if (this.column !== 1) {
                    return null;
                } else {
                    return this.povRow;
                }
            },
            povRow() {
                return this.pov === 0 ? this.row : 9 - this.row;
            },
            povColumn() {
                return this.pov === 1 ? this.column : 9 - this.column;
            },
            sizeStyle() {
                return {
                    width: this.tileSize + 'px',
                    height: this.tileSize + 'px',
                };
            },
            colDisplayTopStyle() {
                return {
                    top: (this.tileSize - 20) + 'px',
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    $backgroundColorBlack : #769656;
    $backgroundColorWhite : #EEEED2;

    .tile {
        user-select: none;
        background-color: $backgroundColorBlack;
        float: left;
        position: relative;

        .tileMarker {
            color: $backgroundColorWhite;
            box-sizing: border-box;
            top: 5px;
            left: 5px;
            position: absolute;
        }

        &.white {
            background-color: $backgroundColorWhite;

            .tileMarker {
                color: $backgroundColorBlack;
            }
        }
    }
</style>

