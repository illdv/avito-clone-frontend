import React from 'react';
import Footer from 'client/ssr/blocks/footer/Footer';

class FooterNavigation extends React.Component {
	render() {
		return (
			<footer className='footer p-t-120'>
				<div className='footer__top'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-3'>
								<h5 className='top__caption'>Transport</h5>
								<ul className='list-unstyled'>
									<li><a href='#'><span>Cars</span></a></li>
									<li><a href=''><span>Motorcycles and Motorcycles</span></a></li>
									<li><a href=''><span>Trucks and special equipment</span></a></li>
									<li><a href=''><span>Water transport</span></a></li>
									<li><a href=''><span>Spare parts and accessories</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>The property</h5>
								<ul className='list-unstyled'>
									<li><a href=''><span>Apartments</span></a></li>
									<li><a href=''><span>Rooms</span></a></li>
									<li><a href=''><span>Houses, cottages, cottages</span></a></li>
									<li><a href=''><span>Land</span></a></li>
									<li><a href=''><span>Garages and parking places</span></a></li>
									<li><a href=''><span>Commercial property</span></a></li>
									<li><a href=''><span>Property Abroad</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>Job</h5>
								<ul className='list-unstyled'>
									<li><a href=''><span>Careers</span></a></li>
									<li><a href=''><span>Summary</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>Personal things</h5>
								<ul className='list-unstyled'>
									<li><a href='#'><span>Clothes, shoes, accessories</span></a></li>
									<li><a href='#'><span>Children's clothing and footwear</span></a></li>
									<li><a href='#'><span>Goods for children and toys</span></a></li>
									<li><a href='#'><span> Watches & Jewelry</span></a></li>
									<li><a href='#'><span>beauty and health</span></a></li>
								</ul>
							</div>
						</div>
						<div className='row p-y-20'>
							<div className='col-md-3'>
								<h5 className='top__caption'>For home and cottages</h5>
								<ul className='list-unstyled'>
									<li><a href='#'><span>Appliances</span></a></li>
									<li><a href='#'><span>Furniture and interior</span></a></li>
									<li><a href='#'><span>Dishes and products for the kitchen</span></a></li>
									<li><a href='#'><span>Food</span></a></li>
									<li><a href='#'><span>Repair and construction</span></a></li>
									<li><a href='#'><span>Plants</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>Animals</h5>
								<ul className='list-unstyled'>
									<li><a href='#'><span>Dogs</span></a></li>
									<li><a href='#'><span>Cats</span></a></li>
									<li><a href='#'><span>Birds</span></a></li>
									<li><a href='#'><span> Aquarium</span></a></li>
									<li><a href='#'><span>Other animals</span></a></li>
									<li><a href='#'><span>Goods for pets</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>Consumer electronics</h5>
								<ul className='list-unstyled'>
									<li><a href='#'><span>Audio and video</span></a></li>
									<li><a href='#'><span>Games, consoles and programs</span></a></li>
									<li><a href='#'><span>Desktop Computers</span></a></li>
									<li><a href='#'><span>Laptops</span></a></li>
									<li><a href='#'><span>Office equipment and consumables</span></a></li>
									<li><a href='#'><span>Tablets and e-books</span></a></li>
									<li><a href='#'><span>Phones</span></a></li>
									<li><a href='#'><span>Computer products</span></a></li>
									<li><a href='#'><span>Photographic equipment</span></a></li>
								</ul>
							</div>
							<div className='col-md-3'>
								<h5 className='top__caption'>Hobbies and Recreation</h5>
								<ul className='list-unstyled'>
									<li><a href=''><span>Tickets and travel</span></a></li>
									<li><a href=''><span>Bicycles</span></a></li>
									<li><a href=''><span>Books and magazines</span></a></li>
									<li><a href=''><span>Collecting</span></a></li>
									<li><a href=''><span>Musical instruments</span></a></li>
									<li><a href=''><span>Hunting and fishing</span></a></li>
									<li><a href=''><span>Sport and leisure</span></a></li>
								</ul>
							</div>
						</div>
						<div className='row p-y-20'>
							<div className='col md-12'>
							<span className='grey-text'>
								© Ads - classNameifieds site of Germany. Use of the site, including the submission of
								ads, means acceptance of the User Agreement.
								<br />By paying for services on the site, you accept the offer. Information about cookies.
							</span>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</footer>
		);
	}
}

export default FooterNavigation;