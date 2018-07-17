import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class LanguageDropdown extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {
        return (<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='nav-item'>
                <DropdownToggle caret className="language p-x-40">
                    English
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>English</DropdownItem>
                    <DropdownItem>German</DropdownItem>
                    <DropdownItem>Arab</DropdownItem>
                </DropdownMenu>
            </Dropdown>);
    }
}
export default LanguageDropdown;
//# sourceMappingURL=LanguageDropdown.jsx.map