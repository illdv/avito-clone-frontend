import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { ModalNames, IModal } from './modalJugglerInterface';

import { getModals } from '../store/selectors';
import { hide } from './module';

export interface InitialModalProps {
    name: ModalNames;
    style?: object;
    useOnRequestClose?: boolean;
}

export interface ModalWrapProps {
    name: ModalNames;
    modals: IModal[];
    style?: object;
    useOnRequestClose?: boolean;
    hide: (name: ModalNames) => void;
}

const defaultStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0px',
        padding: '0px'
    },
    overlay: {
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, .75)',
    },
}

Modal.setAppElement('body');

class ModalWrap extends React.PureComponent<ModalWrapProps> {
    constructor(props: ModalWrapProps, context) {
        super(props, context);
    }

    get isOpen() {
        return this.props.modals.some(modal => modal.name === this.props.name);
    }

    get onRequesClose() {
        return this.props.useOnRequestClose && (() => this.props.hide(this.props.name))
    }

    render() {
        return (
            <Modal
                isOpen={ this.isOpen }
                style={ this.props.style || defaultStyle }
                onRequestClose={ this.onRequesClose }
            >
                { this.props.children }
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    modals: getModals(state)
});

const mapDispatchToProps = dispatch => ({
    hide: (name) => dispatch(hide(name))
});

export default (props: InitialModalProps) => {
    const Component = connect(mapStateToProps, mapDispatchToProps)(ModalWrap);
    return <Component {...props} />
}