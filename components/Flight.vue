<template>

	<v-card v-if="legs.length <= 1">
		<v-card-title>
			{{firstLeg.origin.name}} ({{firstLeg.origin.IATACode}})
			<v-spacer/>
			<v-icon>mdi-arrow-right-thick</v-icon>
			<v-spacer/>
			{{lastLeg.destination.name}} ({{lastLeg.destination.IATACode}})
		</v-card-title>
		<v-card-text>
			{{travelLength}}<br/>
			Departure Date: {{firstLeg.departureDate}}<br/>
			Arrival Date: {{lastLeg.arrivalDate}}
		</v-card-text>
	</v-card>

	<v-expansion-panels v-else>
    	<v-expansion-panel>
      		<v-expansion-panel-header>
      			<v-card elevation="0">
					<v-card-title>
						{{firstLeg.origin.name}} ({{firstLeg.origin.IATACode}})
						<v-spacer/>
						<v-icon>mdi-arrow-right-thick</v-icon>
						<v-spacer/>
						{{lastLeg.destination.name}} ({{lastLeg.destination.IATACode}})
					</v-card-title>
					<v-card-text>
						{{travelLength}}<br/>
						Departure Date: {{firstLeg.departureDate}}<br/>
						Arrival Date: {{lastLeg.arrivalDate}}
					</v-card-text>
				</v-card>
      		</v-expansion-panel-header>
      		<v-expansion-panel-content>

				<v-card v-for="(l, k) of legs" :key="k" elevation="5" class="my-2">
					<v-card-title>
						{{l.origin.name}} ({{l.origin.IATACode}})
						<v-spacer/>
						<v-icon>mdi-arrow-right-thick</v-icon>
						<v-spacer/>
						{{l.destination.name}} ({{l.destination.IATACode}})
					</v-card-title>
					<v-card-text>
						<div class="d-flex flex-column">
							{{l.flightNumber}}
						</div>
						<div class="d-flex justify-space-between">
							<div class="flex-column">{{l.departureDate}}</div>
							<div class="flex-column">{{l.arrivalDate}}</div>
						</div>
					</v-card-text>
				</v-card>

      		</v-expansion-panel-content>
    	</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
	export default{
		props:{
			id:{
				type: Number,
				required: true
			},
			legs:{
				type: Array,
				required: true
			}
		},
		computed:{
			travelLength(){
				const l = this.legs.length;
				if(l == 1)
					return 'Direct Flight';
				else if(l == 2)
					return `Multi-Leg Flight (1 stop)`;
				else if(l > 2)
					return `Multi-Leg Flight (${l-1} stops)`;
			},
			firstLeg(){
				if(this.legs && this.legs.length)
					return this.legs[0];
				else
					return null;
			},
			lastLeg(){
				if(this.legs && this.legs.length)
					return this.legs[this.legs.length-1];
				else
					return null;
			}
		},
	}
</script>

<style scoped>
	button.v-expansion-panel-header{
		padding:0!important;
	}
</style>