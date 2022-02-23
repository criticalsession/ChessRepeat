<template>
    <div class="board">
        <div v-for="i in 8" :key="i" class="row">
            <div class="tile-marker vertical">{{ 9 - i }}</div>
            <div v-for="j in 8" class="tile" :key="j" :class="{ 'white' : (j + i) % 2 !== 0 }"></div>
        </div>
        <div class="row">
            <div class="tile-marker vertical">&nbsp;</div>
            <div class="tile-marker horizontal" v-for="i in 8" :key="i">{{ alphabetFromNumber(i) }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Board',
        props: {

        },
        data() {
            return {
                whiteToPlay: true,
            }
        },
        methods: {
            alphabetFromNumber(number) {
                return (number + 9).toString(36);
            }
        }
    };
</script>

<style scoped lang="scss">
    $tileSize : 70px;

    .row {
        clear: both;

        .tile {
            user-select: none;
            background-color: #769656;
            width: $tileSize;
            height: $tileSize;
            float: left;

            &.white {
                background-color: #EEEED2;
            }
        }

        .tile-marker {
            @extend .tile;
            background: none;
            text-align: center;
            line-height: $tileSize;

            &.vertical {
                width: $tileSize / 2;
            }

            &.horizontal {
                line-height: $tileSize / 2;
                height: $tileSize / 2;
            }
        }
    }
</style>

