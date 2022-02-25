<template>
    <div class="tile" v-bind:class="{ 'selected' : (piece === null ? false : piece.isSelected), 'clickable' : piece !== null, 'hasPrevious' : hasPrevious, 'lastMoved' : piece !== null && piece.previousPosition.length > 0 }" v-on:click="selectTile">
        <div class="piece" v-if="piece !== null">
            <img :src="require('@/assets/pieces/' + getImage())" />
        </div>
    </div>
</template>

<script>
    import PieceType from '../PieceType.js';

    export default {
        name: 'PieceImage',
        props: {
            piece: Object,
            hasPrevious: Boolean,
        },
        components: {

        },
        data() {
            return {

            }
        },
        methods: {
            getImage() {
                let img = '';

                if (this.piece === null || this.piece === undefined) {
                    return null;
                } else {
                    switch (this.piece.type) {
                        case PieceType.PAWN:
                            img = 'pawn';
                            break;
                        case PieceType.HORSEY:
                            img = 'horsey';
                            break;
                        case PieceType.BISHOP:
                            img = 'bishop';
                            break;
                        case PieceType.ROOK:
                            img = 'rook';
                            break;
                        case PieceType.QUEEN:
                            img = 'queen';
                            break;
                        case PieceType.KING:
                            img = 'king';
                            break;
                    }

                    if (this.piece.color === 1) img += '_w';
                    img += '.png';
                    return img;
                }
            },
            selectTile() {
                if (this.piece === null) {
                    //selected empty tile
                    this.$emit('tryMovePiece');
                } else {
                    //selected a piece
                    this.$emit('pieceSelected', this.piece.isSelected ? null : this.piece);
                }
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
    $tileSize: 70px;
    $backgroundColorSelected: #e9d854;
    $previousTile: #acf3b0;

    .tile {
        float: left;
        width: $tileSize;
        height: $tileSize;
        position: relative;

        &.clickable {
            cursor: pointer;
        }

        &.hasPrevious {
            background-color: $previousTile;
        }

        &.lastMoved {
            background-color: $previousTile * 0.8;
        }

        &.selected {
            background-color: $backgroundColorSelected;
        }

        .piece {
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            top: ($tileSize / 2) - ($pieceSize / 2);

            img {
                height: $pieceSize;
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            }
        }
    }
</style>

