<template>
  <Layout>
    <script id="vertexShader" type="x-shader/x-vertex">
      varying vec3 vNormal;
      void main()
      {
          vNormal = normalize( normalMatrix * normal );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    </script>

    <script id="fragmentShader" type="x-shader/x-vertex">
      varying vec3 vNormal;
      void main()
      {
      	float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
          gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
      }
    </script>

    <canvas id="three"></canvas>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: "4",
  },
  data() {
    return {
      mousePosition: {
        x: 0,
        y: 0,
      },
      canvas: {},
      camera: {},
      scene: {},
      render: {},
      composer: {},
      loader: {},
      models: {
        four: {
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        orb: {
          rotation: {
            x: 0,
            y: 0,
            z: 0,
          },
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
      },
    };
  },
  methods: {
    init() {
      const _self = this;

      _self.canvas = document.getElementById("three");

      // Render the canvas
      _self.renderer = new _self.$THREE.WebGLRenderer({ canvas: _self.canvas });
      this.renderer.setSize(
        _self.canvas.clientWidth,
        _self.canvas.clientHeight
      );

      // Camera
      _self.camera = new _self.$THREE.PerspectiveCamera(75, 1, 0.1, 2000);
      _self.camera.position.z = 10;
      _self.camera.position.y = -1;
      _self.camera.aspect =
        _self.canvas.clientWidth / _self.canvas.clientHeight;
      _self.camera.updateProjectionMatrix();

      // Scene
      _self.scene = new _self.$THREE.Scene();

      // 4
      _self.loader = new _self.$GLTFLoader();
      _self.loader.load("./4.glb", function(gltf) {
        _self.models.four = gltf.scene;
        _self.scene.add(_self.models.four);
      });

      // Spheres
      var customMaterial = new _self.$THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
        side: _self.$THREE.BackSide,
        blending: _self.$THREE.AdditiveBlending,
        transparent: true,
      });

      const orbGeo = new _self.$THREE.SphereGeometry(2, 30, 30);
      _self.models.orb = new _self.$THREE.Mesh(orbGeo, customMaterial);
      _self.scene.add(_self.models.orb);

      // Light
      let directionalLight = new _self.$THREE.DirectionalLight(0xffccaa, 3);
      directionalLight.position.set(0, 0, -1);
      _self.scene.add(directionalLight);

      // "Sun"
      let circleGeo = new _self.$THREE.CircleGeometry(220, 50);
      let circleMat = new _self.$THREE.MeshBasicMaterial({ color: 0xffccaa });
      let circle = new _self.$THREE.Mesh(circleGeo, circleMat);
      circle.position.set(0, 100, -500);
      circle.scale.setX(1.2);
      _self.scene.add(circle);

      // God Rays
      let godraysEffect = new _self.$POSTPROCESSING.GodRaysEffect(
        _self.camera,
        circle,
        {
          resolutionScale: 1,
          density: 0.8,
          decay: 0.95,
          weight: 0.9,
          samples: 100,
        }
      );

      // Shader passes
      let renderPass = new _self.$POSTPROCESSING.RenderPass(
        _self.scene,
        _self.camera
      );
      let effectPass = new _self.$POSTPROCESSING.EffectPass(
        _self.camera,
        godraysEffect
      );
      effectPass.renderToScreen = true;

      _self.composer = new _self.$POSTPROCESSING.EffectComposer(_self.renderer);
      _self.composer.addPass(renderPass);
      _self.composer.addPass(effectPass);
    },
    getMousePosition() {
      const _self = this;
      const body = document.querySelector("body");
      let rotateXIntensity = 10;
      let rotateYIntensity = 10;
      body.addEventListener("mousemove", (e) => {
        _self.mousePosition.x =
          (e.clientX / innerWidth) * rotateXIntensity - rotateXIntensity / 2;
        _self.mousePosition.y =
          (e.clientY / innerHeight) * rotateYIntensity - rotateYIntensity / 2;
      });
      body.addEventListener("touchmove", (e) => {
        _self.mousePosition.x =
          (e.clientX / innerWidth) * rotateXIntensity - rotateXIntensity / 2;
        _self.mousePosition.y =
          (e.clientY / innerHeight) * rotateYIntensity - rotateYIntensity / 2;
      });
    },
    resizeRendererToDisplaySize() {
      const canvas = this.renderer.domElement;
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      const needResize =
        this.canvas.width !== width || this.canvas.height !== height;
      return needResize;
    },
    animate() {
      const _self = this;

      requestAnimationFrame(_self.animate);

      // if (this.resizeRendererToDisplaySize()) {
      const canvas = _self.renderer.domElement;
      _self.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      _self.camera.updateProjectionMatrix();
      _self.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      // }

      _self.models.four.rotation.x = (_self.mousePosition.y - 0.5) / 10;
      _self.models.four.rotation.y = (_self.mousePosition.x - 0.5) / 10;

      _self.models.orb.position.x = _self.mousePosition.y - 0.5;
      _self.models.orb.position.y = _self.mousePosition.x - 0.5;

      _self.composer.render(_self.scene, _self.camera);
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  mounted() {
    this.getMousePosition();
    this.init();
    this.animate();
  },
};
</script>

<style>
html,
body {
  margin: 0;
  overflow: hidden;
  /* background: black; */
}
#three {
  width: 100vw !important;
  height: 100vh !important;
  display: block;
}

.home-links a {
  margin-right: 1rem;
}
</style>
