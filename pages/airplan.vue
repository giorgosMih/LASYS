<template>
	<v-container fluid>
		
		<v-card class="d-inline-flex airplane" elevation="5">
				<v-card-text>
					<v-row v-for="n of seatNumbers" :style="est(n)">
						<v-btn class="free" small fab>{{(n).toString().padStart(2,'0')}}A</v-btn>
						<v-btn class="free" small fab>{{(n).toString().padStart(2,'0')}}B</v-btn>
						<v-btn disabled small fab>{{(n).toString().padStart(2,'0')}}C</v-btn>
						<div style="width: 54px"></div>
						<v-btn class="free" small fab>{{(n).toString().padStart(2,'0')}}D</v-btn>
						<v-btn class="free" small fab>{{(n).toString().padStart(2,'0')}}E</v-btn>
						<v-btn class="blocked" small fab>{{(n).toString().padStart(2,'0')}}F</v-btn>
					</v-row>
				</v-card-text>
			</v-card>

			<v-btn></v-btn>

	</v-container>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		computed:{
			seatNumbers(){
				var nums = [];
				for(var i=1;i<=34;i++)
					nums.push(i);

				return nums;
			}
		},
		methods:{
			est(n){
				if([3,15].includes(n))
					return 'margin-bottom: 30px';
			}
		}
	}
</script>

<style scoped>
	.v-btn {
		margin-bottom: 5px;
		margin-right: 5px;
	}
	.airplane{
		width: 443px!important; 
		min-width: 443px!important; 
		border-radius: 400px 400px 300px 300px!important; 
		border: 5px solid gray!important; 
		padding: 50px!important;
	}
	.free{
		background-color: #4caf50!important;
		color: white!important;
	}
	.checked-in{
		background-color: gray!important;
		color: white!important;
	}
	.blocked{
		background-color: red!important;
		color: white!important;
		pointer-events: none;
	}
</style>