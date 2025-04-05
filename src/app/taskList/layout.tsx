import { MenuDrawer } from "@/components/MenuDrawer";
import { MenuProvider } from "@/context/MenuContext";
import { TaskListProvider } from "@/context/TaskListContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<TaskListProvider>
			<MenuProvider>
				<MenuDrawer />
				{children}
			</MenuProvider>
		</TaskListProvider>
	)
}