import React, { useContext, createContext } from 'react';
import LayoutStore from './layout';
import { LayoutStoreType } from './layout.types';

interface ContextType {
	layout: LayoutStoreType;
}

const AppContext = createContext<ContextType | null>({} as ContextType);

interface Props {
	children: React.ReactNode;
}

const AppProvider = ({ children }: Props): JSX.Element => (
	<AppContext.Provider
		value={{
			layout: LayoutStore(),
		}}
	>
		{children}
	</AppContext.Provider>
);

export default AppProvider;

export const useLayout = (): LayoutStoreType => useContext(AppContext).layout;
