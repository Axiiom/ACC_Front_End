import React, {Component} from 'react';

class AlarmTextField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val: this.props.val,
		};
	}

	handleChange = e => {
		this.setState({
			val: e.target.value,
		});
		this.props.update(e.target.value);
	};

	render() {
		const {title, val, disabled} = this.props;
		const fieldClass = 'col-9 text-' + (disabled ? 'secondary' : this.props.static ? 'purple' : 'white');
		const titleClass = 'col-3 text-' + (disabled ? 'secondary' : 'white');

		const internalRender = this.props.static ? (
			val
		) : (
			<input
				type="text"
				className="form-control form-control-sm  bg-secondary text-white"
				value={this.state.val}
				onChange={this.handleChange}
			/>
		);

		return (
			<li className="list-group-item">
				<div className="row">
					<div className={titleClass}>{title}</div>
					<div className={fieldClass}>{internalRender}</div>
				</div>
			</li>
		);
	}
}

class AlarmTitleField extends AlarmTextField {
	constructor(props) {
		super(props);
	}

	render() {
		const {val, disabled} = this.props;
		const fieldClass = 'col-9 text-' + (disabled ? 'secondary' : this.props.static ? 'purple' : 'white');
		const internalRender = this.props.static ? (
			val
		) : (
			<input
				type="text"
				className="form-control form-control-lg bg-secondary text-white h3"
				value={this.state.val}
				onChange={this.handleChange}
			/>
		);

		return <div className={fieldClass}>{internalRender}</div>;
	}
}

class AlarmDropdownField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val: this.props.val,
		};
	}

	handleChange = e => {
		this.setState({
			val: e.target.value,
		});
		this.props.update(e.target.value);
	};

	render() {
		const {title, val, disabled} = this.props;
		const fieldClass = 'col-9 text-' + (disabled ? 'secondary' : this.props.static ? 'purple' : 'white');
		const titleClass = 'col-3 text-' + (disabled ? 'secondary' : 'white');
		const internalRender = this.props.static ? (
			val
		) : (
			<select
				multiple={false}
				className="form-control form-control-sm bg-secondary text-white"
				value={this.state.val}
				onChange={this.handleChange}
			>
				{this.props.fields.map(field => {
					return (
						<option value={field} key={field}>
							{field}
						</option>
					);
				})}
			</select>
		);

		return (
			<li className="list-group-item">
				<div className="row">
					<div className={titleClass}>{title}</div>
					<div className={fieldClass}>{internalRender}</div>
				</div>
			</li>
		);
	}
}

class AlarmScheduleField extends Component {
	constructor(props) {
		super(props);

		var val = this.props.val;
		val = val.split(' ');

		var hour = val[0].split(':')[0];
		var minute = val[0].split(':')[1];
		var hour = val[1] === 'PM' ? Number(hour) + 12 : hour;
		val = `${hour}:${minute}`;

		this.state = {
			val: val
		};
	}

	handleChange = e => {
		this.setState({
			val: e.target.value,
		});
		this.props.update(e.target.value);
	};

	render() {
		var {title, disabled} = this.props;

		var titleClass = `col-5 text-` + (disabled ? 'secondary' : 'white');
		var fieldClass = `col-6 text-` + (disabled ? 'secondary' : this.props.static ? 'purple' : 'white');

		return this.props.static ? (
			<div className="row">
				<div className={titleClass}>{title}</div>
				<div className={fieldClass}>{this.state.val}</div>
			</div>
		) : (
			<div className="form-row justify-content-between align-items-center">
				{/* <input type="text" readonly className="form-control-plaintext" value={title}></input> */}
				<div className="col-5 col-xs-4">{title}</div>
				<div className="col-5 col-md-6 col-xs-5">
					<input
						type="time"
						className="form-control form-control-sm bg-secondary text-white"
						value={this.state.val}
						onChange={this.handleChange}
					></input>
				</div>
				<div className="col-2 col-md-1">
					<button type="button" className="form-control-sm btn-sm btn-danger">
						<i class="fas fa-times text-white"></i>
					</button>
				</div>
			</div>
		);

		// const {title, val, disabled} = this.props;
		// const fieldClass = 'col-6 text-' + (disabled ? 'secondary' : this.props.static ? 'purple' : 'white');
		// const titleClass = 'col-6 text-' + (disabled ? 'secondary' : 'white');
		// const internalRender = this.props.static ? (
		// 	val
		// ) : (
		// 	<select
		// 		multiple={false}
		// 		className="form-control bg-secondary text-white"
		// 		value={this.state.val}
		// 		onChange={this.handleChange}
		// 	>
		// 		{this.props.fields.map(field => {
		// 			return (
		// 				<option value={field} key={field}>
		// 					{field}
		// 				</option>
		// 			);
		// 		})}
		// 	</select>
		// );

		// return (
		// 	<li className="list-group-item">
		// 		<div className="row">
		// 			<div className={titleClass}>{title}</div>
		// 			<div className={fieldClass}>{internalRender}</div>
		// 		</div>
		// 	</li>
		// );
	}
}

export default {
	AlarmTextField: AlarmTextField,
	AlarmDropdownField: AlarmDropdownField,
	AlarmScheduleField: AlarmScheduleField,
	AlarmTitleField: AlarmTitleField,
};
