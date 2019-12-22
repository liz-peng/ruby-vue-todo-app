<template>
	<div>
		<div v-for="task in tasks" class="ui cards" v-bind:class="task.completed ? 'done' : 'todo'">
			<div class="card">
				<div class="content">
					<img class="right floated mini ui">
					<div class="header">
						{{ task.name }}
					</div>
					<div class="description">
						<input type="checkbox" name="task" v-on:click="toggleDone($event, task)" :checked="task.completed">
						<label>{{ task.description }}</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      tasks: [
      	{ name: "test1", description: "Test 1", completed: true }, 
      	{ name: "test2", description: "Test 2", completed: true }
      ]
    }
	},
	methods: {
	  toggleDone (event, task) {
			task.completed = !task.completed;
		}
	}
}
</script>