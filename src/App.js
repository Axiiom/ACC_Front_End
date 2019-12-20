import React, {Component} from 'react';
import Alarm from './components/Alarm';

const alarms = [
	{
		name: 'Weekday Morning Alarm',
		voiceId: 'Matthew',
		message: 'Good morning!',
		schedule: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	},
	{
		name: 'Morning Alarm Weekends',
		voiceId: 'Matthew',
		message: 'Good morning, Cameron!',
		schedule: ['Monday', 'Tuesday', 'Thursday'],
	},
	{
		name: 'Morning Alarm Whatever',
		voiceId: 'James',
		message: 'Good afternoon, Cameron!',
		schedule: ['Monday', 'Friday', 'Saturday', 'Sunday'],
	},
];

class App extends Component {
	render() {
		return (
			<div className="container">
				{alarms.map(alarm => {
					return (
						<div className="row justify-content-around">
							<Alarm alarm={alarm} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default App;
