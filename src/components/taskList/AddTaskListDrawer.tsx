/**
 * タスクリストの作成・編集ドロワー
 */

import { getTodayDateTime } from "@/lib/dateUtils";
import { Box, Fab, Icon, SwipeableDrawer, TextField } from "@mui/material"
import { useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
	isMdUp: boolean;
	open: boolean;
	toggleDrawerOpen: () => void;
	toggleDrawerClose: () => void;
	onAdd: (newList: TaskList) => void;
};

export const AddTaskListDrawer = (props: Props) => {
	// リスト名
	const listName = useRef<HTMLInputElement | null>(null);
	// カラー
	const listColor = useRef<HTMLInputElement | null>(null);

	// 保存処理
	const handleSave = useCallback(async () => {
		if (!listName.current || !listName.current.value) return alert('リスト名が入っていない');
		if (!listColor.current || !listColor.current.value) return alert('リストカラーが設定されてない');

		// ローカルストレージ更新
		const newTaskList: TaskList = {
			id: uuidv4(),
			listName: listName.current.value,
			listColor: listColor.current.value,
			tasks: [],
			createAt: getTodayDateTime(),
		};
		props.onAdd(newTaskList);
	}, [props]);

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
			<Box height='80vh' minWidth='30vw' mx='auto' m={4}>
				{/** リスト名 */}
				<TextField
					fullWidth
					variant='standard'
					inputRef={listName}
					defaultValue={listName.current?.value ?? ''}
					placeholder='リスト名'
					sx={{ my: 2 }}
				/>
				{/** リストカラー */}
				<TextField
					type='color'
					inputRef={listColor}
					defaultValue='#000000'
					sx={{ width: '100px', my: 2 }}
				/>
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