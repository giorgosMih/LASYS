<template>
	<v-container>
		
		<v-row v-if="!flightsLoading">
			<v-col v-for="(f, k) of flights" :key="k" cols="12" md="6">
				<Flight :id="f.id" :legs="f.flightLegs" />
			</v-col>
		</v-row>

		<v-row v-else justify="center" align="center">
			<v-progress-circular
      		:size="50"
      		color="primary"
      		indeterminate
    		></v-progress-circular>
		</v-row>

		<v-pagination
		v-if="pages > 1"
      v-model="currentPage"
      :length="pages"
    	></v-pagination>

		<v-btn
			color="success"
			fab
			@click="dialogAddFlight=true"
			dark
			small
			fixed
			bottom
			right
		>
			<v-icon>mdi-plus</v-icon>
		</v-btn>

		<!-- Add Flight Dialog -->
		<v-dialog
      	v-model="dialogAddFlight"
    	>
      	<v-card>
      		<v-card-title>Add new flight</v-card-title>
      		<v-card-text>
      			<v-form @submit="submitFormNewFlight" id="formNewFlight" ref="formNewFlight">
      				<v-row>
      					<v-col>
      						<v-autocomplete
        							v-model="newFlight.originAirportID"
        							:items="airports"
        							hide-selected
        							item-value="id"
        							label="Origin Airport"
        							outlined
        							:rules="[rules.required, rules.originNeqDestination]"
        							dense
        							:filter="airportsFilter"
      						>
      							<template v-slot:item="{item}">
      								<strong>{{item.IATACode}}:</strong> {{item.name}} ({{item.type.name}} Airport)
      							</template>
      							<template v-slot:selection="{item}">
      								<strong>{{item.IATACode}}:</strong>{{item.name}} ({{item.type.name}})
      							</template>
      						</v-autocomplete>
      					</v-col>

      					<v-col>
      						<v-autocomplete
        							v-model="newFlight.destinationAirportID"
        							:items="airports"
        							hide-selected
        							item-value="id"
        							label="Destination Airport"
        							outlined
        							:rules="[rules.required, rules.originNeqDestination]"
        							dense
        							:filter="airportsFilter"
      						>
      							<template v-slot:item="{item}">
      								<strong>{{item.IATACode}}:</strong> {{item.name}} ({{item.type.name}} Airport)
      							</template>
      							<template v-slot:selection="{item}">
      								<strong>{{item.IATACode}}:</strong>{{item.name}} ({{item.type.name}})
      							</template>
      						</v-autocomplete>
      					</v-col>
      				</v-row>

      				<v-row>
      					<v-col>
      						<v-menu
        							v-model="showDepartureDate"
        							:close-on-content-click="false"
        							:nudge-right="40"
        							transition="scale-transition"
        							offset-y
        							min-width="290px"
      						>
        							<template v-slot:activator="{ on }">
          							<v-text-field
            							v-model="newFlight.departureDate"
            							label="Departure Date"
            							prepend-icon="mdi-airplane-takeoff"
            							readonly
            							dense
            							outlined
            							:rules="[rules.required, rules.departureCheckForArrival]"
            							v-on="on"
          							></v-text-field>
        							</template>
        							<v-date-picker 
        								v-model="newFlight.departureDate" 
        								@input="showDepartureDate = false"
        							></v-date-picker>
      						</v-menu>
      					</v-col>
      					
      					<v-col>
      						<v-menu
        							v-model="showArrivalDate"
        							:close-on-content-click="false"
        							:nudge-right="40"
        							transition="scale-transition"
        							offset-y
        							min-width="290px"
      						>
        							<template v-slot:activator="{ on }">
          							<v-text-field
            							v-model="newFlight.arrivalDate"
            							label="Arrival Date"
            							prepend-icon="mdi-airplane-landing"
            							readonly
            							dense
            							outlined
            							:rules="[rules.required, rules.arrivalCheckForDeparture]"
            							v-on="on"
          							></v-text-field>
        							</template>
        							<v-date-picker 
        								v-model="newFlight.arrivalDate" 
        								@input="showArrivalDate = false"
        							></v-date-picker>
      						</v-menu>
      					</v-col>
      				</v-row>

      				<v-row>
      					<v-col>
      						<v-menu
      							ref="menuDepartureTime"
        							v-model="showDepartureTime"
        							:close-on-content-click="false"
        							:return-value.sync="newFlight.departureTime"
        							:nudge-right="40"
        							transition="scale-transition"
        							offset-y
        							min-width="290px"
      						>
        							<template v-slot:activator="{ on }">
          							<v-text-field
            							v-model="newFlight.departureTime"
            							label="Departure Time"
            							prepend-icon="mdi-airplane-takeoff"
            							readonly
            							dense
            							outlined
            							:rules="[rules.required]"
            							v-on="on"
          							></v-text-field>
        							</template>
        							<v-time-picker 
        								v-model="newFlight.departureTime"
        							>
        								<v-spacer></v-spacer>
          							<v-btn text color="primary" @click="showDepartureTime = false">Cancel</v-btn>
          							<v-btn text color="primary" @click="$refs.menuDepartureTime.save(newFlight.departureTime)">OK</v-btn>
        							</v-time-picker>
      						</v-menu>
      					</v-col>
      					
      					<v-col>
      						<v-menu
        							v-model="showArrivalDate"
        							:close-on-content-click="false"
        							:nudge-right="40"
        							transition="scale-transition"
        							offset-y
        							min-width="290px"
      						>
        							<template v-slot:activator="{ on }">
          							<v-text-field
            							v-model="newFlight.arrivalDate"
            							label="Arrival Date"
            							prepend-icon="mdi-airplane-landing"
            							readonly
            							dense
            							outlined
            							:rules="[rules.required, rules.arrivalCheckForDeparture]"
            							v-on="on"
          							></v-text-field>
        							</template>
        							<v-date-picker 
        								v-model="newFlight.arrivalDate" 
        								@input="showArrivalDate = false"
        							></v-date-picker>
      						</v-menu>
      					</v-col>
      				</v-row>

      				<v-row>
      					<v-col>
      						<v-text-field
            					v-model="newFlight.gate"
            					label="Gate"
            					prepend-icon="mdi-gate"
            					dense
            					outlined
            					:rules="[rules.required]"
          					></v-text-field>
      					</v-col>
      				</v-row>
      			</v-form>
      		</v-card-text>
      		<v-card-actions>
      			<v-spacer></v-spacer>
      			<v-btn 
      				color="error"
      				small
      				@click="dialogAddFlight=false"
      			>
      				Cancel
      			</v-btn>

      			<v-btn 
      				color="success"
      				small
      				type="submit"
      				form="formNewFlight"
      			>
      				Add
      			</v-btn>
      		</v-card-actions>
      	</v-card>
    	</v-dialog>
		<!-- /Add Flight Dialog -->
	</v-container>
</template>

<script>
	import Flight from '~/components/Flight.vue';
	export default{
		components:{
			Flight
		},
		data(){
			return{
				flights:[],
				flightsLoading:false,
				flightsCount:0,
				currentPage: 1,
				perPage: 6,
				dialogAddFlight: false,
				showDepartureDate: false,
				showDepartureTime: false,
				showArrivalDate: false,
				airports: [],
				airportsFilter: function(item, queryText, itemText){
					return ((item.IATACode).toLowerCase()).startsWith(queryText.toLowerCase()) ||
					((item.name).toLowerCase()).includes(queryText.toLowerCase()) ||
					((item.type.name).toLowerCase()).includes(queryText.toLowerCase())
				},
				rules: {
					required: v=>!!v || 'This field is required.',
					originNeqDestination: v=>{
						if(v){
							return !!(this.newFlight.originAirportID != this.newFlight.destinationAirportID) || 'Origin & Destination airports must be different.';
						}
						else{
							return true;
						}
					},
					departureCheckForArrival: v=>{
						if(v && this.newFlight.arrivalDate){
							return !!(v <= this.newFlight.arrivalDate ) || 'Departure date must be less than or equal to Arrival date.';
						}
						else{
							return true;
						}
					},
					arrivalCheckForDeparture: v=>{
						if(v && this.newFlight.departureDate){
							return !!(v >= this.newFlight.departureDate ) || 'Arrival date must be greater than or equal to Departure date.';
						}
						else{
							return true;
						}
					},
				},
				newFlight: {
					originAirportID: null,
					destinationAirportID: null,
					departureDate: null,
					departureTime: null,
					arrivalDate: null,
					arrivalTime: null,
					gate: null,
				},
			}
		},
		computed:{
			pages(){
				return Math.ceil(this.flightsCount / this.perPage);
			},
		},
		watch:{
			dialogAddFlight(newV){
				if(!newV){
					this.newFlight = {
						originAirportID: null,
						destinationAirportID: null,
						departureDate: null,
						departureTime: null,
						arrivalDate: null,
						arrivalTime: null,
						gate: null,
					};
				}
			},
			currentPage(){
				this.fetchFlights();
			},
		},
		created(){
			this.fetchFlights();
			this.fetchFlightsCount();
			this.fetchAirports();
		},
		methods: {
			async fetchFlightsCount(){
				var {data} = await this.$axios.get(`Flights/count`);
				this.flightsCount = data.count;
			},
			async fetchFlights(){
				this.flightsLoading = true;
				var filter = {
					"include": [{"flightLegs":["origin","destination","aircraft"]}, {"classCosts":["class"]}],
					limit: this.perPage,
					skip: ((this.currentPage-1)*this.perPage)
				};
				filter = encodeURIComponent(JSON.stringify(filter));
				
				try {
					var {data} = await this.$axios.get(`Flights?filter=${filter}`);
					this.flights = data;
					console.log(data)
				} catch(e) {
					console.log(e);
				} finally {
					this.flightsLoading = false;
				}
			},
			async fetchAirports(){
				var filter = {
					include: 'type'
				};
				filter = encodeURIComponent(JSON.stringify(filter));

				var {data} = await this.$axios.get(`Airports?filter=${filter}`);
				this.airports = data;
			},
			async submitFormNewFlight(e){
				e.preventDefault();

				var valid = this.$refs.formNewFlight.validate();
				if(valid){


					this.dialogAddFlight = false;
				}
			}
		}
	}
</script>