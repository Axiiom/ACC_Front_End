import React, {Component} from 'react';

class AlarmTextField extends Component {
	constructor(props) {
		super(props);

        this.updateParent = this.updateParent.bind(this)

		this.state = {
			static: this.props.static,
			val: this.props.val,
		};
    }
    
    updateParent(message) {
        this.props.update(message)
    }

	handleChange = e => {
		this.setState({
			val: e.target.value,
		});
		this.updateParent(e.target.value)
	};

	render() {
		const fieldClass = this.props.static ? 'col-9 text-purple' : 'col-9';
		const {title, val} = this.props;
		return this.props.static ? (
			<li className="list-group-item">
				<div className="row">
					<div className="col-3">{title}</div>
					<div className="col-9 text-purple">{val}</div>
				</div>
			</li>
		) : (
			<li className="list-group-item">
				<div className="row">
					<div className="col-3">{title}</div>
					<div className={fieldClass}>
						<input
							type="text"
							className="form-control"
							value={this.state.val}
							onChange={this.handleChange}
						/>
					</div>
				</div>
			</li>
		);
	}
}

class AlarmDropdownField extends Component {
	constructor(props) {
		super(props);

        this.updateParent = this.updateParent.bind(this)

		this.state = {
			static: this.props.static,
			val: this.props.val,
		};
	}

	handleChange = e => {
		this.setState({
			val: e.target.value
		});
		this.updateParent(e.target.value)
    };
    
    updateParent(val) {
        this.props.update(val)
    }

	render() {
		const fieldClass = this.props.static ? 'col-9 text-purple' : 'col-9';
		return this.props.static ? (
			<li className="list-group-item">
				<div className="row">
					<div className="col-3">{this.props.title}</div>
					<div className="col-9 text-purple">{this.state.val}</div>
				</div>
			</li>
		) : (
			<li className="list-group-item">
				<div className="row">
					<div className="col-3">{this.props.title}</div>
					<div className={fieldClass}>
						<select
							multiple={false}
							className="form-control"
							value={this.state.val}
							onChange={this.handleChange}
						>
							{this.props.fields.map(field => {
								return <option value={field} key={field}>{field}</option>;
							})}
						</select>
					</div>
				</div>
			</li>
		);
	}
}

export default {
	AlarmTextField: AlarmTextField,
	AlarmDropdownField: AlarmDropdownField,
};

/*
 <div className="col-auto">
<div className="input-group mb-2">
    <div class="input-group-append">
        <i class="far fa-check-square"></i>
    </div>
</div>
<input
    type={formType}
    className="form-control bg-secondary text-white"
    id=""
    value={val}
    onChange={this.handleChange}
/>
</div> */
