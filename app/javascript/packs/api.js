import axios from 'axios';

export function listTasks() {
	return axios.get('/tasks.json').then(function(response) {
		return response.data;
	})
}

// listTasks().then(function(response) {
// 	console.log(response);
// });