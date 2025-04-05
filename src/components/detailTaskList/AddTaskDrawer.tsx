/**
 * タスクの作成・編集ドロワー
 */

"use client";

import { useMenu } from "@/context/MenuContext";
import { getTodayDateTime } from "@/lib/dateUtils";
import { Box, Fab, FormControl, FormControlLabel, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, SwipeableDrawer, Switch, TextField } from "@mui/material"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
	isMdUp: boolean;
	open: boolean;
	toggleDrawerOpen: () => void;
	toggleDrawerClose: () => void;
	onAdd: (newList: Task) => void;
}

export const AddTaskDrawer = (props: Props) => {
	const { selectedTaskListId } = useMenu();

	// タスク名
	const [taskName, setTaskName] = useState<string>('');
	// タスクタイプ
	const [taskType, setTaskType] = useState<Task['taskType']>('todo');
	// 周期有無(ルーティン)
	const [cycleFlag, setCycleFlag] = useState<boolean>(false);
	// 周期
	const [cycleNum, setCycleNum] = useState<string>('');
	// 周期タイプ
	const [cycleType, setCycleType] = useState<Task['cycleType']>('');
	// メモ
	const [memo, setMemo] = useState<string>('');

	// 保存処理
	const handleSave = async () => {
		// 入力値✓
		if (!taskName) return alert('タスク名が入力されていません。');
		if (!taskType) return alert('タスクタイプが選択されていません。');
		if (cycleFlag) {
			if (!cycleNum || cycleNum === '0') return alert('周期(数値)が入力されていません。');
			if (!cycleType) return alert('周期(種別)が選択されていません。');
		}

		// ローカルストレージ更新
		const newTask: Task = {
			id: uuidv4(),
			listId: selectedTaskListId,
			taskTitle: taskName,
			taskType,
			cycleFlag,
			cycleNum,
			cycleType,
			completionStatus: false,
			memo,
			history: [],
			createAt: getTodayDateTime(),
		};
		props.onAdd(newTask);
		props.toggleDrawerClose();
	};

	// 編集処理
	// useEffect(() => {
	// 	if (props.selelctedList) {
	// 		if (listName.current) listName.current.value = 'aaa';
	// 	}
	// }, [props.selelctedList]);

	return (
		<SwipeableDrawer
			anchor={props.isMdUp ? 'right' : 'bottom'}
			open={props.open}
			onClose={props.toggleDrawerClose}
			onOpen={props.toggleDrawerOpen}
		>
			<Box display='flex' flexDirection='column' height='80vh' minWidth='30vw' mx='auto' m={4}>
				{/** タスク名 */}
				<FormControl sx={{ my: 2 }}>
					<FormLabel id="task-name-label">タスク名</FormLabel>
					<TextField
						fullWidth
						aria-labelledby='task-name-label'
						variant='standard'
						value={taskName}
						onChange={e => setTaskName(e.target.value)}
					/>
				</FormControl>
				{/** タスク種別 */}
				<FormControl sx={{ my: 2 }}>
					<FormLabel id="task-type-radio-buttons-group-label">タスク種別</FormLabel>
					<RadioGroup
						row
						aria-labelledby="task-type-radio-buttons-group-label"
						name="task-type-radio-buttons-group"
						value={taskType}
						onChange={e => setTaskType(e.target.value as Task['taskType'])}
					>
						<FormControlLabel value='todo' control={<Radio />} label='Todo' />
						<FormControlLabel value='routine' control={<Radio />} label='Routine' />
					</RadioGroup>
				</FormControl>
				{/** (Routine)周期 */}
				{taskType === 'routine' && (
					<>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								my: 2
							}}
						>
							<InputLabel>ルーティン周期を設定する</InputLabel>
							<Switch checked={cycleFlag} onChange={() => setCycleFlag(!cycleFlag)} />
						</Box>
						{cycleFlag && (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'right',
									alignItems: 'center',
								}}
							>
								<TextField
									fullWidth
									size='small'
									type="number"
									variant="outlined"
									value={cycleNum}
									onChange={(e) => {
										const value = e.target.value;
										if (value === "") {
											setCycleNum("");
										} else {
											const parsed = parseInt(value, 10);
											if (!isNaN(parsed)) {
												setCycleNum(value);
											}
										}
									}}
									sx={{ maxWidth: '25%' }}
								/>
								<Select fullWidth size='small' id="cycle-type-select" variant="outlined" value={cycleType} onChange={(e) => setCycleType(e.target.value as '年' | '月' | '週' | '日' | '')} sx={{ maxWidth: '25%' }}>
									{/* <MenuItem value=""></MenuItem> */}
									<MenuItem value="年">年</MenuItem>
									<MenuItem value="月">月</MenuItem>
									<MenuItem value="週">週</MenuItem>
									<MenuItem value="日">日</MenuItem>
								</Select>
							</Box>
						)}
					</>
				)}
				{/** メモ */}
				<FormControl sx={{ my: 2 }}>
					<FormLabel id="task-memo-label">メモ</FormLabel>
					<TextField
						fullWidth
						multiline
						rows={2}
						variant='standard'
						value={memo}
						onChange={(e) => setMemo(e.target.value)}
						aria-labelledby='task-memo-label'
					/>
				</FormControl>
			</Box>

			{/** 保存ボタン */}
			<Fab
				color="info"
				onClick={handleSave}
				sx={{
					position: 'fixed',
					bottom: 24,
					right: 16,
					display: 'flex',
					flexDirection: 'column', // 縦に並べる
					alignItems: 'center', // 中央揃え
				}}
			>
				<Icon>check</Icon>
			</Fab>
		</SwipeableDrawer>
	)
}