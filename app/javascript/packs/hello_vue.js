/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'

var vm = new Vue({
  el: '#tasks-index',
  data: {
    tasks: [
      { id: 1, name: 'Studying JavaScript', isDeleted: false },
      { id: 2, name: 'Studying PHP', isDeleted: false },
      { id: 3, name: 'Studying Ruby', isDeleted: false },
    ],
    newTask: '',
  },
  methods: {
    createTask: function(event){  
      var new_id = this.tasks[this.tasks.length - 1].id + 1
      if (this.newTask !== '') {
        this.tasks.push({ id: new_id, name: this.newTask, isDeleted: false});
      }
      this.newTask = '';
    },
    doneTask: function(task_id){
      this.tasks.forEach(function(task){
        if (task.id === task_id) {
          return task.isDeleted = true;
        }
      })
    }
  }
})


// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks';
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
