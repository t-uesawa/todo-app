import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/localStorage";

// IDを指定してタスクを更新
export async function PUT(req: Request, { params }: { params: { id: string } }) {
	const { listId, updatedTask } = await req.json();
	const result = await updateTask(listId, params.id, updatedTask);
	if (!result) return NextResponse.json({ error: "タスクの更新に失敗" }, { status: 404 });
	return NextResponse.json(result);
}

// IDを指定してタスクを削除
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const { listId } = await req.json();
	await deleteTask(listId, params.id);
	return NextResponse.json({ message: "deleted" }, { status: 200 });
}
