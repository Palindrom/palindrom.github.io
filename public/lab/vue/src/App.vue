<template>
  <!--
  v-model: this directive has special meaning in Vue. It creates 2-way data binding. See: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
  v-if: wait until value is populated with Palindrom state from the server
  -->
  <HelloWorld v-model="palindromObj" v-if="palindromObj" />
</template>

<script>
// the below line is only needed to simulate the server
import "./mock-server.js";
import { PalindromDOM } from "palindrom";
import HelloWorld from "./components/HelloWorld.vue";

function connectToPalindrom(onConnect) { // this is a generic Palindrom client config. See https://palindrom.github.io/docs/04-_PalindromDOM/
  new PalindromDOM({
    // "remoteUrl" is the location of the Palindrom server. By convention, the server should respond with a Palindrom
    // session JSON object when request has a header "Accept: application/json". If the Palindrom server is located in
    // another location, provide the URL here. Make sure that this URL is always the same, however every request to
    // it creates a new Palindrom session, which individual URL is given in the "X-Location" header of the response
    // to "remoteUrl"
    remoteUrl: window.location.href,
    onStateReset: onConnect,
    debug: false,
    localVersionPath: "/_ver#c$",
    remoteVersionPath: "/_ver#s",
    ot: true,
    useWebSocket: false // with not simulated server, change this to true
  });
}

export default {
  name: "app",
  components: {
    HelloWorld
  },
  methods: {
    onConnect(obj) {
      // use Palindrom's data object in the "App" component's data
      this.palindromObj = obj;
    }
  },
  created() {
    // when an instance of the "App" component is created, request Palindrom connection and provide a callback
    connectToPalindrom(this.onConnect);
  },
  data: function() {
    return {
      palindromObj: null
    };
  }
}
</script>
