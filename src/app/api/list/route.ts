/**
 * タスクリストの全取得・追加API
 */

import { addTaskList, getTaskLists } from "@/lib/localStorage";
import { NextResponse } from "next/server";

// 全取得
export async function GET() {
	// タスクリストの全取得
	const lists = await getTaskLists();
	return NextResponse.json(lists);
}

// 追加
export async function POST(req: Request) {
	try {
		const newList: TaskList = await req.json();
		await addTaskList(newList);
		return NextResponse.json(newList, { status: 200 });
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 500 });
	}
}