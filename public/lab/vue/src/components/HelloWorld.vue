<template>
  <div>
    <div id="brand">
      <div class="float">
        <img alt="Palindrom + Vue" title="Palindrom and Vue logos" src="../assets/logo.png" />
      </div>
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
            <a href="index.html"><!-- these links are intercepted by Palindrom, see: -https://palindrom.github.io/docs/05-_Navigation_Interception/ -->
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
            <em>{{value.user.fullName}}</em>!
          </h4>

          <p>
            <label>First Name</label>
            <input type="text" v-model="value.user.firstName$" />
          </p>

          <p>
            <label>Last Name</label>
            <input type="text" v-model="value.user.lastName$" />
          </p>

          <button v-on:click="value.user.resetNameClicked$ = true">Replace with Newton!</button>
        </div>
      </section>
    </article>
    <palindrom-bunny class="bunny-animation">
      <img src="../../../polymer/bower_components/palindrom-bunny/src/puppet.png" />
    </palindrom-bunny>
    <footer>
      Bunny photo credit:
      <a href="https://www.flickr.com/photos/mujitra/4422575066">MIKI Yoshihito</a> (CC BY 2.0)
    </footer>
  </div>
</template>

<script>
import "palindrom-bunny";

export default {
  name: "HelloWorld",
  props: {
    value: Object // the name of the prop must be "value" to work with v-model in the parent component
  }
};
</script>

<style>
@import "../assets/style.css";
</style>