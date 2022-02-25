<template>
    <div class="tile">
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
        },
        watch: {

        },
        mounted() {

        },
    };
</script>

<style scoped lang="scss">
    $pieceSize: 50px;
    $tileSize: 70px;

    .tile {
        float: left;
        width: $tileSize;
        height: $tileSize;
        position: relative;

        .piece {
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

