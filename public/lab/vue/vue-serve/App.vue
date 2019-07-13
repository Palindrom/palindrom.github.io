
<script src="../../mock-server/dist/mock-server.js"></script>

<template>
  <div>
    <div v-if="obj">
      <div id="brand">
        <div class="float"><img alt="Palindrom + Vue" title="Palindrom and Vue logos" src="../css/logo.png"></div>
        <div class="float">
            <h1>Palindrom + Vue</h1>
        </div>
        <div style="clear: both"></div>
    </div>

    <h3>This demo shows usage with Vue's two-way binding</h3>

    <article>
      <section>
        <h2>Capturing Links</h2>

        <p>Clicking one of the links actually sends a PATCH</p>
        <ul>
          <li>
            <a href="index.html">
              Albert
              <strong>Einstein</strong>
            </a> (index.html)
          </li>
          <li>
            <a href="subpage.html">
              Nikola
              <strong>Tesla</strong>
            </a> (subpage.html)
          </li>
        </ul>
      </section>
      <section>
        <h2>Capturing input</h2>

        <div>
          <h4>
            Welcome
            <em>{{obj.user.fullName}}</em>!
          </h4>

          <p>
            <label>First Name</label>
            <some-guy v-model="obj.user.firstName$"></some-guy>
          </p>

          <p>
            <label>Last Name</label>
            <input type="text" v-model="obj.user.lastName$" />
          </p>

          <button v-on:click="obj.user.resetNameClicked$ = true">Replace with Newton!</button>
        </div>
      </section>
      </article>
    <palindrom-bunny class="bunny-animation">
        <img src="../../polymer/bower_components/palindrom-bunny/src/puppet.png">
    </palindrom-bunny>
    <footer>Bunny photo credit: <a href="https://www.flickr.com/photos/mujitra/4422575066">MIKI Yoshihito</a> (CC BY 2.0)
    </footer>
    </div>
  </div>
</template>

<script>
//the below line is only needed to simulate the server
import "../../mock-server/src/mock-server.js";

import { PalindromDOM } from "./node_modules/palindrom/src/palindrom-dom.js";
import SomeGuy from "./FancyInput.vue";
import "../../polymer/bower_components/palindrom-bunny/palindrom-bunny.js";

function connectToPalindrom(onConnect) {
  var palindrom = new PalindromDOM({
    remoteUrl: window.location.href,
    onStateReset: onConnect,
    debug: false,
    localVersionPath: "/_ver#c$",
    remoteVersionPath: "/_ver#s",
    ot: true,
    useWebSocket: false //with not simulated server, change this to true
  });
}

export default {
  components: {
    SomeGuy
  },
  ignoredElements: ['palindrom-bunny'],
  methods: {
    onConnect(obj) {
      this.obj = obj;
    }
  },
  created() {
    connectToPalindrom(this.onConnect);
  },
  data: function() {
    return {
      obj: null
    };
  }
};
</script>

<style>
@import "../../assets/style.css";
</style>
