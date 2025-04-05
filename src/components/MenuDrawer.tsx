/**
 * リストを選択するメニュードロワー
 * md以上で固定表示
 */

"use client";

import { Box, Drawer, ToggleButton, Typography } from '@mui/material';
import packageJson from '../../package.json';
import useBreakpoint from '@/hooks/useBreakpoints';
import { useMenu } from '@/context/MenuContext';
import { useTaskLists } from '@/context/TaskListContext';
import { useRouter } from 'next/navigation';

export const MenuDrawer = () => {
	const { taskLists } = useTaskLists();
	const { isOpen, closeMenu, selectedTaskListId, setSelectedTaskListId } = useMenu();
	const breakpoint = useBreakpoint();
	const router = useRouter();

	const drawer = (
		<Box width='100%' sx={{ justifylist: 'center', p: 2 }}>
			{/* ドロワー内のメニューコンテンツを配置 */}
			<Typography>タスクリスト</Typography>
			{/** すべてのリスト */}
			<ToggleButton
				fullWidth
				value=''
				selected={selectedTaskListId === ''}
				onChange={(_, val) => {
					setSelectedTaskListId(val);
					router.push(`/taskList`);
					closeMenu();
				}}
				sx={{
					mt: 2,
					border: 'none', // ボーダーを消す
					'&.Mui-selected': {
						border: 'none', // 選択時のボーダーも消す
					},
				}}
			>
				すべてのリスト
			</ToggleButton>
			{/** リスト */}
			{!taskLists.length ?
				<p>Loding...</p>
				:
				taskLists.map((list) => (
					<ToggleButton
						key={list['id']}
						fullWidth
						value={list['id']}
						selected={selectedTaskListId === list['id']}
						onChange={(_, val) => {
							setSelectedTaskListId(val);
							router.replace(`/taskList/${val}`);
							closeMenu();
						}}
						sx={{
							mt: 2,
							border: 'none', // ボーダーを消す
							'&.Mui-selected': {
								border: 'none', // 選択時のボーダーも消す
							},
						}}
					>
						<Box display='flex' width='100%'>
							{/** カラー */}
							<Box gap={1} sx={{ borderLeft: `5px solid ${list.listColor}` }}></Box>
							<Typography mx={1} gap={2} textAlign='left'>{list.listName}</Typography>
							<Typography gap={1}>{list.tasks.length ?? 0}</Typography>
						</Box>
					</ToggleButton>
				))}
			<Box
				sx={{
					position: 'fixed',
					bottom: 16,
					left: 16,
					textAlign: 'center',
					p: 2, // padding
				}}
			>
				<Typography variant="body2" textAlign="center" mt={1}>{`ver ${packageJson['version']}`}</Typography>
			</Box>
		</Box>
	);

	if (!breakpoint) {
		return null; // 初期レンダリング時は何も表示しない
	}

	return (
		<Drawer
			variant={['md', 'lg', 'xl'].includes(breakpoint) ? 'permanent' : 'temporary'}
			open={['md', 'lg', 'xl'].includes(breakpoint) || isOpen} // lg以上なら常にopen、それ以外はモバイルの開閉状態に従う
			onClose={closeMenu}
			sx={{
				minWidth: '100px',
				width: ['md', 'lg', 'xl'].includes(breakpoint) ? `${'200'}px` : 'auto', // lg以上なら固定幅
				'& .MuiDrawer-paper': {
					width: ['md', 'lg', 'xl'].includes(breakpoint) ? `${'200'}px` : 'auto', // ドロワーの幅
					boxSizing: 'border-box',
				},
			}}
		>
			{drawer}
		</Drawer>
	);
};
