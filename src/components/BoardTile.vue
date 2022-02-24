<template>
    <div class="tile" v-bind:class="{ 'white' : (column + row) % 2 === 0 }">
        <div v-if="column === 1 || row === 8">
            <div class="colDisplay tileMarker" v-if="colDisplay !== null">{{ colDisplay }}</div>
            <div class="rowDisplay tileMarker" v-if="rowDisplay !== null">{{ rowDisplay }}</div>
        </div>
        <div class="piece" v-on:click="fireMovePiece()" v-if="hasPiece" v-bind:class="{ 'white' : piece.color === 1 }">
            <img :src="require('@/assets/pieces/' + pieceImage)" />
        </div>
    </div>
</template>

<script>
    import PieceType from '../PieceType.js';

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
            fireMovePiece() {
                this.$emit('movePiece', this.piece);
            },
        },
        props: {
            row: Number,
            column: Number,
            piece: Object,
            povRow: Number,
            povColumn: Number,
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
            pieceImage() {
                let pieceImage = '';

                if (this.piece === null || this.piece === undefined) {
                    return null;
                } else {
                    switch (this.piece.type) {
                        case PieceType.PAWN:
                            pieceImage = 'pawn';
                            break;
                        case PieceType.HORSEY:
                            pieceImage = 'horsey';
                            break;
                        case PieceType.BISHOP:
                            pieceImage = 'bishop';
                            break;
                        case PieceType.ROOK:
                            pieceImage = 'rook';
                            break;
                        case PieceType.QUEEN:
                            pieceImage = 'queen';
                            break;
                        case PieceType.KING:
                            pieceImage = 'king';
                            break;
                    }

                    if (this.piece.color === 1) pieceImage += '_w';
                    pieceImage += '.png';
                    return pieceImage;
                }
            },
            hasPiece() {
                return this.piece !== null && this.piece !== undefined;
            },
        }
    };
</script>

<style scoped lang="scss">
    $tileSize : 70px;
    $backgroundColorBlack : #769656;
    $backgroundColorWhite : #EEEED2;
    $pieceSize : 60px;

    .tile {
        user-select: none;
        background-color: $backgroundColorBlack;
        width: $tileSize;
        height: $tileSize;
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

        .colDisplay {
            top: $tileSize - 20;
        }

        .piece {
            font-size: $pieceSize;
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            top: ($tileSize / 2) - ($pieceSize / 2);
            cursor: pointer;

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

