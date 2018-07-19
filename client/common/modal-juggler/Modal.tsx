import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { IModal, ModalNames } from './modalJugglerInterface';

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
} as any;

Modal.setAppElement('body');

class ModalWrap extends React.PureComponent<ModalWrapProps> {
    constructor(props: ModalWrapProps, context) {
        super(props, context);
    }

    get modal(): IModal|undefined {
        return this.props.modals.filter((modal: IModal) => {
            return modal.name === this.props.name
        })[0];
    }

    get isOpen() {
        return !!this.modal; // Convert to boolean
    }

    get isModalLast() {
        let index = this.props.modals.indexOf(this.modal);
        index++; // Because the index begins with 0

        return this.props.modals.length === index;
    }

    get onRequestClose() {
        return this.props.useOnRequestClose && (() => this.props.hide(this.props.name));
    }

    get style() {
        return  this.props.style || defaultStyle;
    }

    get modifyStyle() {
        const style = this.style;
        const overlay = style && style.overlay && style.overlay.backgroundColor || 'rgba(0, 0, 0, 0)';

        return {
            ...style,
            overlay: {
                ...style.overlay,
                zIndex: this.modal ? this.modal.zIndex : 0,
                backgroundColor: this.isModalLast ? overlay : 'rgba(0, 0, 0, 0)',
            },
        }
    }

    render() {
        return (
            <Modal
                isOpen={ this.isOpen }
                style={ this.modifyStyle }
                onRequestClose={ this.onRequestClose }
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