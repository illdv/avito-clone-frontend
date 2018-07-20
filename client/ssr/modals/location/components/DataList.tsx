import React from 'react';

require('./DataList.sass');

interface Data {
	id: number;
	title: string;
}

interface DataListProps {
	label: string;
	data: Data[];
	idActive: number;
	labelEnabled: boolean;
	onSelect: (id: number) => void;
}

interface DataListState {
	value: string;
	error: string|null;
}

class DataList extends React.Component<DataListProps, DataListState> {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: this.active,
			error: null,
		};
	}

	get active() {
		const result = this.props.data.filter(item => item.id === this.props.idActive);
		const result_2 = result.length > 0 ? result[0].title : '';
		return result_2;
	}

	onChange = e => {
		this.setState({
			value: e.target.value,
		});
	}

	onBlur = e => {
		if (this.filtredValue.length > 0) {
			this.props.onSelect(this.filtredValue[0].id);
		} else {
			this.setState({
				error: 'No valid',
			});
		}
	}

	get filtredValue(): Data[] {
		return this.props.data.filter((d: Data) => {
			return d.title.toLowerCase().includes(this.state.value.toLowerCase());
		});
	}

	get elementLabelEnabled() {
		return (
			<div className=''>
				<div className='form-group'>
					<label htmlFor='favorite_team'>{ this.props.label }</label>
					<input onChange={ this.onChange } list={ this.props.label } className='form-control' onBlur={this.onBlur} />
					<datalist id={ this.props.label } className='datalist'>
						{
							this.filtredValue.map((item, index) => (
								index <= 10 && <option key={item.id} value={item.title} /> || null
							))
						}
					</datalist>
				</div>
			</div>
		);
	}

	get elementNoLabelEnabled() {
		return (
			<input onChange={ this.onChange } />
		);
	}

	render() {
		return (
			<React.Fragment>
				<div className='container'>
					{
						this.props.labelEnabled
						? this.elementLabelEnabled
						: this.elementNoLabelEnabled
					}
				</div>
			</React.Fragment>
		);
	}
}

export default DataList;