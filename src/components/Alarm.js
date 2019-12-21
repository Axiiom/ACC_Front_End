import React, {Component} from 'react';
import AlarmFields from './AlarmFields';

class Alarm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			staticFields: true,
			message: this.props.alarm.message,
			voiceId: this.props.alarm.voiceId,
			name: this.props.alarm.name,
			disabled: this.props.alarm.disabled,
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
		if (
			this.props.alarm.message !== this.state.message ||
			this.props.alarm.voiceId !== this.state.voiceId ||
			this.props.alarm.disabled !== this.state.disabled
		) {
			this.props.alarm.message = this.state.message;
			this.props.alarm.voiceId = this.state.voiceId;
			this.props.alarm.disabled = this.state.disabled;
			this.props.updateAlarm(this.props.alarm);
		}
	};

	setDisabled = () => {
		this.setState({staticFields: true, disabled: true});
		this.props.alarm.disabled = true;
		this.props.updateAlarm(this.props.alarm);
	}

	setEnabled = () => {
		this.setState({disabled: false});
		this.props.alarm.disabled = false;
		this.props.updateAlarm(this.props.alarm);
	}

	renderEditButton() {
		return this.state.disabled ? (
			<button
				type="button"
				className="btn btn-secondary hover-purple btn-lg"
				onClick={this.setEnabled}
			>
				Enable
			</button>
		) : !this.state.staticFields ? (
			<button
				type="button"
				className="btn btn-success"
				onClick={this.updateAlarm}
			>
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
					<button className="dropdown-item hover-danger">Delete</button>
				</div>
			</div>
		);
	}

	render() {
		const isDisabled = this.state.disabled;
		const name = this.state.name;
		const textClass = 'h3' + (isDisabled ? ' text-secondary' : '');

		const headerMain = (
			<div className="row align-items-center mb-2 justify-content-around">
				<div className="col-8">
					<p className={textClass}>{name}</p>
				</div>
				<div className="col-auto">{this.renderEditButton()}</div>
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
					</ul>
				</div>
				<div className="col-md-9 col-lg-4 rounded-lg shadow-lg col-mgn bg-dark">
					<p className="h3">Schedule</p>
					<ul className="list-group list-group-flush list-group-active">
						{this.props.alarm.schedule.map(dt => {
							return (
								<li className="list-group-item" key={dt}>
									<div className="row">
										<div className="col-5">{dt.split('@')[0]}</div>
										<div className="col-7 text-purple">{dt.split('@')[1]}</div>
									</div>
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
