<!DOCTYPE html>
<html lang="en">
    <head>
    	<meta charset="utf-8">
    	<title>Mytest</title>
    	
		<style>
			.is-Loading{
				color: red;
			}
		</style>

    </head>
    <body>
		<div id="root" >
			<h2>All</h2>
			<ul>
				<li v-for="task in tasks" v-text="task.description"></li>
			</ul>

			<h2>Not complete</h2>
			<ul>
				<li v-for="task in incompleteTask" v-text="task.description" ></li>
			</ul>
		</div>
		

		<script src="https://unpkg.com/vue@2.1.8/dist/vue.js"></script>

		<script>
			var app = new Vue({
				el: "#root",

				data: {
					tasks: [
						{ description: 'asdf', completed: false},
						{ description: 'a2', completed: true},
						{ description: 'as3', completed: false},
						{ description: 'asd4', completed: true},
					]
				},

				methods: {

				},

				computed: {
					incompleteTask(){
						return this.tasks.filter(task => ! task.completed);
					}
				}
			
				
			})
		</script>
    </body>
</html>
