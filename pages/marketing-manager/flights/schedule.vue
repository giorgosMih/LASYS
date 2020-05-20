<template>
	<v-container>
		<v-flex>
			<v-btn :disabled="currentType==0" fab text small color="grey darken-2" @click="currentType--">
				<v-icon small>mdi-arrow-collapse-up</v-icon>
			</v-btn>
			<v-btn fab text small color="grey darken-2" @click="prev">
				<v-icon small>mdi-chevron-left</v-icon>
			</v-btn>
			<v-btn fab text small color="grey darken-2" @click="next">
				<v-icon small>mdi-chevron-right</v-icon>
			</v-btn>
			<v-btn :disabled="currentType==2" fab text small color="grey darken-2" @click="currentType++">
				<v-icon small>mdi-arrow-collapse-down</v-icon>
			</v-btn>
		</v-flex>
		<v-sheet>
		<v-calendar
		ref="calendar"
		v-model="focus"
		color="primary"
		:events="events"
		:event-color="getEventColor"
		:now="today"
		:type="type"
		@click:event="showEvent"
		@click:date="(currentType<2) ? currentType++ : ''"
		@update="updateRange"
		></v-calendar>

		<v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
		</v-sheet>
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
				selectedOpen: false,
				selectedElement: null,
				selectedEvent: {},
				focus: null,
				start: null,
				end: null,
				currentType: 1,
				typeFlow: ['month','week','day'],
				events: [
				{
					name: 'A0122',
					flightNumber: 'A0122',
					aircraftType: '737',
					start: '2020-05-15 08:10',
					end: '2020-05-15 13:05',
					color: 'green'
				},
				{
					name: 'A0100',
					flightNumber: 'A0100',
					aircraftType: '737',
					start: '2020-05-15 13:20',
					end: '2020-05-15 15:45',
					color: 'orange'
				},
				{
					name: 'R0100',
					flightNumber: 'R0100',
					aircraftType: '757',
					start: '2020-05-15 13:20',
					end: '2020-05-15 20:45',
					color: 'cyan'
				},
				{
					name: 'A0101',
					flightNumber: 'A0101',
					aircraftType: '757',
					start: '2020-05-15 23:40',
					end: '2020-05-16 01:20',
					color: 'orange'
				}
				]
			}
		},
		computed:{
			type(){
				return this.typeFlow[this.currentType];
			},
			monthFormatter () {
				return this.$refs.calendar.getFormatter({
					timeZone: 'UTC', month: 'long',
				})
			},
			today(){
				const d = new Date();
				return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
			}
		},
		methods:{
			prev () {
				this.$refs.calendar.prev()
			},
			next () {
				this.$refs.calendar.next()
			},
			nth (d) {
				return d > 3 && d < 21
				? 'th'
				: ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
			},
			getEventColor (event) {
				return event.color;
			},
			getDate(dateString){
				const date = new Date(dateString);
				return `${date.getDate().toString().padStart(2,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getFullYear()}`;
			},
			getTime(dateString){
				const date = new Date(dateString);
				return `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
			},
			showEvent ({ nativeEvent, event }) {
				const open = () => {
					this.selectedEvent = event
					this.selectedElement = nativeEvent.target
					setTimeout(() => this.selectedOpen = true, 10)
				}

				if (this.selectedOpen) {
					this.selectedOpen = false
					setTimeout(open, 10)
				} else {
					open()
				}

				nativeEvent.stopPropagation()
			},
			updateRange ({ start, end }) {
				console.log(start)
				console.log(end)
			},
		}
	}
</script>