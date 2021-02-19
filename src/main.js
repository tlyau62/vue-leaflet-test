import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

Vue.config.productionTip = false;

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Vue.component("l-map", LMap);
// Vue.component("l-tile-layer", LTileLayer);
// Vue.component("l-marker", LMarker);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
