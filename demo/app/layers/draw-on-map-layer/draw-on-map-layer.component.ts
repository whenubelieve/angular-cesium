import { Component, OnInit, ViewChild } from '@angular/core';
import { AcLabelComponent } from '../../../../src/components/ac-label/ac-label.component';
import { AcHtmlComponent } from '../../../../src/components/ac-html/ac-html.component';
import { AcArcComponent } from '../../../../src/components/ac-arc/ac-arc.component';

@Component({
	selector: 'draw-on-map-layer',
	templateUrl: 'draw-on-map-layer.component.html'
})
export class DrawOnMapComponent implements OnInit {
	private position: any;
	private positions: any;
	private redMatirial: any;
	private aquamarine: any;
	private longitude: number;
	private latitude: number;
	private radius: number;
	private htmlElement: string;
	private center = Cesium.Cartesian3.fromDegrees(Math.random() * 90 - 40, Math.random() * 90 - 40);
	private delta = Math.PI;
	private radius = Math.random() * 1000000;
	private angle = Math.random() * 3 - 1;
	private color = Cesium.Color.RED;

	@ViewChild(AcLabelComponent) label: AcLabelComponent;
	@ViewChild(AcHtmlComponent) html: AcHtmlComponent;
	@ViewChild(AcArcComponent) arc: AcArcComponent;

	constructor() {}

	ngOnInit() {
		this.radius = 80000.0;
		this.htmlElement = "shilo";
		this.longitude = 35.1;
		this.latitude = 0.1;
		this.position = Cesium.Cartesian3.fromDegrees(34.0, 32.0);
		this.positions = Cesium.Cartesian3.fromDegreesArray(
			[
				34.1, 35.1,
				this.longitude, this.latitude
			]);
		this.redMatirial = new Cesium.Material({
			fabric: {
				type: 'Color',
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 1.0)
				}
			}
		});
		this.aquamarine = Cesium.Color.AQUAMARINE;

		setTimeout(() => {
			this.html.props.position = Cesium.Cartesian3.fromDegrees(40.0, 40.0);
			this.htmlElement = "drot";
		}, 5000);

		setTimeout(() => {
			this.label.removeFromMap();
			this.html.props.show = false;
			this.arc.removeFromMap()
		}, 10000);

		setInterval(() => {
			this.positions = Cesium.Cartesian3.fromDegreesArray(
				[
					34.1, 35.1,
					++this.longitude, ++this.latitude
				]);
			this.radius += 500;
			this.center = Cesium.Cartesian3.fromDegrees(Math.random() * 90 - 40, Math.random() * 90 - 40);
		}, 500);
	}
}