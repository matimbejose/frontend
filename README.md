# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

"no-unused-vars": "off"    add to islint rules  rule to disable   79:15  error  'r' is assigned a value but never used  no-unused-vars 


Input Mask

https://primefaces.org/primevue/showcase/#/inputmask

modify data() parent variables from child
// Child.js
Vue.component('child', {
  methods: {
    notifyParent: function() {
      this.$emit('my-event', 42);
    }
  }
});

// Parent.js
Vue.component('parent', {
  template: '<child v-on:my-event="onEvent($event)"></child>',
  methods: {
    onEvent: function(ev) {
      v; // 42
    }
  }
});