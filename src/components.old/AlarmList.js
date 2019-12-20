import React, {Component} from 'react';

class AlarmListHeader extends Component {
    state = {
        showPencil: false
    }

	render() {
		return (
			<li
				className="list-group-item list-group-item-action"
				onMouseEnter={() => {
					this.setState({showPencil: true});
				}}
				onMouseLeave={() => {
					this.setState({showPencil: false});
				}}
				style={{cursor: this.state.showPencil ? 'pointer' : 'auto'}}
			>
				<div className="row">
					<div className="col-11">
						<h4 className="card-title">{this.props.text}</h4>
					</div>
					<div className="col">
						{this.state.showPencil ? <i className="fas fa-pencil-alt alarm-li"></i> : ''}
					</div>
				</div>
			</li>
		);
	}
}

class AlarmListItem extends Component {
	state = {
		showPencil: false
	};

	render() {
		return (
			<li
				className="list-group-item list-group-item-action"
				onMouseEnter={() => {
					this.setState({showPencil: true});
				}}
				onMouseLeave={() => {
					this.setState({showPencil: false});
				}}
				style={{cursor: this.state.showPencil ? 'pointer' : 'auto'}}
			>
				<div className="row">
					<div className="col-3 text-white alarm-li">{this.props.header}</div>
					<div className="col-8 text-purple alarm-li">{this.props.text}</div>
					<div className="col">
						{this.state.showPencil ? <i className="fas fa-pencil-alt alarm-li text-disabled"></i> : ''}
					</div>
				</div>
			</li>
		);
	}
}

export default {
    Item: AlarmListItem,
    Header: AlarmListHeader
};
