/**
 * localforageを用いたデータ管理
 */

import localforage from "localforage";

const STORAGE_KEY = "taskLists";

// タスクリスト全取得
export const getTaskLists = async (): Promise<TaskList[]> => {
	return (await localforage.getItem<TaskList[]>(STORAGE_KEY)) || [];
};

// タスクリストをIDで取得
export const getTaskListById = async (id: string): Promise<TaskList | null> => {
	const lists = await getTaskLists();
	return lists.find((list) => list.id === id) || null;
};

// タスクリストを保存
export const saveTaskLists = async (lists: TaskList[]) => {
	await localforage.setItem(STORAGE_KEY, lists);
};

// タスクリストを追加
export const addTaskList = async (list: TaskList) => {
	const lists = await getTaskLists();
	lists.push(list);
	await saveTaskLists(lists);
};

// タスクリストを編集
export const updateTaskList = async (id: string, updatedList: TaskList) => {
	const lists = await getTaskLists();
	const index = lists.findIndex((list) => list.id === id);
	if (index === -1) return null;
	lists[index] = updatedList;
	await saveTaskLists(lists);
	return updatedList;
};

// タスクリストを削除
export const deleteTaskList = async (id: string) => {
	const lists = await getTaskLists();
	const filteredLists = lists.filter((list) => list.id !== id);
	await saveTaskLists(filteredLists);
};

// タスクを追加
export const addTask = async (listId: string, addTask: Task) => {
	const lists = await getTaskLists();
	const list = lists.find((list) => list.id === listId);
	if (!list) return null;

	list.tasks.push(addTask);
	await saveTaskLists(lists);
	return addTask;
};

// タスクを更新
export const updateTask = async (listId: string, taskId: string, updatedTask: Task) => {
	const lists = await getTaskLists();
	const list = lists.find((list) => list.id === listId);
	if (!list) return null;

	const taskIndex = list.tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1) return null;

	list.tasks[taskIndex] = updatedTask;
	await saveTaskLists(lists);
	return updatedTask;
};

// タスクを削除
export const deleteTask = async (listId: string, taskId: string) => {
	const lists = await getTaskLists();
	const list = lists.find((list) => list.id === listId);
	if (!list) return null;

	list.tasks = list.tasks.filter((task) => task.id !== taskId);
	await saveTaskLists(lists);
};
