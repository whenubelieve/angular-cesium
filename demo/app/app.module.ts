import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularCesiumModule } from '../../src/angular-cesium.module';
import { SettingsFormComponent } from './shared/settings-form/settings-form.component';
import { TracksLayerComponent } from './layers/tracks-layer/tracks-layer.component';
import { EllipseLayerComponent } from './layers/ellipse-layer/ellipse-layer.component';
import { BaseLayerComponent } from './layers/base-layer/base-layer.component';
import { DynamicEllipseLayerComponent } from './layers/dynamic-ellipse-layer/dynamic-ellipse-layer.component';
import { DynamicPolylineLayerComponent } from './layers/dynamic-polyline-layer/dynamic-polyline-layer.component';
import { StaticPolylineLayerComponent } from './layers/static-polyline-layer/static-polyline-layer.component';
import { StaticCircleLayerComponent } from './layers/static-circle-layer/static-circle-layer.component';
import { PolygonLayerComponent } from './layers/polygon-layer/polygon-layer.component';
import { EventTestLayerComponent } from './layers/event-test-layer/event-test-layer.component';
import { ArcLayerComponent } from './layers/arc-layer/arc-layer.component';
import { DynamicCircleLayerComponent } from './layers/dynamic-circle-layer/dynamic-circle-layer.component';
import { SymbologyLayerComponent } from './layers/symbology-layer/symbology-layer.component';
import { PointLayerComponent } from './layers/point-layer/point-layer.component';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { TracksDialogComponent } from './layers/tracks-layer/track-dialog/track-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsFormComponent,
    TracksLayerComponent,
    TracksDialogComponent,
    BaseLayerComponent,
    DynamicEllipseLayerComponent,
    DynamicCircleLayerComponent,
    EllipseLayerComponent,
    DynamicPolylineLayerComponent,
    StaticPolylineLayerComponent,
    PolygonLayerComponent,
    StaticCircleLayerComponent,
    EventTestLayerComponent,
    ArcLayerComponent,
    SymbologyLayerComponent,
    PointLayerComponent,
    TracksDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularCesiumModule,
    MaterialModule
  ],
  entryComponents: [TracksDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
