<template>
    <div id="app">
        <Board :pov="pov" :FEN="FEN" />
        <div style="clear: both; padding-top: 20px;">
            <button @click="switchPOV()">Flip</button> <button @click="FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'">Start Position</button>
            FEN: <input v-model="FEN" style="width: 400px;" />
        </div>
    </div>
</template>

<script>
    import Board from './components/Board';
    export default {
        name: 'app',
        components: {
            Board
        },
        methods: {
            switchPOV() {
                this.pov = this.pov === 1 ? 0 : 1;
            },
        },
        data() {
            return {
                pov: 1,
                FEN: 'r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1',
            };
        },
    };
</script>

<style lang="scss">
    @import "@/assets/fontawesome/scss/fontawesome.scss";
    @import "@/assets/fontawesome/scss/solid.scss";
    @import "@/assets/fontawesome/scss/brands.scss";
    @import "@/assets/fontawesome/scss/duotone.scss";
    @import "@/assets/fontawesome/scss/_duotone-icons.scss";
</style>

