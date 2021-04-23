<template>
  <div id="app">
    <div class="text-container">
      <h1>
        y
        <span
          v-for="i in 100"
          :style="
            'transform: translateX(' +
              xTrans(i) +
              'px) translateY(' +
              yTrans(i) +
              'px);'
          "
        >
          y
        </span>
        <span
          class="opposite"
          v-for="i in 100"
          :style="
            'transform: translateX(' +
              -xTrans(i) +
              'px) translateY(' +
              -yTrans(i) +
              'px);'
          "
        >
          y
        </span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Some text",
      x: 0,
      y: 0,
    };
  },
  methods: {
    mouseMove() {
      const _self = this;
      const body = document.querySelector("body");
      body.addEventListener("mousemove", (e) => {
        _self.x = e.clientX;
        _self.y = e.clientY;
      });
      body.addEventListener("touchmove", (e) => {
        _self.x = e.touches[0].clientX;
        _self.y = e.touches[0].clientY;
      });
    },
    xTrans(i) {
      return this.xCentered * ((i + 1) / 20);
    },
    yTrans(i) {
      return this.yCentered * ((i + 1) / 20);
    },
  },
  mounted() {
    this.mouseMove();
  },
  computed: {
    xCentered() {
      let xCentered = 0;
      if (process.isClient) {
        xCentered = (Math.round((this.x / innerWidth) * 100) - 50) * 2;
      }
      return xCentered;
    },
    yCentered() {
      let yCentered = 0;
      if (process.isClient) {
        yCentered = (Math.round((this.y / innerHeight) * 100) - 50) * 2;
      }
      return yCentered;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
}

.text-container {
  position: relative;
  pointer-events: none;
}

h1,
span {
  font-family: arial, helvetica, sans-serif;
  font-size: 50vw;
}

h1 {
  z-index: 2;
  position: relative;
  color: #111;
}

span {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  color: #ffca05;
}
span.opposite {
  color: #fff;
}
</style>
