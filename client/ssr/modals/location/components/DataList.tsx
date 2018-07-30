import React from 'react';

require('./DataList.sass');

interface Data {
	id: number;
	title: string;
}

interface DataListProps {
	name: string;
	data: Data[];
	inputId: string;
	idActive: number|null;
	inputClassName?: string;
	groupClassName?: string;
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
		return result.length > 0 ? result[0].title : '';
	}

	onChange = e => {
		this.setState({
			value: e.target.value,
		});
	}

	onBlur = e => {
		if (this.filtredValue.length > 0 && this.state.value !== '') {
			if (this.filtredValue[0].title !== this.state.value) {
				this.setState({
					value: this.filtredValue[0].title,
				});
			} 
			this.props.onSelect(this.filtredValue[0].id);
		} else {
			this.setState({
				error: 'No valid',
			});
			this.props.onSelect(null);
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.idActive === null) {
			this.setState({
				value: '',
				error: null,
			});
		}
	}

	shouldComponentUpdate(newProps: DataListProps, newSatate: DataListState) {
		return  this.props.data !== newProps.data ||
				this.props.idActive !== newProps.idActive ||
				this.state.value !== newSatate.value;
	}

	get filtredValue(): Data[] {
		return this.props.data.filter((d: Data) => {
			return d.title.toLowerCase().includes(this.state.value.toLowerCase());
		});
	}

	render() {
		return (
			<div className={ this.props.groupClassName || '' }>
				<input
					onBlur={this.onBlur}
					value={ this.state.value }
					onChange={ this.onChange }
					id={ this.props.inputId || '' }
					list={`list-${ this.props.name }`}
					className={ this.props.inputClassName || '' }
				/>
				<datalist id={`list-${ this.props.name }`} className='datalist'>
					{
						this.filtredValue.map((item, index) => (
							index <= 10 && <option key={item.id} value={item.title} /> || null
						))
					}
				</datalist>
			</div>
		);
	}
}

export default DataList;