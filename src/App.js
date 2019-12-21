import React, {Component} from 'react';
import Alarms from './components/Alarms';

class App extends Component {
	constructor(props) {
		super(props);

		this.updateAlarm = this.updateAlarm.bind(this)
		
		this.state = {
			loading: true,
			alarms: null,
		};
	}

	async componentDidMount() {
		await this.getAllAlarms();
	}

	async getAlarmById(id) {
		console.log(this.state);
		const url = `http://localhost:3001/api/v1/alarm/${id}`;
		const response = await fetch(url);
		const data = await response.json();

		return response.ok ? data : null;
	}

	async removeAlarm(id) {
		const url = `http://localhost:3001/api/v1/alarm/${id}`;
		const opts = {method: 'DELETE'};
		const response = await fetch(url, opts);

		return response.ok;
	}

	async addAlarm(alarm) {
		const url = `http://localhost:3001/api/v1/alarms`;
		const opts = {method: 'POST', body: JSON.stringify(alarm)};

		const response = await fetch(url, opts);
		const data = await response.json();

		return response.ok ? data : null;
	}

	async updateAlarm(alarm) {
		const url = `http://localhost:3001/api/v1/alarm/${alarm._id}`;
		const opts = {
			method: 'PUT',
			body: JSON.stringify(alarm),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log(opts);
		const response = await fetch(url, opts);
		const data = await response.json();

		this.getAllAlarms();
		return response.ok ? data : null;
	}

	async getAllAlarms() {
		const url = 'http://localhost:3001/api/v1/alarms';
		const response = await fetch(url);
		const data = await response.json();

		this.setState({
			loading: false,
			alarms: data.alarms,
		});
	}

	render() {
		return (
			<div className="container">
				{this.state.loading ? (
					<h3>Loading ... </h3>
				) : (
					<Alarms
						alarms={this.state.alarms}
						removeAlarm={this.removeAlarm}
						getAlarm={this.getAlarmById}
						addAlarm={this.addAlarm}
						updateAlarm={this.updateAlarm}
						pushChanges={alarms => {
							this.setState({alarms: alarms});
						}}
					/>
				)}
			</div>
		);
	}
}

export default App;
