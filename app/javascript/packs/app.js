import Vue from 'vue';

const Api = require('./api');

document.addEventListener("DOMContentLoaded", () => {
	let app = new Vue({
		el: '#app',
		components: {
			'task': {
				props: ['task'],
				template: `
					<div class="ui cards" v-bind:class="task.completed ? 'done' : 'todo'">
					  	<div class="card">
						    <div class="content">
						    	<img class="right floated mini ui">
						      	<div class="header">
						        	{{ task.name }}
						      	</div>
						      	<div class="description">
						      		<input type="checkbox" name="task" v-on:click="$parent.toggleDone($event, task.id)" :checked="task.completed">
						        	<label>{{ task.description }}</label>
						      	</div>
						    </div>
						    <div class="extra content">
						      	<div class="ui two buttons">
		        					<div class="ui basic blue button" v-on:click="$parent.editTask($event, task.id)">
		        						<i alt="Edit" class="icon pencil blue"></i>Edit
		        					</div>
		        					<div class="ui basic red button" v-on:click="$parent.deleteTask($event, task.id)">
		        						<i alt="Delete" class="icon trash red"></i>Delete
		        					</div>
						      	</div>
						    </div>
					  	</div>
					</div>
				`
			}
		},
		data: {
			tasks: [],
			task: {},
			message: '',
			action: 'create'
		},
		computed: {
			todoTasks: function() {
				return this.tasks.filter(item => item.completed == false);
			},
			completedTasks: function() {
				return this.tasks.filter(item => item.completed == true);
			},
			nextId: function() {
				return (this.tasks.sort(function(a, b){ return a.id-b.id; }))
				[this.tasks.length-1].id+1;
			}
		},
		methods: {
			listTasks: function() {
				Api.listTasks().then(function(response) {
					app.tasks = response;
				}) 
			},
			clear: function() {
				this.task = {};
				this.action = 'create';
				this.message = '';
			},
			toggleDone: function(event, id) {
				event.stopImmediatePropagation();
				let task = this.tasks.find(item => item.id == id);
				if(task) {
					task.completed = !task.completed;
					this.task = task;
					Api.updateTask(this.task).then(function(response) {
						app.listTasks();
						app.clear();
						let status = response.completed ? 'completed' : 'in progress';
						app.message = `Task ${response.id} is ${status}.`;
					})
				}
			},
			createTask: function(event) {
				// event.preventDefault();
				if(!this.task.completed) {
					this.task.completed = false;
				}
				else {
					this.task.completed = true;
				}
				Api.createTask(this.task).then(function(response) {
					app.listTasks();
					app.clear();
					app.message = `Task ${response.id} created.`;
				})
			},
			editTask: function(event, id) {
				event.stopImmediatePropagation();
				this.action = 'edit';
				let task = this.tasks.find(item => item.id == id);
				if(task) {
					this.task = {
						id: id,
						name: task.name,
						description: task.description,
						completed: task.completed
					};
				}
			},
			updateTask: function(event, id) {
				event.stopImmediatePropagation();
				// event.preventDefault();
				Api.updateTask(this.task).then(function(response) {
					app.listTasks();
					app.clear();
					app.message = `Task ${response.id} updated.`;
				})
			},
			deleteTask: function(event, id) {
				event.stopImmediatePropagation();
				let taskIndex = this.tasks.findIndex(item => item.id == id);
				if(taskIndex > -1) {
					Api.deleteTask(id).then(function(response) {
						app.$delete(app.tasks, taskIndex);
						app.message = `Task ${id} deleted.`;
					});
				}
			}
		},
		beforeMount() {
			this.listTasks()
		}
	})
});