<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			mobile-break-point="800"
			:clipped="clipped"
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			:clipped-left="clipped"
			fixed
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer">
				<v-icon>mdi-menu{{ (!drawer)? '-open':'' }}</v-icon>
			</v-app-bar-nav-icon>
			<v-icon>mdi-airport</v-icon>
			<v-toolbar-title v-text="title"/>
			<v-spacer />
			<v-btn
				icon
			>
				<v-icon>mdi-power</v-icon>
			</v-btn>
		</v-app-bar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-footer
			:fixed="fixed"
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data () {
		return {
			clipped: true,
			drawer: true,
			fixed: true,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/'
				},
				{
					icon: 'mdi-airplane',
					title: 'Flight Management',
					to: '/marketing-manager/flights'
				},
				{
					icon: 'mdi-calendar-month',
					title: 'Flight Schedule',
					to: '/marketing-manager/flights/schedule'
				},
				{
					icon: 'mdi-airplane',
					title: 'Aircraft Plan',
					to: '/airplan'
				}
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Lakeland Airways'
		}
	}
}
</script>
