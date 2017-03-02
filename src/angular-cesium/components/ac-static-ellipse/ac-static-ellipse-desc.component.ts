import { Component } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { EllipseDrawerService } from '../../services/ellipse-drawer/ellipse-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';

/**
 *  This is a static (position, color, etc.. are not updated) implementation of an ellipse.
 *  @example
 *    <ac-static-ellipse-desc
 geometryProps="{
            center: ellipse.geometry.center,
            semiMajorAxis: ellipse.geometry.semiMajorAxis,
            semiMinorAxis: ellipse.geometry.semiMinorAxis,
            height: ellipse.geometry.height,
            rotation: ellipse.geometry.rotation
        }"
 instanceProps="{
            attributes: ellipse.attributes //Optional
        }"
 primitiveProps="{
            appearance: ellipse.appearance //Optional
        }"
 >
 */
@Component({
	moduleId: module.id,
	selector: 'ac-static-ellipse-desc',
	templateUrl: 'ac-static-ellipse-desc.component.html',
	styleUrls: ['ac-static-ellipse-desc.component.css']
})
export class AcStaticEllipseDescComponent extends BasicStaticPrimitiveDesc {
	constructor(ellipseDrawer: EllipseDrawerService, layerService: LayerService,
	            computationCache: ComputationCache, cesiumProperties: CesiumProperties) {
		super(ellipseDrawer, layerService, computationCache, cesiumProperties);
	}
}
