/**
 * タスクリストのIDを指定した取得・編集・削除API
 */

import { deleteTaskList, getTaskListById, updateTaskList } from "@/lib/localStorage";
import { NextResponse } from "next/server";

// IDを指定してタスクリストを取得
export async function GET(req: Request, { params }: { params: { id: string } }) {
	const list = await getTaskListById(params.id);
	if (!list) return NextResponse.json({ error: 'タスクリストの取得に失敗' }, { status: 404 });
	return NextResponse.json(list);
}

// IDを指定してタスクリストを編集
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const updatedList = await req.json();	// 更新対象のタスクリスト
	const result = await updateTaskList(params.id, updatedList);
	if (!result) return NextResponse.json({ error: 'タスクリストの更新に失敗' }, { status: 404 });
	return NextResponse.json(result);
}

// IDを指定してタスクリストを削除
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	await deleteTaskList(params.id);
	return NextResponse.json({ message: 'deleted' }, { status: 200 });
}