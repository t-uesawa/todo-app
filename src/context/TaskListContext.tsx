/**
 * 全タスクリストを共有
 */

"use client";

import { getTaskLists } from "@/lib/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

type TaskListContextType = {
	taskLists: TaskList[];
	refreshTaskLists: () => void;
};

const TaskListContext = createContext<TaskListContextType | undefined>(undefined);

export function TaskListProvider({ children }: { children: React.ReactNode }) {
	const [taskLists, setTaskLists] = useState<TaskList[]>([]);

	const loadTaskLists = async () => {
		console.log('get task lists');
		const storedLists = await getTaskLists();
		setTaskLists(storedLists);
	};

	useEffect(() => {
		loadTaskLists();
	}, []);

	return (
		<TaskListContext.Provider value={{ taskLists, refreshTaskLists: loadTaskLists }}>
			{children}
		</TaskListContext.Provider>
	);
}

export function useTaskLists() {
	const context = useContext(TaskListContext);
	if (!context) {
		throw new Error("useTaskLists must be used within a TaskListProvider");
	}
	return context;
}