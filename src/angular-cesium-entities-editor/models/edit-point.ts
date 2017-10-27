import { AcEntity } from '../../angular-cesium/models/ac-entity';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { PointProps } from './polyline-edit-options';

export class EditPoint extends AcEntity {
	static counter = 0;
	private id: string;
	private editedEntityId: string;
	private position: Cartesian3;
	private _virtualEditPoint: boolean;
	private pointProps: PointProps;
	
	constructor(entityId: string, position: Cartesian3, pointProps?: PointProps) {
		super();
		this.editedEntityId = entityId;
		this.position = position;
		this.id = this.generateId();
		this.pointProps = pointProps;
	}
	
	getPointProps() {
		return this.pointProps;
	}
	
	setPointProps(props: PointProps) {
		this.pointProps = props;
	}
	
	isVirtualEditPoint(): boolean {
		return this._virtualEditPoint;
	}
	
	setVirtualEditPoint(value: boolean) {
		this._virtualEditPoint = value;
	}
	
	getEditedEntityId(): string {
		return this.editedEntityId;
	}
	
	getPosition(): Cartesian3 {
		return this.position;
	}
	
	setPosition(position: Cartesian3) {
		this.position.x = position.x;
		this.position.y = position.y;
		this.position.z = position.z;
	}
	
	getId(): string {
		return this.id;
	}
	
	private generateId(): string {
		return 'edit-point-' + EditPoint.counter++;
	}
}
