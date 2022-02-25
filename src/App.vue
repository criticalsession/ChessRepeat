<template>
    <div id="app">
        <Board ref="board" :pov="pov" :FEN="FEN" />
        <div style="top: 20px; position: relative;">
            <button @click="switchPOV()">Flip</button> <button @click="setFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')">Start Position</button>
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
            setFEN(f) {
                this.FEN = f;
                this.$refs['board'].loadFEN(this.FEN);
            },
        },
        data() {
            return {
                pov: 1,
                FEN: '',
            };
        },
        watch: {
            FEN() {
                this.$refs['board'].loadFEN(this.FEN);
            }
        },
        mounted() {
            this.setFEN('r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1')
        }
    };
</script>

<style lang="scss">
    @import "@/assets/fontawesome/scss/fontawesome.scss";
    @import "@/assets/fontawesome/scss/solid.scss";
    @import "@/assets/fontawesome/scss/brands.scss";
    @import "@/assets/fontawesome/scss/duotone.scss";
    @import "@/assets/fontawesome/scss/_duotone-icons.scss";
</style>

