// 今日の日付を 'YYYY-MM-DD' 形式で取得する関数
export const getTodayDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1する
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export const getTodayDateTime = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1する
	const day = String(today.getDate()).padStart(2, "0");
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");
	const seconds = String(today.getSeconds()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getTodayTime = () => {
	const today = new Date();
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");
	const seconds = String(today.getSeconds()).padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
};

// 現在日時を指定フォーマットで返す関数🐸
export const getFormatTodayDateTime = (
	format: "YYYYMMDDHHMM" | "YYYYMMDD" | "YYYYMM" | "YYYY" | "MM" | "DD"
) => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1する
	const day = String(today.getDate()).padStart(2, "0");
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");
	const seconds = String(today.getSeconds()).padStart(2, "0");

	switch (format) {
		case "YYYYMMDDHHMM":
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		case "YYYYMMDD":
			return `${year}-${month}-${day}`;
		case "YYYYMM":
			return `${year}-${month}`;
		case "YYYY":
			return `${year}`;
		case "MM":
			return `${month}`;
		case "DD":
			return `${day}`;
		default:
			return "";
	}
};

// 受け取った年月の月初と月末を返す関数🐼
export const getMonthStartAndEnd = (
	ym: string
): { start: string; end: string } => {
	const now = new Date(ym);
	// 月初めの日付
	const start = new Date(now.getFullYear(), now.getMonth(), 1);
	// 月末の日付
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	// YYYY-MM-DD 形式に変換.
	const formatDate = (date: Date): string =>
		`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
			2,
			"0"
		)}-${String(date.getDate()).padStart(2, "0")}`;
	return {
		start: formatDate(start),
		end: formatDate(end),
	};
};
