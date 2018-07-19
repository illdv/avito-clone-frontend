import { Component } from 'react';
import * as React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
}

export default GoogleApiWrapper({
	apiKey: (`AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI-poEjA`),
})(MapContainer);