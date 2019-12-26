import React, {Component} from 'react';
import AlarmFields from './AlarmFields';

class Alarm extends Component {
	constructor(props) {
		super(props);

		console.log(props.alarm);

		const alarm = props.alarm;
		this.state = {
			hasChanged: false,
			staticFields: props.staticFields,
			message: alarm.message,
			voiceId: alarm.voiceId,
			title: alarm.title,
			disabled: alarm.disabled,
			cronString: alarm.cronString,
			weatherLocation: alarm.weatherLocation,
			weatherType: alarm.weatherType,
			newsType: alarm.newsType ? alarm.newsType : 'world',
		};

		this.voiceIds = [
			'Nicole',
			'Russell',
			'Amy',
			'Emma',
			'Brian',
			'Aditi',
			'Raveena',
			'Ivy',
			'Joanna',
			'Kendra',
			'Kimberly',
			'Salli',
			'Joey',
			'Justin',
			'Matthew',
		];
	}

	updateAlarm = () => {
		this.setState({staticFields: true});

		if (this.props.alarm.isNew) {
			var newAlarm = {};
			for (var key in this.state) newAlarm[key] = this.state[key];

			this.props.alarmOps.create(newAlarm);
		} else {
			for (var key in this.state) this.props.alarm[key] = this.state[key];

			this.props.alarmOps.update(this.props.alarm);
		}
	};

	setDisabled = () => {
		this.setState({staticFields: true, disabled: true});
		this.props.alarm.disabled = true;
		this.props.alarmOps.update(this.props.alarm);
	};

	setEnabled = () => {
		this.setState({disabled: false});
		this.props.alarm.disabled = false;
		this.props.alarmOps.update(this.props.alarm);
	};

	deleteSelf = () => {
		this.props.alarmOps.remove(this.props.alarm._id);
	};

	updateCronString = time => {
		var hour = time.split(':')[0];
		var minute = time.split(':')[1];
		var days = this.state.cronString.split(' ')[3];

		this.setState({
			cronString: `${minute} ${hour} ${days} * *`,
		});
	};

	renderEditButton() {
		return this.state.disabled ? (
			<button type="button" className="btn btn-secondary hover-purple btn-lg" onClick={this.setEnabled}>
				Enable
			</button>
		) : !this.state.staticFields ? (
			<button type="button" className="btn btn-success" onClick={this.updateAlarm}>
				<i className="fas fa-check text-white"></i>
			</button>
		) : (
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<i className="fas fa-cog"></i>
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<button
						type="button"
						className="dropdown-item"
						onClick={() => {
							this.setState({staticFields: false});
						}}
					>
						<div className="row">
							<div className="col-2">
								<i className="fas fa-wrench text-edit"></i>
							</div>
							<div className="col-auto">Edit</div>
						</div>
					</button>
					<button className="dropdown-item" onClick={this.setDisabled}>
						<div className="row">
							<div className="col-2 text-yellow">
								<i className="fas fa-comment-slash"></i>
							</div>
							<div className="col-auto">Disable</div>
						</div>
					</button>
					<div className="dropdown-divider"></div>
					<button className="dropdown-item hover-danger" onClick={this.deleteSelf}>
						Delete
					</button>
				</div>
			</div>
		);
	}

	addDayToSchedule = (dt) => {
		console.log(dt)
	}
	
	removeDayFromSchedule = (dt) => {
		console.log(dt)
	}

	render() {
		const isDisabled = this.state.disabled;
		const title = this.state.title;
		const textClass = 'h3' + (isDisabled ? ' text-secondary' : '');

		// turn from cron string into readable schedule
		if (this.state.cronString !== '') {
			var [minute, hour, n, a, days] = this.state.cronString.split(' ');
			var timeOfDay = hour - 12 > 1 ? 'PM' : 'AM';
			minute = String('00' + minute).slice(-2);
			hour = ('00' + hour).slice(-2);
			days = days.split(',');
			var schedule = [];
			days.map(day => {
				schedule.push(`${day}@${hour}:${minute} ${timeOfDay}`);
			});
		} else {
			days = [];
		}

		const headerMain = (
			<div className="row align-items-center mb-2 justify-content-around">
				{this.state.staticFields ? (
					<>
						<div className="col-8">
							<p className={textClass}>{title}</p>
						</div>
						<div className="col-3">{this.renderEditButton()}</div>
					</>
				) : (
					<>
						<AlarmFields.AlarmTitleField
							static={this.state.staticFields}
							val={this.state.title}
							update={title => {
								this.setState({title: title});
							}}
							disabled={isDisabled}
						/>
						<div className="col-auto">{this.renderEditButton()}</div>
					</>
				)}
			</div>
		);

		const renderSchedule = (
			<ul className="list-group list-group-flush list-group-active">
				{this.state.cronString
					.split(' ')[2]
					.split(',')
					.map(dt => {
						const time = `${this.state.cronString.split(' ')[1]}:${this.state.cronString.split(' ')[0]}`;
						return (
							<li className="list-group-item" key={time}>
								<AlarmFields.AlarmScheduleField
									static={this.state.staticFields}
									val={time}
									title={dt}
									update={schedule => {
										this.updateCronString(schedule);
									}}
									disabled={isDisabled}
									removeSelf={() => {this.removeDayFromSchedule(dt)}}
								/>
							</li>
						);
					})}
				{this.state.staticFields ? null : (
					<li className="list-group-item justify-content-end">
						<div className="row justify-content-end">
							<button type="button" className="btn btn-success" onClick={this.addDayToSchedule()}>Add Day</button>
						</div>
					</li>
				)}
			</ul>
		);

		return (
			<>
				<div className="col-md-9 col-lg-7 rounded-lg shadow-lg col-mgn bg-dark">
					{headerMain}
					<ul className="list-group list-group-flush">
						<AlarmFields.AlarmTextField
							static={this.state.staticFields}
							val={this.state.message}
							title="Message"
							update={message => {
								this.setState({message: message});
							}}
							disabled={isDisabled}
						/>
						<AlarmFields.AlarmDropdownField
							static={this.state.staticFields}
							val={this.state.voiceId}
							title="Spoken By"
							fields={this.voiceIds}
							update={voiceId => {
								this.setState({voiceId: voiceId});
							}}
							disabled={isDisabled}
						/>
						<AlarmFields.AlarmDropdownField
							static={this.state.staticFields}
							val={this.state.weatherType}
							title="Weather Type"
							fields={['weekly', 'current']}
							update={weatherType => {
								this.setState({weatherType: weatherType});
							}}
							disabled={isDisabled}
						/>
						<AlarmFields.AlarmTextField
							static={this.state.staticFields}
							val={this.state.weatherLocation.split(',')[0]}
							title="Location"
							update={weatherLocation => {
								this.setState({weatherLocation: weatherLocation});
							}}
							disabled={isDisabled}
						/>
					</ul>
				</div>
				<div className="col-md-9 col-lg-4 rounded-lg shadow-lg col-mgn bg-dark">
					<h3>
						<p className={textClass}>Schedule</p>
					</h3>
					{renderSchedule}
				</div>
			</>
		);
	}
}

export default Alarm;
