/**
 * 個別のタスクリスト詳細ページ
 */

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Box, CssBaseline, Fab, Fade, Grow, Icon, IconButton, Paper, TextField, Typography } from "@mui/material";
import useBreakpoint from "@/hooks/useBreakpoints";
import { useTaskLists } from "@/context/TaskListContext";
import { useMenu } from "@/context/MenuContext";
import { AddTaskDrawer } from "@/components/detailTaskList/AddTaskDrawer";
import { addTask, updateTask } from "@/lib/localStorage";
import { TaskItem } from "@/components/detailTaskList/TaskItem";
import dayjs from "dayjs";

export default function TaskDetailPage() {
	const breakpoint = useBreakpoint();
	const isMdUp = useMemo(() => ['md', 'lg', 'xl'].includes(breakpoint ?? 'xs'), [breakpoint]);

	const { id } = useParams();
	const { taskLists, refreshTaskLists } = useTaskLists();
	const { toggleMenu, selectedTaskListId, setSelectedTaskListId } = useMenu();
	const taskList = taskLists.find(list => list.id === id);

	// 実行日
	const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

	// タスクリスト追加ボタンの表示制御
	const [showButton, setShowButton] = useState<boolean>(false);

	// タスクリスト作成ドロワー
	const [addTaskDrawerOpen, setAddTaskDrawerOpen] = useState<boolean>(false);
	const toggleAddTaskDrawerOpen = useCallback(() => setAddTaskDrawerOpen(true), []);
	const toggleAddTaskDrawerClose = useCallback(() => setAddTaskDrawerOpen(false), []);

	// タスクの追加
	const handleAddTask = async (newTask: Task) => {
		if (!taskList) return;
		const resp = await addTask(taskList.id, newTask);
		if (!resp) return alert('エラー');
		refreshTaskLists();
	};

	// タスクの更新
	const handleUpdatedTask = async (newTask: Task) => {
		if (!taskList) return;
		const resp = await updateTask(taskList.id, newTask.id, newTask);
		if (!resp) return alert('エラー');
		refreshTaskLists();
	}

	// const handleDeleteTask = async (taskId: string) => {
	// 	if (!taskList) return;
	// 	const updatedTasks = taskList.tasks.filter((task) => task.id !== taskId);
	// 	const updatedList = { ...taskList, tasks: updatedTasks };

	// 	const storedLists: TaskList[] = (await localforage.getItem("taskLists")) || [];
	// 	const newLists = storedLists.map((list) => (list.id === id ? updatedList : list));
	// 	await localforage.setItem("taskLists", newLists);

	// 	setTaskList(updatedList);
	// };

	// Fabアイコンの表示遅延
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowButton(true); // 300ms 後に表示
		}, 300);
		return () => clearTimeout(timer); // クリーンアップ
	}, []);

	if (!taskList) return <p>Loading...</p>;

	return (
		<Box maxWidth='md' mx='auto'>
			<CssBaseline />
			{/** ヘッダー(md以下) */}
			{!isMdUp &&
				<Paper elevation={8}>
					<Box height='10%' display="flex" justifyContent="space-between" alignItems="center" p={2}>
						{/** メニュー(md以下) */}
						<IconButton aria-label='menu' onClick={toggleMenu}><Icon>menu</Icon></IconButton>
					</Box>
				</Paper>
			}

			{/** メインコンテンツ */}
			<Fade in={true} timeout={800}>
				<Box height={isMdUp ? '100%' : '90%'} ml={isMdUp ? '200px' : ''} p={2}>
					<Box display='flex' justifyContent='space-between'>
						{/** リスト名 */}
						<Box alignItems='center' sx={{ borderLeft: `5px solid ${taskList.listColor}` }}>
							<Typography pl={2}>{taskList.listName}</Typography>
						</Box>
						{/** 実行日 */}
						<TextField type='date' size='small' value={date} onChange={e => setDate(e.target.value)} />
					</Box>

					{/** Todo */}
					<Typography variant='body1'>Todo</Typography>
					{taskList.tasks
						.filter(task => task.taskType === 'todo')
						.map(task => (
							<TaskItem key={task.id} task={task} date={date} onUpdate={handleUpdatedTask} />
						))}

					{/** Routine */}
					<Typography variant='body1'>Routine</Typography>
					{taskList.tasks
						.filter(task => task.taskType === 'routine')
						.map(task => (
							<TaskItem key={task.id} task={task} date={date} onUpdate={handleUpdatedTask} />
						))}

					{/** タスク追加ボタン */}
					<Grow in={showButton} timeout={500}>
						<Fab
							color="info"
							onClick={toggleAddTaskDrawerOpen}
							sx={{
								position: 'fixed',
								bottom: 24,
								right: 16,
								display: 'flex',
								flexDirection: 'column', // 縦に並べる
								alignItems: 'center', // 中央揃え
							}}
						>
							<Icon>add</Icon>
						</Fab>
					</Grow>

					{/** タスクリスト追加ドロワー */}
					<AddTaskDrawer
						isMdUp={isMdUp}
						open={addTaskDrawerOpen}
						toggleDrawerOpen={toggleAddTaskDrawerOpen}
						toggleDrawerClose={toggleAddTaskDrawerClose}
						onAdd={handleAddTask}
					/>
				</Box>
			</Fade>
		</Box>
	);
}