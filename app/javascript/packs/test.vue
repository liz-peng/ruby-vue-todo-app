<template>
	<div v-bind:class="task.completed ? 'done' : 'todo'">
		<div class="card">
			<div class="content">
				<div class="header">
					{{ task.name }}
				</div>
				<div class="description">
					<input type="checkbox" name="task" @click="toggleDone" :checked="task.completed">
					<label>{{ task.description }}</label>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      // task: {
	     //  name: "Test 1",
	     //  description: "Test 1",
	     //  completed: true
      // }
      task: [
      	{name: "Test 1", description:"Test 1", completed: true}, 
      	{name: "Test 2", description:"Test 2", completed: true}
      ]
    }
	},
	methods: {
	  toggleDone() {
			this.task.completed = !this.task.completed;
		}
	}
}
</script>