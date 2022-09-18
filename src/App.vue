<template>
  <div id="app">
    <Board ref="board" :pov="pov" :FEN="FEN" :tileSize="tileSize" />
    <div style="top: 20px; position: relative">
      <button @click="switchPOV()">Flip</button>
      <button @click="setFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')">
        Start Position
      </button>
      FEN: <input v-model="FEN" style="width: 400px" /><br /><br />
      Size: <button @click="tileSize = 50">Small</button>
      <button @click="tileSize = 70">Medium</button>
      <button @click="tileSize = 90">Large</button>
    </div>
  </div>
</template>

<script>
import Board from "./components/BoardContainer";
export default {
  name: "app",
  components: {
    Board,
  },
  methods: {
    switchPOV() {
      this.pov = this.pov === 1 ? 0 : 1;
    },
    setFEN(f) {
      this.FEN = f;
      this.$refs["board"].loadFEN(this.FEN);
    },
  },
  data() {
    return {
      pov: 1,
      FEN: "",
      tileSize: 70,
    };
  },
  watch: {
    FEN() {
      this.$refs["board"].loadFEN(this.FEN);
    },
  },
  mounted() {
    this.setFEN("8/7k/p6p/4B1p1/3P1pQ1/7P/P5PK/5q2");
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
