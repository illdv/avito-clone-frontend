import * as React from 'react';
import {Component} from 'react';
import {connect, Dispatch} from 'react-redux';
import {removeElementByIndex} from 'client/spa/pages/createAd/utils';

export interface Images {
	blob: string;
	file: any;
}

export interface IState {
	images: Images[];
}

export interface IProps {
	onUpdateImage: (images: Images[]) => void;
}

export class ImageSelector extends Component<IProps, IState> {

	state: IState = {
		images: [],
	};

	onUpdateImage = (newImages: Images[]) => {
		this.props.onUpdateImage(newImages);

		this.setState({
			images: newImages,
		});
	};

	/**
	 * Use for loading image and add in state.
	 * @param {any} target
	 */
	onAddImage = ({target}) => {
		const files = Object.values(target.files);
		files.forEach((file: any) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				this.onUpdateImage([
					...this.state.images,
					{ blob: e.target.result , file},
				]);
			};
		});
	};

	/**
	 * Need for reset last images
	 * @param event
	 */
	onClickAddImage = event => {
		event.target.value = null;
	};

	deleteImage = (index: number) => () => {
		const newFiles = removeElementByIndex(this.state.images, index);
		this.onUpdateImage(newFiles);
	};

	render() {
		const {images} = this.state;
		return (
			<>
				<div className='offer-form-upload'>
					<input
						type='file'
						className='form-control offer-form-upload__item'
						accept='.jpeg, .bmp, .png, .svg'
						onChange={this.onAddImage}
						multiple
						onClick={this.onClickAddImage}
					/>
				</div>
				<div className='uploaded-images'>
					{
						images.map((image, index) => (
							<Image
								key={index}
								url={image.blob}
								onClose={this.deleteImage(index)}
							/>
						))
					}
				</div>
			</>
		);
	}
}

interface ImageProps {
	url: string;
	onClose: () => void;
}

const Image = ({url, onClose}: ImageProps) => (
	<div className='uploaded-img__container'>
		<span
			className='uploaded-img__remove'
			onClick={onClose}
		>
			&times;
		</span>
		<img
			className='uploaded-img'
			src={url}
		/>
	</div>
);