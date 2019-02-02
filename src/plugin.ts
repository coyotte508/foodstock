export default {
  install(Vue, options) {
  // 1. add global method or property
    // Vue.myGlobalMethod = function() {
    //   // some logic ...
    // };

    // 2. add a global asset
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // some logic ...
    //   }
    //   ...
    // })

    // 3. inject some component options
    // Vue.mixin({
    //   created: function () {
    //     // some logic ...
    //   }
    //   ...
    // })

    // 4. add an instance method
    Object.defineProperty(Vue.prototype, "$game", {
      get() {
        return this.$store.state.foodstock.game;
      }
    });
    Object.defineProperty(Vue.prototype, "$context", {
      get() {
        return this.$store.state.foodstock.context;
      }
    });
  }
};
