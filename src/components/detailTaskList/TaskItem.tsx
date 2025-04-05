/**
 * ルーティンタスク
 */

"use client";

import { Box, Chip, Grid, Icon, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";

type Props = {
	task: Task;
	date: string;
	onUpdate: (newTask: Task) => void;
}

export const TaskItem = ({ task, date, onUpdate }: Props) => {
	// タスクの実行日を更新
	const handleUpdatedTaskHistory = () => {
		// タスク種別で処理を分ける
		if (task.taskType === 'todo') {
			// 「Todo」なら現在のステータスが「true」だったら履歴をクリア、そうでなければ履歴を追加
			if (task.completionStatus) {
				const newTask: Task = { ...task, completionStatus: false, history: [] };
				onUpdate(newTask);
			} else {
				const newTask: Task = { ...task, completionStatus: true, history: [date] };
				onUpdate(newTask);
			}
		}
	};

	return (
		<Box>
			<Grid container>
				{/** タイトル(TOP)と最終日(CEMTER)と経過時間(BUTTOM) */}
				<Grid item xs={10}>
					<Box
						textAlign="left"
						pl={2}
					>
						{/** タスク名 */}
						<Typography variant='body2'>{task.taskTitle}</Typography>
						{/** 各種時間(履歴がある場合) */}
						{task.history.length > 0 ? (
							<Box display="flex" alignItems="center" gap={1}>
								{task.taskType === 'todo' ? (
									<>
										{/** 実行日 */}
										<Chip color="info" label="実行日" size='small' sx={{ fontSize: '10px' }} />
										<Typography variant='caption' color='textSecondary'>{dayjs(task.history[0]).format('YYYY年MM月DD日')}</Typography>
									</>
								) : (
									<>
										{/** 経過時間 */}
										<Chip color="info" label="経過" size='small' sx={{ fontSize: 'small' }} />
										<Typography variant='caption' color='textSecondary'>{`${dayjs().diff(dayjs(task.history[0]), 'day')}日`}</Typography>
										{/** 残り時間(期限設定している場合) */}
										{task.cycleType && (
											<>
												<Chip color="warning" label="残り" size='small' />
												<Typography variant='caption' color='textSecondary'>
													{`${dayjs(task.history[0])
														.add(Number(task.cycleNum), task.cycleType === '年' ? 'year' : task.cycleType === '月' ? 'month' : task.cycleType === '週' ? 'week' : 'day')
														.diff(dayjs(), 'day')}日`}
												</Typography>
											</>
										)}
									</>
								)}
							</Box>
						) : (
							<Typography variant='caption' color='textSecondary'>まだ実行してません!</Typography>
						)}
					</Box>
				</Grid>
				{/** チェックボックス(右端) */}
				<Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						aria-label={`routine-${task.id}`}
						onClick={(e) => {
							e.stopPropagation();
							handleUpdatedTaskHistory();
						}}
					>
						{task.taskType === 'todo' ? (
							task.completionStatus ? (
								<Icon aria-label={`routine-${task.id}`} style={{ color: 'red' }}>
									check_circle_outline
								</Icon>
							) : (
								<Icon aria-label={`routine-uncheck-${task.id}`} style={{ color: 'blue' }}>
									radio_button_unchecked
								</Icon>
							)
						) : (
							task.history.includes(date) ? (
								<Icon aria-label={`routine-${task.id}`} style={{ color: 'red' }}>
									check_circle_outline
								</Icon>
							) : (
								<Icon aria-label={`routine-uncheck-${task.id}`} style={{ color: 'blue' }}>
									radio_button_unchecked
								</Icon>
							)
						)}
					</IconButton>
				</Grid>
			</Grid>
		</Box>
	);
}