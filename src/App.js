import React, {Component} from 'react';
import Alarm from './components/Alarm';

var alarms = [
	{
		name: 'Weekday Morning Alarm',
		voiceId: 'Matthew',
		message: 'Good morning!',
		schedule: [
			'Monday@10:00 AM',
			'Tuesday@11:00 AM',
			'Thursday@12:00 AM',
			'Friday@10:00 AM',
			'Saturday@10:00 AM',
			'Sunday@10:00 AM',
		],
		disabled: false,
	},
	{
		name: 'Weekend Morning Alarm',
		voiceId: 'Matthew',
		message: 'Good morning, Cameron!',
		schedule: ['Saturday@10:00 AM', 'Sunday@10:00 AM'],
		disabled: true,
	},
];

class App extends Component {
	render() {
		return (
			<div className="container">
				{alarms.map(alarm => {
					return (
						<div className="row justify-content-around" key={alarm.name}>
							<Alarm alarm={alarm} disabled={alarm.disabled} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default App;
