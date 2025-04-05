/**
 * メニュードロワーを共有
 */

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MenuContextType = {
	isOpen: boolean;
	toggleMenu: () => void;
	closeMenu: () => void;
	selectedTaskListId: string;
	setSelectedTaskListId: React.Dispatch<React.SetStateAction<string>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTaskListId, setSelectedTaskListId] = useState<string>('');

	const toggleMenu = () => setIsOpen((prev) => !prev);
	const closeMenu = () => setIsOpen(false);

	return (
		<MenuContext.Provider value={{ isOpen, toggleMenu, closeMenu, selectedTaskListId, setSelectedTaskListId }}>
			{children}
		</MenuContext.Provider>
	);
};

export const useMenu = () => {
	const context = useContext(MenuContext);
	if (!context) throw new Error("useMenu must be used within a MenuProvider");
	return context;
};
