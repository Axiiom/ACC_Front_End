import React, {Component} from 'react';
import AlarmFields from './AlarmFields';

class Alarm extends Component {
	constructor(props) {
		super(props);

		this.updateMessage = this.updateMessage.bind(this);
		this.updateVoiceId = this.updateVoiceId.bind(this);

		this.state = {
			staticFields: true,
			message: this.props.alarm.message,
			voiceId: this.props.alarm.voiceId,
			name: this.props.alarm.name,
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

	setEditable = () => {
		this.setState({staticFields: false});
	};

	setStatic = e => {
		this.setState({staticFields: true});
	};

	renderSubmitButton() {
		if (!this.state.staticFields) {
			return (
				<div className="container">
					<button type="button" className="btn btn-success" onClick={this.setStatic}>
						<i className="fas fa-check"></i>
					</button>
				</div>
			);
		}
	}

	updateMessage(message) {
		this.setState({message: message});
	}

	updateVoiceId(voiceId) {
		this.setState({voiceId: voiceId});
	}

	render() {
		const headerMain = (
			<div className="row align-items-center mb-2 justify-content-around">
				<div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
					<p className="h3">{this.state.name}</p>
				</div>
				<div className="col-xs-3">
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
								Edit
							</button>
							<button className="dropdown-item">Disable</button>
							<button className="dropdown-item">Delete</button>
						</div>
					</div>
				</div>
			</div>
		);

		const headerSchedule = (
			<div class="row align-items-center mb-2 justify-content-around">
				<div class="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9">
					<p class="h3">Schedule</p>
				</div>
				<div class="col-xs-3">
					<div class="dropdown">
						<button type="button" class="btn btn-secondary">
							<i class="fas fa-cog"></i>
						</button>
					</div>
				</div>
			</div>
		);
		return (
			<>
				<div
					className="col-xl-7 col-lg-7 col-md-8 col-sm-12 col-xs-12 rounded-lg shadow-lg col-mgn bg-dark"
					// style={{padding: '4vh'}}
				>
					{headerMain}
					<ul className="list-group list-group-flush">
						<AlarmFields.AlarmTextField
							static={this.state.staticFields}
							val={this.state.message}
							title="Message"
							update={this.updateMessage}
						/>
						<AlarmFields.AlarmDropdownField
							static={this.state.staticFields}
							val={this.state.voiceId}
							title="Spoken By"
							fields={this.voiceIds}
							update={this.updateVoiceId}
						/>
					</ul>
					{this.renderSubmitButton()}
				</div>
				<div
					class="col-xl-4 col-lg-4 col-md-8 col-sm-12 col-xs-12 rounded-lg shadow-lg col-mgn bg-dark"
					// style={{padding: '4vh'}}
				>
					{headerSchedule}
					<ul class="list-group list-group-flush list-group-active">
						<li class="list-group-item">
							<div class="row">
								<div class="col-5">Monday</div>
								<div class="col-7 text-purple">10:00 AM</div>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row">
								<div class="col-5">Monday</div>
								<div class="col-7 text-purple">10:00 AM</div>
							</div>
						</li>
						<li class="list-group-item">
							<div class="row">
								<div class="col-5">Monday</div>
								<div class="col-7 text-purple">10:00 AM</div>
							</div>
						</li>
					</ul>
				</div>
			</>
		);
	}
}

export default Alarm;
