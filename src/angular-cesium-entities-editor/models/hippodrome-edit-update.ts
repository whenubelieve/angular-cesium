import { EditPoint } from './edit-point';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { BasicEditUpdate } from './basic-edit-update';
import { HippodromeEditOptions } from './hippodrome-edit-options';

export interface HippodromeEditUpdate extends BasicEditUpdate {
	positions?: Cartesian3[];
	updatedPosition?: Cartesian3;
	draggedPosition?: Cartesian3;
	points?: EditPoint[];
	updatedPoint?: EditPoint;
	hippodromeOptions?: HippodromeEditOptions
}
