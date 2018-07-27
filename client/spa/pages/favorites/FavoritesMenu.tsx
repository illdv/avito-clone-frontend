import * as React from 'react';

interface IFavoritesMenu {
}

const FavoritesMenu: React.SFC<IFavoritesMenu> = ({}) => {
	return (
		<div
			className="accordion"
			id="accordionExample"
		>
			<div className="accordion__card card">
				<a
					data-toggle="collapse"
					data-target="#collapseOne"
					aria-expanded="true"
					aria-controls="collapseOne"
				>
					<div
						className="accordion__card-header d-flex justify-content-between"
						id="headingOne"
					>
						<h6 className="mb-0">
							<i className="card-header__icon fas fa-angle-right"> </i>
							<span>Transport</span>
						</h6>
						<span className="text_count-category">3</span>
					</div>
				</a>
				<div
					id="collapseOne"
					className="collapse"
					aria-labelledby="headingOne"
					data-parent="#accordionExample"
				>
					<div className="accordion__card-body card-body">
						<ul className="list-unstyled accordion__accordion-types">
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span className="orange-text">Cars</span>
								</a>
								<span className="text_count-category">3</span>
							</li>
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span>Bicycle</span>
								</a>
								<span className="text_count-category">3</span>

							</li>
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span>Boat</span>
								</a>
								<span className="text_count-category">3</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="accordion__card card">
				<a
					data-toggle="collapse"
					data-target="#collapseTwo"
					aria-expanded="true"
					aria-controls="collapseTwo"
				>
					<div
						className="accordion__card-header d-flex justify-content-between"
						id="headingTwo"
					>
						<h6 className="mb-0">
							<i className="card-header__icon fas fa-angle-right"> </i>
							<span>Transport</span>
						</h6>
						<span className="text_count-category">3</span>
					</div>
				</a>
				<div
					id="collapseTwo"
					className="collapse"
					aria-labelledby="headingOne"
					data-parent="#accordionExample"
				>
					<div className="accordion__card-body card-body">
						<ul className="list-unstyled accordion__accordion-types">
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span className="orange-text">Cars</span>
								</a>
								<span className="text_count-category">3</span>
							</li>
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span>Bicycle</span>
								</a>
								<span className="text_count-category">3</span>

							</li>
							<li className="accordion-types__item">
								<a
									href="#"
									className="accordion-types__link"
								>
									<span>Boat</span>
								</a>
								<span className="text_count-category">3</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoritesMenu;
