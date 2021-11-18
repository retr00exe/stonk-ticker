import { EnumType } from '@components/_shared/AlertHandler';

export interface LayoutStoreType {
	alert_value: AlertType | null;
	Alert(arg0: AlertType | null): void;
	resetAlert(): void;
}

export interface AlertType {
	type?: EnumType;
	message: string;
}
