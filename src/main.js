// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

var THREE = require("three");
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  GodRaysFakeSunShader,
  GodRaysDepthMaskShader,
  GodRaysCombineShader,
  GodRaysGenerateShader,
} from "three/examples/jsm/shaders/GodRaysShader.js";

import gsap from "gsap";

var POSTPROCESSING = require("postprocessing");

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.prototype.$gsap = gsap;
  Vue.prototype.$THREE = THREE;
  Vue.prototype.$GLTFLoader = GLTFLoader;
  Vue.prototype.$GodRaysFakeSunShader = GodRaysFakeSunShader;
  Vue.prototype.$GodRaysDepthMaskShader = GodRaysDepthMaskShader;
  Vue.prototype.$GodRaysCombineShader = GodRaysCombineShader;
  Vue.prototype.$GodRaysGenerateShader = GodRaysGenerateShader;
  Vue.prototype.$POSTPROCESSING = POSTPROCESSING;
}
