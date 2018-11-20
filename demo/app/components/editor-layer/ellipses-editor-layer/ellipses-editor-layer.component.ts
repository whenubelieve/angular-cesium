import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EllipseEditorObservable } from '../../../../../src/angular-cesium-widgets/models/ellipse-editor-observable';
import { EllipseEditUpdate } from '../../../../../src/angular-cesium-widgets/models/ellipse-edit-update';
// tslint:disable-next-line:max-line-length
import { EllipsesEditorService } from '../../../../../src/angular-cesium-widgets/services/entity-editors/ellipses-editor/ellipses-editor.service';
import { LabelProps } from '../../../../../src/angular-cesium-widgets/models/label-props';
import { CoordinateConverter } from '../../../../../src/angular-cesium';

@Component({
  selector: 'ellipses-editor-layer',
  templateUrl: 'ellipses-editor-layer.component.html',
  styleUrls: ['./ellipses-editor-layer.component.css'],
  providers: [EllipsesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsesEditorLayerComponent implements OnInit {
  editing$: EllipseEditorObservable;
  enableEditing = true;

  constructor(private ellipsesEditor: EllipsesEditorService, private coordinateConverter: CoordinateConverter) {}

  ngOnInit(): void {}

  startEdit() {
    if (this.editing$) {
      this.stopEdit();
    }
    this.editing$ = this.ellipsesEditor.create();
    this.editing$.setLabelsRenderFn((update: EllipseEditUpdate) => {
      const newLabels: LabelProps[] = [];
      newLabels.push(
        { text: '' },
        {
          text: Math.round(update.majorRadius / 1000).toString() + 'Km',
          scale: 0.5,
          // eyeOffset: new Cesium.Cartesian3(10, 10, -1000),
          fillColor: Cesium.Color.BLUE,
        },
      );

      if (update.minorRadius > 0) {
        newLabels.push({
          text: Math.round(update.minorRadius / 1000).toString() + 'Km',
          scale: 0.5,
          // eyeOffset: new Cesium.Cartesian3(10, 10, -1000),
          fillColor: Cesium.Color.BLUE,
        });
      }
      return newLabels;
    });
  }

  stopEdit() {
    if (this.editing$) {
      this.editing$.dispose();
      this.editing$ = undefined;
    }
  }

  editFromExisting() {
    if (this.editing$) {
      this.stopEdit();
    }
    this.editing$ = this.ellipsesEditor.edit(Cesium.Cartesian3.fromDegrees(-70, 0), 800000, 20, 400000);
    this.editing$.setLabelsRenderFn((update: EllipseEditUpdate) => {
      const newLabels: LabelProps[] = [];
      newLabels.push(
        { text: '' },
        {
          text: Math.round(update.majorRadius / 1000).toString() + 'Km',
          scale: 0.3,
          // eyeOffset: new Cesium.Cartesian3(10, 10, -1000),
          fillColor: Cesium.Color.BLUE,
        },
      );

      if (update.minorRadius > 0) {
        newLabels.push({
          text: Math.round(update.minorRadius / 1000).toString() + 'Km',
          scale: 0.3,
          // eyeOffset: new Cesium.Cartesian3(10, 10, -1000),
          fillColor: Cesium.Color.BLUE,
        });
      }
      return newLabels;
    });
  }

  toggleEnableEditing() {
    // Only effects if in edit mode (all polygon points were created)
    if (!this.editing$) {
      return;
    }
    this.enableEditing = !this.enableEditing;
    if (this.enableEditing) {
      this.editing$.enable();
    } else {
      this.editing$.disable();
    }
  }

  updateEllipseManually() {
    if (this.editing$) {
      this.editing$.setManually(Cesium.Cartesian3.fromDegrees(-80, 0), 500000, 300000);
    }
  }
}
