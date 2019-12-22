import React, {Component} from 'react';
import Alarm from './Alarm';

class Alarms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alarms: this.props.alarms,
		};
	}

	updateAlarm = alarm => {
		console.log(alarm)
		var alarms = this.state.alarms;
		for (var i = 0; i < alarms; i++) {
			if (alarms[i]._id === alarm._id) {
				alarms[i].update(alarm);
				break;
			}
		}
		this.props.updateAlarm(alarm);
		this.setState({
			alarms: alarms,
		});
	};

	removeAlarm = id => {
		this.setState({
			alarms: this.state.alarms.filter(alarm => {
				return alarm._id !== id;
			}),
		});

		if (!id) return;
		this.props.removeAlarm(id);
	};

	createAlarm = () => {
		var newAlarm = {
			isNew: true,
			message: '',
			voiceId: '',
			name: 'New Alarm',
			disabled: false,
		};

		this.setState({
			alarms: [newAlarm, ...this.state.alarms],
		});
	};

	addAlarm = alarm => {
		const data = this.props.addAlarm(alarm);
		this.setState({
			alarms: [data, ...this.state.alarms],
		});
	};

	render() {
		return (
			<>
				<div className="row justify-content-center col-mgn">
					<button className="btn btn-success btn-lg" onClick={this.createAlarm}>
						Create New
					</button>
				</div>
				{this.state.alarms.map(alarm => {
					const alarmOps = {
						update: this.updateAlarm,
						remove: this.removeAlarm,
						create: this.addAlarm,
					};

					return (
						<div className="row justify-content-around" key={alarm._id}>
							<Alarm
								alarm={alarm}
								key={alarm._id}
								alarmOps={alarmOps}
								static={alarm.isNew ? false : true}
							/>
						</div>
					);
				})}
			</>
		);
	}
}

export default Alarms;
