<template>
  <div>
    <!-- 新規作成部分 -->
    <div class="row">
      <div class="col s10 m11">
        <input v-model="newTask" class="form-control" placeholder="Add your task!">
      </div>
      <div class="col s2 m1">
        <div v-on:click="createTask" class="btn-floating waves-effect waves-light">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>
    <!-- リスト表示部分 -->
    <div id="todo-tasks">
      <ul class="collection">       
        <li v-for="task in tasks" v-bind:key=task.id v-if="!task.is_done" v-bind:id="'row_task_' + task.id" class="collection-item">
          <label>
            <input type="checkbox" v-on:change="doneTask(task.id)" v-bind:id="'task_' + task.id">
            <span class="word-color-black">{{ task.name }}</span>
          </label>
        </li>
      </ul>
    </div>
    <!-- 完了済みタスク表示ボタン -->
    <div class="btn" v-on:click="displayFinishedTasks">Display finished tasks</div>
    <!-- 完了済みタスク一覧 -->
    <div id="finished-tasks" class="display_none">
      <ul class="collection">
        <li v-for="task in tasks" v-bind:key=task.id v-if="task.is_done" v-bind:id="'row_task_' + task.id" class="collection-item">
          <label>
            <input type="checkbox" v-on:change="restoreTask(task.id)" v-bind:id="'task_'+task.id" checked="checked">
            <span class="line-through">{{ task.name }}</span>
          </label>
          <button class="delete_btn btn" v-on:click="deleteTask(task.id)">DELETE</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data: function(){
      return {
        tasks: [],
        newTask: ''
      }
    },
    mounted: function(){
      this.fetchTask();
    },
    methods: {
      fetchTask: function(){
        axios.get('/api/tasks').then(
          (response) => {
            for(var i = 0; i < response.data.tasks.length; i++){
              this.tasks.push(response.data.tasks[i]);
            }
          }, (error) => {
            console.log(error);
        });
      },
      displayFinishedTasks: function(){
        document.querySelector('#finished-tasks').classList.toggle('display_none');
      },
      createTask: function(){
        if(!this.newTask) return;
        axios.post('/api/tasks', { task: { name: this.newTask } }).then(
          (response) => {
            this.tasks.unshift(response.data.task);
            this.newTask ='';
          }, (error) => {
            console.log(error);
          }
        );
      },
      doneTask: function(task_id){
        axios.put('/api/tasks/' + task_id, { task: { is_done: 1 } }).then((response) => {
          this.moveToFinishedTask(task_id);
        }, (error) => {
          console.log(error);
        });
      },
      moveToFinishedTask: function(task_id){
        var el = document.querySelector('#row_task_' + task_id);
        var el_clone = el.cloneNode(true);
        el.classList.add('display_none');

        var li = document.querySelector('#finished-tasks > ul > li:first-child');
        document.querySelector('#finished-tasks>ul').insertBefore(el_clone, li);

        el_clone.getElementsByTagName('input')[0].checked = 'checked';


        //v-on:change="restoreTask"追加 v-on:change="doneTask"削除
        // el_clone.getElementsByTagName('')[0]. //<btn></btn>追加


        el_clone.getElementsByTagName('span')[0].classList.add('line-through');
        el_clone.getElementsByTagName('span')[0].classList.remove('word-color-black');
      },
      restoreTask: function(task_id){
        axios.put('/api/tasks/' + task_id, { task: {is_done: 0} }).then((response)=>{
          this.moveToTodoTask(task_id);
        }, (error) => {
          console.log(error);
        });
      },
      moveToTodoTask: function(task_id){
        var el = document.querySelector('#row_task_'+ task_id);
        var el_clone = el.cloneNode(true);
        el.classList.add('display_none');

        var li = document.querySelector('#todo-tasks > ul > li:first-child');
        document.querySelector('#todo-tasks > ul').insertBefore(el_clone, li);


        //v-on:change="doneTask"追加v-on:change="restoreTask"削除
        // el_clone.getElementsByTagName('')[0]. //<btn></btn>削除


        el_clone.getElementsByTagName('span')[0].classList.remove('line-through');
        el_clone.getElementsByTagName('span')[0].classList.add('word-color-black');
      },
      deleteTask: function(task_id){
        axios.delete('/api/tasks/'+ task_id).then((response) =>{
          var el = document.querySelector('#row_task_'+ task_id);
          el.classList.add('display_none');
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  .display_none {
    display: none;
  }

  .line-through {
    text-decoration: line-through;
  }

  .word-color-black {
    color:black;
  }
  .delete_btn {
    float: right;
    background-color: red;
  }
</style>


