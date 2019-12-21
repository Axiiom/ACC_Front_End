import React, {Component} from 'react';
import Alarm from './Alarm';

class Alarms extends Component {
	constructor(props) {
		super(props);

        this.updateAlarm = this.updateAlarm.bind(this);
        
		this.state = {
			alarms: this.props.alarms,
		};
	}

	async updateAlarm(updatedAlarm) {
		var alarms = this.state.alarms;
		for (var i = 0; i < alarms; i++) {
			if (alarms[i]._id === updatedAlarm._id) {
				alarms[i].update(updatedAlarm);
				break;
			}
		}

		this.props.updateAlarm(updatedAlarm);
		updatedAlarm = alarms[i];
		this.setState({
			alarms: alarms,
		});
	}

	render() {
		return this.state.alarms.map(alarm => {
			alarm.schedule = [
				'Monday@10:00 AM',
				'Tuesday@11:00 AM',
				'Thursday@12:00 AM',
				'Friday@10:00 AM',
				'Saturday@10:00 AM',
				'Sunday@10:00 AM',
			];
			return (
				<div className="row justify-content-around">
					<Alarm alarm={alarm} key={alarm._id} updateAlarm={this.updateAlarm} />
				</div>
			);
		});
	}
}

export default Alarms;
