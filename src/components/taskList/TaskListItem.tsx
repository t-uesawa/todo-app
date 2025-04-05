/**
 * タスクリストのひとつ表示
 */

import { Box, Card, CardActionArea, CardContent, Icon, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
	taskList: TaskList;
	setSelectedTaskListId: React.Dispatch<React.SetStateAction<string>>;
};

export const TaskListItem = ({ taskList, setSelectedTaskListId }: Props) => {
	const router = useRouter();

	return (
		<CardActionArea onClick={() => {
			setSelectedTaskListId(taskList.id);
			router.push(`taskList/${taskList.id}`)
		}}>
			<Card sx={{ height: '100%', borderRadius: '15px', backgroundColor: 'rgb(241, 240, 232)' }}>
				<CardContent sx={{ p: 2 }}>
					{/** リスト名 */}
					<Box sx={{ borderLeft: `5px solid ${taskList.listColor}` }}>
						<Typography pl={2}>{taskList.listName}</Typography>
					</Box>
					{/** タスク一覧 */}
					<Box>
						{taskList.tasks.map(task => (
							<Box key={task.id} display='flex' py={0.5}>
								<Icon fontSize='small' sx={{ mx: 0.5 }}>{task.completionStatus ? 'task_alt' : 'radio_button_unchecked'}</Icon>
								<Typography variant='body2'>{task.taskTitle}</Typography>
							</Box>
						))}
					</Box>
				</CardContent>
			</Card>
		</CardActionArea>
	)
}