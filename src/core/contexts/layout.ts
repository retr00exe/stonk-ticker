import { useState } from 'react';
import { AlertType, LayoutStoreType } from './layout.types';

const LayoutStore = (): LayoutStoreType => {
	const [alert_value, Alert] = useState<AlertType | null>(null);

	const resetAlert = () => Alert(null);

	return {
		alert_value,
		Alert,
		resetAlert,
	};
};

export default LayoutStore;
