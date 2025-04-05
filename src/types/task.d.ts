// リスト
declare type TaskList = {
	id: string;	// uuid
	listName: string;	// リスト名
	listColor: string;	// リストカラー
	tasks: Task[];  // タスク
	createAt: string; // 作成日時
};

// タスク
declare type Task = {
	id: string;
	listId: string; // リストId
	taskTitle: string; // タスク名
	taskType: 'todo' | 'routine'; // タスク種別
	cycleFlag: boolean; // 周期有無(routine only)
	cycleNum: string; // 周期(数値)(routine only)
	cycleType: "年" | "月" | "週" | "日" | ""; // 周期(routine only)
	completionStatus: boolean;	// 完了状況(todo only)
	memo: string;
	history: string[]; // 実行履歴(日付)
	createAt: string;
};