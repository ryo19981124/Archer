//
//  App
//  Project
//
//  Created by Supernova.
//  Copyright © 2018 Supernova. All rights reserved.
//

import React from "react"
import { createStackNavigator } from "react-navigation"
import IPhoneXS from "./App/IPhoneXS/IPhoneXS"
import IPhoneXSTwo from "./App/IPhoneXSTwo/IPhoneXSTwo"
import { Font } from "expo"
import I18n from "i18n-js"
import { DangerZone } from "expo"

const PushRouteOne = createStackNavigator({
	IPhoneXS: {
		screen: IPhoneXS
	}
}, {
	initialRouteName: "IPhoneXS"
})

const RootStack = createStackNavigator({
	PushRouteOne: {
		screen: PushRouteOne
	}
}, {
	mode: "modal",
	headerMode: "none",
	initialRouteName: "PushRouteOne"
})


export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			fontsReady: false,
			localeReady: false
		}
	}


	async initProjectFonts() {

		// Any additional project fonts can be fetched here.
		await Font.loadAsync({ '.AppleSystemUIFont': require('./assets/fonts/SFNSText.ttf') })
		this.setState({
			fontsReady: true
		})
	}

	async initLocale() {

		I18n.locale = await DangerZone.Localization.getCurrentLocaleAsync()
		this.setState({
			localeReady: true
		})
	}

	componentDidMount() {

		this.initProjectFonts()
		this.initLocale()
		
		// If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	}

	render() {

		if (!this.state.fontsReady || !this.state.localeReady) { return (<Expo.AppLoading/>); }
		return (
			<RootStack />
		)
	}
}
