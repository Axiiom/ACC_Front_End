import React, {Component} from 'react';
import Alarms from './components/Alarms';

class App extends Component {
	constructor(props) {
		super(props);

		this.updateAlarm = this.updateAlarm.bind(this);

		this.state = {
			alarms: [],
			loading: true,
		};
	}

	async componentDidMount() {
		await this.getAllAlarms();
	}

	async getAlarmById(id) {
		const url = `http://192.168.1.3:3001/api/v1/alarm/${id}`;
		const response = await fetch(url);
		const data = await response.json();

		return response.ok ? data : null;
	}

	async removeAlarm(id) {
		const url = `http://192.168.1.3:3001/api/v1/alarm/${id}`;
		const opts = {method: 'DELETE'};
		const response = await fetch(url, opts);

		return response.ok;
	}

	async addAlarm(alarm) {
		const url = `http://192.168.1.3:3001/api/v1/alarms`;
		const opts = {
			method: 'POST',
			body: JSON.stringify(alarm),
			headers: {
				'Content-Type': 'application/json',
			},
			// headers: {
			// 	'Access-Control-Allow-Origin': '*',
			// },
		};

		const response = await fetch(url, opts);
		const data = await response.json();

		return data;
	}

	async updateAlarm(alarm) {
		const url = `http://192.168.1.3:3001/api/v1/alarm/${alarm._id}`;
		const opts = {
			method: 'PUT',
			body: JSON.stringify(alarm),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(url, opts);
		const data = await response.json();

		return response.ok ? data : null;
	}

	async getAllAlarms() {
		this.setState({
			loading: true,
		});

		const url = 'http://192.168.1.3:3001/api/v1/alarms';
		const response = await fetch(url);
		const data = await response.json();

		this.setState({
			loading: false,
			alarms: data.alarms,
		});
	}

	render() {
		return (
			<div className="container-fluid col-mgn">
				{this.state.loading ? (
					<div className="row justify-content-center">
						<h3>Loading ... </h3>
					</div>
				) : (
					<>
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
						{this.state.alarms.length < 1 ? (
							<div className="row justify-content-center">
								<p className="h3 text-purple">Looks like you don't have any alarms :(</p>
								<p className="h3 text-white">
									Click the <i className="text-purple">Create New</i> button above to get started
								</p>
							</div>
						) : null}
					</>
				)}
			</div>
		);
	}
}

export default App;
