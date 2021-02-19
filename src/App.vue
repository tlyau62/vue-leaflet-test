<template>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px overflow: auto;">
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      ref="map"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @ready="ready"
    >
      <l-tile-layer v-bind="tileLayer" />
      <l-tile-layer v-bind="tileLayer2" />
      <!-- <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { request } from "esri-leaflet";
import {
  geosearch,
  geocodeServiceProvider,
  Geocode,
  GeocodeService,
  Suggest,
} from "esri-leaflet-geocoder";

const apiKey = "584b2fa686f14ba283874318b3b8d6b0";

Geocode.prototype.params.key = apiKey;
Suggest.prototype.params.key = apiKey;

GeocodeService.prototype.metadata = function(callback, context) {
  return request(
    this.options.url,
    {
      key: apiKey,
    },
    callback,
    context
  );
};

var geocodeAddress = geocodeServiceProvider({
  url: "/ags/gc/loc/address",
  label: "Address Point",
  maxResults: 15,
});

var geocodeBuilding = geocodeServiceProvider({
  url: "/ags/gc/ib1000/buildings/building",
  label: "Building",
  maxResults: 15,
});
var geocodeBuildingLic = geocodeServiceProvider({
  url: "/ags/gc/ic1000/buildinglicence",
  label: "Building Licence",
  maxResults: 15,
});
var geocodeGeocomm = geocodeServiceProvider({
  url: "/ags/gc/loc/geocomm",
  label: "Geo Community",
  maxResults: 15,
});
var geocodePlacePoint = geocodeServiceProvider({
  url: "/ags/gc/ib5000/poi/placepoint",
  label: "Place",
  maxResults: 15,
});
var geocodePoiPoint = geocodeServiceProvider({
  url: "/ags/gc/ib5000/poi/poipoint",
  label: "POI",
  maxResults: 15,
});

var geocodeSite = geocodeServiceProvider({
  url: "/ags/gc/ib1000/buildings/site",
  label: "Site",
  maxResults: 15,
});

var geocodeSubSite = geocodeServiceProvider({
  url: "/ags/gc/ib1000/buildings/subsite",
  label: "SubSite",
  maxResults: 15,
});

var geocodeLot = geocodeServiceProvider({
  url: "/ags/gc/ic1000/lot",
  label: "LOT",
  maxResults: 15,
});

var geocodeTenancyPoly = geocodeServiceProvider({
  url: "/ags/gc//ic1000/tenancypoly",
  label: "LOT",
  maxResults: 15,
});

var geocodeGLA = geocodeServiceProvider({
  url: "/ags/gc/ic1000/gla",
  label: "GLA",
  maxResults: 15,
});

var geocodeVGS = geocodeServiceProvider({
  url: "/ags/gc/ls/vacantgovsite",
  label: "VGS",
  maxResults: 15,
});

var geocodeStInt = geocodeServiceProvider({
  url: "/ags/gc/loc/streetintersection",
  label: "Streets Intersection",
  maxResults: 15,
});

var geocodeStreets = geocodeServiceProvider({
  url: "/ags/gc/ib1000/transportation/streetcentrelines",
  label: "Streets",
  maxResults: 15,
});

var geocodeLocalControl = geocodeServiceProvider({
  url: "/ags/gc/sc/localcontrol",
  label: "Local Control",
  maxResults: 15,
});

var geocodeHControl = geocodeServiceProvider({
  url: "/ags/gc/sc/GeodeticHControl",
  label: "GeodeticHControl",
  maxResults: 15,
});

var geocodeVControl = geocodeServiceProvider({
  url: "/ags/gc/sc/GeodeticVControl",
  label: "GeodeticVControl",
  maxResults: 15,
});

var geocodeUtility = geocodeServiceProvider({
  url: "/ags/gc/ib1000/utilities/utilitypoint",
  label: "Utility Point",
  maxResults: 50,
});

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
  data() {
    return {
      tileLayer: {
        url: `https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=${apiKey}`,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        options: {
          maxZoom: 19,
        },
      },
      tileLayer2: {
        url: `https://api.hkmapservice.gov.hk/osm/xyz/label-tc/WGS84/tile/{z}/{x}/{y}.png?key=${apiKey}`,
        options: {
          minZoom: 10,
          maxZoom: 19,
        },
      },
      zoom: 13,
      center: latLng(22.29227, 114.20847),
      mapOptions: {
        zoomSnap: 0.5,
      },
      currentZoom: 11.5,
      currentCenter: latLng(22.29227, 114.20847),
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    ready() {
      const map = this.$refs.map.mapObject;
      const searchControl = geosearch({
        collapseAfterResult: false,
        allowMultipleResults: true,
        providers: [
          geocodeAddress,
          geocodeBuilding,
          geocodeBuildingLic,
          geocodeGeocomm,
          geocodePlacePoint,
          geocodePoiPoint,
          geocodeSite,
          geocodeSubSite,
          geocodeStInt,
          geocodeStreets,
          geocodeLot,
          geocodeTenancyPoly,
          geocodeGLA,
          geocodeVGS,
          geocodeUtility,
        ],
        useMapBounds: false,
        zoomToResult: true,
      }).addTo(map);
    },
  },
};
</script>
