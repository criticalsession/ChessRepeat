<template>
    <div class="tile" 
         v-on:click="selectTile"
         v-bind:style="getPosition()">
        <div class="piece" v-if="piece !== null && !piece.captured" v-bind:style="piecePosition">
            <img :src="require('@/assets/pieces/' + getImage())" v-bind:style="pieceImageHeight" />
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
            pov: Number,
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

                    if (this.piece.color === PieceType.WHITE) img += '_w';
                    img += '.png';
                    return img;
                }
            },
            selectTile() {
                this.$emit('tileClicked', this.piece);
            },
            getPosition() {
                return {
                    top: ((this.povY - 1) * this.tileSize) + 'px',
                    left: ((this.povX - 1) * this.tileSize) + 'px',
                    'z-index': new PieceType().isHorsey(this.piece) ? 8 : 6, // always put knights on top as they can 'jump'
                    transition: this.allowAnimate ? 'all 0.2s' : 'none',
                    width: this.tileSize + 'px',
                    height: this.tileSize + 'px',
                };
            },
        },
        computed: {
            povX() {
                if (this.pov === 1) return this.piece.positionX;
                else return 9 - this.piece.positionX;
            },
            povY() {
                if (this.pov === 1) return this.piece.positionY;
                else return 9 - this.piece.positionY;
            },
            piecePosition() {
                return {
                    top: ((this.tileSize / 2) - (this.tileSize / 2.5)) + 'px',
                }
            },
            pieceImageHeight() {
                return {
                    height: (this.tileSize / 1.25) + 'px',
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
    $backgroundColorSelected: #e9d854;
    $previousTile: #acf3b0;

    .tile {
        position: absolute;
        pointer-events: none;

        .piece {
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;

            img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            }
        }
    }
</style>

