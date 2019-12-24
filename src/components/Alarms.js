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
			staticFields: false,
			title: 'New Alarm',
			message: '',
			cronString: '* * * * *',
			voiceId: 'Matthew',
			weatherType: 'weekly',
			weatherLocation: '',
			disabled: false,
			newsType: '',
		};

		this.setState({
			alarms: [newAlarm, ...this.state.alarms],
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
						create: a => this.props.addAlarm(a),
					};

					return (
						<div className="row justify-content-around">
							<Alarm alarm={alarm} alarmOps={alarmOps} staticFields={!alarm.isNew} key={alarm._id} />
						</div>
					);
				})}
			</>
		);
	}
}

export default Alarms;
