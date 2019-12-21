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
				className="form-control bg-secondary text-white"
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
				className="form-control bg-secondary text-white"
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

export default {
	AlarmTextField: AlarmTextField,
	AlarmDropdownField: AlarmDropdownField,
};
