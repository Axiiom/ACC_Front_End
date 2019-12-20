import React, {Component} from 'react';
import AlarmLI from './AlarmList';

class ContainerMain extends Component {
	render() {
		return (
			<div className="card text-white bg-dark border-purple mb-3">
				<div className="card-body">
					<ul className="list-group list-group-flush">
						<AlarmLI.Header text={this.props.alarm.name} />
						<AlarmLI.Item header="Spoken By" text={this.props.alarm.voiceId} />
						<AlarmLI.Item header="Message" text={this.props.alarm.message} />
					</ul>
				</div>
			</div>
		);
	}
}

class ContainerSchedule extends Component {
	state = {
		schedule: this.props.alarm.schedule,
		selected: false,
	};

	handleDel = e => {
		var day = e.target.offsetParent.offsetParent.id;
		this.setState({
			schedule: this.state.schedule.filter(item => {
				return item !== day;
			}),
		});
	};

	hoverDelOn = e => {
		e.target.className = 'btn del-btn text-danger';
	};

	hoverDelOff = e => {
		e.target.className = 'btn del-btn text-secondary';
	};

	renderDay(day) {
		return (
			<li className="list-group-item" id={day}>
				<div className="row">
					<div className="col-5"> {day}</div>
					<div className="col-5"> 10:00 AM </div>
					<div className="col-2" onClick={this.handleDel}>
						<button
							type="button"
							className="btn del-btn text-secondary"
							onMouseEnter={this.hoverDelOn}
							onMouseLeave={this.hoverDelOff}
						>
							<i class="fas fa-times" style={{cursor: 'pointer'}}></i>
						</button>
					</div>
				</div>
			</li>
		);
	}

	render() {
		return (
			<div className="card text-white bg-dark border-purple mb-3">
				<div className="card-body">
					<ul className="list-group list-group-flush">
						<h4 className="card-title">Schedule</h4>
						{this.state.schedule.map(day => {
							return this.renderDay(day);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

function rend(alarm) {
	return (
		<div className="row">
			<div className="col-6">
				<ContainerMain alarm={alarm} />
			</div>
			<div className="col-3">
				<ContainerSchedule alarm={alarm} />
			</div>
		</div>
	);
}

export default {
	AlarmTemplate: rend,
};
