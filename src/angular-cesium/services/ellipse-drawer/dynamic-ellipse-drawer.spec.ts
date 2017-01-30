
import { TestBed, inject } from '@angular/core/testing';
import { DynamicEllipseDrawerService } from './dynamic-ellipse-drawer.service';
import {mock, when, instance, verify, anything} from "ts-mockito";
import {CesiumService} from "../cesium/cesium.service";


fdescribe('DynamicEllipseDrawerService', () => {

  let ellipseProps = {center: new Cesium.Cartesian3.fromArray([1014908.2920381048, -6260819.093129401, -670601.4009049088]), granularity :0.04,rotation:0, semiMajorAxis:250000, semiMinorAxis:400000};
  let ellipseProps2 = {width: 2, center: new Cesium.Cartesian3.fromArray([2014908.2920381048, -7260819.093129401, -670601.4009049088]), granularity :0.04,rotation:0, semiMajorAxis:240000, semiMinorAxis:300000};
  let cesiumService = mock(CesiumService);
  let primitiveCollection = mock(Cesium.PrimitiveCollection);

  when(cesiumService.getScene()).thenReturn({primitives: instance(primitiveCollection)});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicEllipseDrawerService, {provide: CesiumService, useValue: instance(cesiumService)}]
    });
  });

  it('should create and return a new ellipse primitive.', inject([DynamicEllipseDrawerService], (service: DynamicEllipseDrawerService) => {
    let ellipsePrimitive = service.add(ellipseProps);

    verify(primitiveCollection.add(anything())).once();
    expect(ellipsePrimitive).toBeDefined();
  }));

  it('should update a given ellipse\'s positions', inject([DynamicEllipseDrawerService], (service: DynamicEllipseDrawerService) => {
    let ellipsePrimitive = service.add(ellipseProps);
    let oldPositions = ellipsePrimitive.positions;

    service.update(ellipsePrimitive, ellipseProps2);

    expect(oldPositions).not.toEqual(ellipsePrimitive.positions);
  }));

  it('should update a given ellipse\'s width', inject([DynamicEllipseDrawerService], (service: DynamicEllipseDrawerService) => {
    let ellipsePrimitive = service.add(ellipseProps);
    let oldWidth = ellipsePrimitive.width;

    service.update(ellipsePrimitive, ellipseProps2);

    expect(oldWidth).not.toEqual(ellipsePrimitive.width);
  }));
});
