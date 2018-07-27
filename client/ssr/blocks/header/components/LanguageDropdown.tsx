import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export interface LanguageDropdownProps {

}

export interface LanguageDropdownState {
	dropdownOpen: boolean;
}

class LanguageDropdown extends Component<LanguageDropdownProps, LanguageDropdownState> {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}));
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='nav-item'>
				<DropdownToggle caret className='language'>
					English
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem>English</DropdownItem>
					<DropdownItem>German</DropdownItem>
					<DropdownItem>Arab</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}

export default LanguageDropdown;
