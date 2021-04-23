<template>
  <Layout>
    <nav>
      <g-link to="/y">y</g-link>
      /
      <g-link to="/iv">4</g-link>
    </nav>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: "NFAlphabet / Index",
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

nav {
  font-size: 5vw;
  color: white;
  pointer-events: none;
}

nav a {
  color: white;
  text-decoration: none;
  pointer-events: initial;
}

nav a:hover {
  color: #ffca05;
}
</style>
