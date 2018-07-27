import React, { Component } from 'react';

import { IAttachedImage } from './interface';

export interface IProps {
	attachedImages: IAttachedImage[];
	deleteImage(index: number): void;
	onUpdateImages(images: IAttachedImage[]): void;
}

export class ImageSelector extends Component<IProps> {

	onUpdateImages = (newImages: IAttachedImage[]) => {
		this.props.onUpdateImages(newImages);
	}

	/**
	 * Use for loading image and add in state.
	 * @param {any} target
	 */
	onAddImage = ({ target }) => {
		const files = Object.values(target.files);
		files.forEach((file: any) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				this.onUpdateImages([
					...this.props.attachedImages,
					{
						isBackend: false,
						base64: e.target.result,
						file,
					},
				]);
			};
		});
	}

	/**
	 * Need for reset last images
	 * @param event
	 */
	onClickAddImage = event => {
		event.target.value = null;
	}

	deleteImage = (index: number) => () => this.props.deleteImage(index);

	render() {
		const { attachedImages } = this.props;
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
						attachedImages.map((image, index) => (
							<ImageComponent
								key={index}
								url={image.base64}
								onDelete={ this.deleteImage(index) }
							/>
						))
					}
				</div>
			</>
		);
	}
}

export interface ImageProps {
	url: string;
	onDelete: () => void;
}

export const ImageComponent = ({ url, onDelete }: ImageProps) => (
	<div className='uploaded-img__container'>
		<span
			className='uploaded-img__remove'
			onClick={onDelete}
		>
			&times;
		</span>
		<img
			className='uploaded-img'
			src={url}
		/>
	</div>
);