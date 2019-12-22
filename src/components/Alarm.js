import React, {Component} from 'react';
import AlarmFields from './AlarmFields';

class Alarm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasChanged: false,
			staticFields: this.props.static,
			message: this.props.alarm.message,
			voiceId: this.props.alarm.voiceId,
			name: this.props.alarm.name,
			disabled: this.props.alarm.disabled,
			cron_string: this.props.alarm.cron_string,
			city: this.props.alarm.city,
			country: this.props.alarm.country_code,
			weatherType: this.props.alarm.weatherType,
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
			var newAlarm = {
				isNew: false,
				message: this.state.message,
				voiceId: this.state.voiceId,
				name: this.state.name,
				disabled: this.state.disabled,
				cron_string: this.state.cron_string,
			};
			this.props.alarmOps.create(newAlarm);
		}

		this.props.alarm.message = this.state.message;
		this.props.alarm.voiceId = this.state.voiceId;
		this.props.alarm.disabled = this.state.disabled;
		this.props.alarm.name = this.state.name;
		this.props.alarm.cron_string = this.state.cron_string;
		this.props.alarm.city = this.state.city;
		this.props.alarm.country_code = this.state.country;
		this.props.alarm.weather_type = this.state.weatherType;
		this.props.alarmOps.update(this.props.alarm);
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
		var days = this.state.cron_string.split(' ')[2];

		this.setState({
			cron_string: `${minute} ${hour} ${days} * *`,
		});
	};

	renderEditButton() {
		return this.state.disabled ? (
			<button type="button" className="btn btn-secondary hover-purple btn-lg" onClick={this.setEnabled}>
				Enable
			</button>
		) : !this.state.staticFields ? (
			<button type="button" className="btn btn-success" onClick={this.updateAlarm}>
				<i className="fas fa-check"></i>
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

	render() {
		const isDisabled = this.state.disabled;
		const name = this.state.name;
		const textClass = 'h3' + (isDisabled ? ' text-secondary' : '');

		// turn from cron string into readable schedule
		var [minute, hour, days] = this.state.cron_string.split(' ');
		var timeOfDay = hour - 12 > 1 ? 'PM' : 'AM';
		minute = String('00' + minute).slice(-2);
		hour = ('00' + hour).slice(-2);
		days = days.split(',');
		var schedule = [];
		days.map(day => {
			schedule.push(`${day}@${hour}:${minute} ${timeOfDay}`);
		});

		const headerMain = (
			<div className="row align-items-center mb-2 justify-content-around">
				{this.state.staticFields ? (
					<>
						<div className="col-8">
							<p className={textClass}>{name}</p>
						</div>
						<div className="col-3">{this.renderEditButton()}</div>
					</>
				) : (
					<>
						<AlarmFields.AlarmTitleField
							static={this.state.staticFields}
							val={this.state.name}
							update={title => {
								this.setState({name: title});
							}}
							disabled={isDisabled}
						/>
						<div className="col-auto">{this.renderEditButton()}</div>
					</>
				)}
			</div>
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
						{this.state.weatherType ? (
							<>
								<AlarmFields.AlarmTextField
									static={this.state.staticFields}
									val={this.state.weatherType}
									title="Weather Type"
									update={weatherType => {
										this.setState({weatherType: weatherType});
									}}
									disabled={isDisabled}
								/>
								<AlarmFields.AlarmTextField
									static={this.state.staticFields}
									val={this.state.city}
									title="City"
									update={city => {
										this.setState({city: city});
									}}
									disabled={isDisabled}
								/>
							</>
						) : null}
					</ul>
				</div>
				<div className="col-md-9 col-lg-4 rounded-lg shadow-lg col-mgn bg-dark">
					<p className={textClass}>
						<h3>Schedule</h3>
					</p>
					<ul className="list-group list-group-flush list-group-active">
						{this.state.cron_string
							.split(' ')[2]
							.split(',')
							.map(dt => {
								const time = `${this.state.cron_string.split(' ')[1]}:${
									this.state.cron_string.split(' ')[0]
								}`;
								return (
									<li className="list-group-item">
										<AlarmFields.AlarmScheduleField
											static={this.state.staticFields}
											val={time}
											title={dt}
											update={schedule => {
												this.updateCronString(schedule);
											}}
											disabled={isDisabled}
										/>
									</li>
								);
							})}
					</ul>
				</div>
			</>
		);
	}
}

export default Alarm;
