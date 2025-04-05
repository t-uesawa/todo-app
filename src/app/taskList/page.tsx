/**
 * メインページ
 */

"use client";

import { AddTaskListDrawer } from "@/components/taskList/AddTaskListDrawer";
import { TaskListItem } from "@/components/taskList/TaskListItem";
import useBreakpoint from "@/hooks/useBreakpoints";
import { Box, CssBaseline, Fab, Fade, Grow, Icon, IconButton, Paper } from "@mui/material";
import localforage from "localforage";
import { useCallback, useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-css";
import styles from "@/app/styles/masonry.module.css";
import { useTaskLists } from "@/context/TaskListContext";
import { useMenu } from "@/context/MenuContext";

export default function TaskList() {
  const breakpoint = useBreakpoint();
  const isMdUp = useMemo(() => ['md', 'lg', 'xl'].includes(breakpoint ?? 'xs'), [breakpoint]);

  const { taskLists, refreshTaskLists } = useTaskLists();
  const { toggleMenu, selectedTaskListId, setSelectedTaskListId } = useMenu();

  // タスクリスト追加ボタンの表示制御
  const [showButton, setShowButton] = useState<boolean>(false);
  // タスクリスト作成ドロワー
  const [addTaskListDrawerOpen, setAddTaskListDrawerOpen] = useState<boolean>(false);
  const toggleAddTaskListDrawerOpen = useCallback(() => setAddTaskListDrawerOpen(true), []);
  const toggleAddTaskListDrawerClose = useCallback(() => setAddTaskListDrawerOpen(false), []);

  // タスクリストの追加関数
  const handleAddTaskList = async (newList: TaskList) => {
    const updatedLists = [...taskLists, newList];
    await localforage.setItem('taskLists', updatedLists);
    refreshTaskLists();
    toggleAddTaskListDrawerClose();
  };

  // Fabアイコンの表示遅延
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true); // 300ms 後に表示
    }, 300);
    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  console.log('レンダリング');

  if (!breakpoint) {
    return null; // 初期レンダリング時は何も表示しない
  }

  return (
    <>
      <CssBaseline />
      {/** ヘッダー(md以下) */}
      {!isMdUp &&
        <Paper elevation={8}>
          <Box height='10%' display="flex" justifyContent="space-between" alignItems="center" p={2}>
            {/** メニュー(md以下) */}
            <IconButton aria-label='menu' onClick={toggleMenu}><Icon>menu</Icon></IconButton>
          </Box>
        </Paper>
      }

      {/** メインコンテンツ */}
      <Fade in={true} timeout={800}>
        <Box height={isMdUp ? '100%' : '90%'} ml={isMdUp ? '200px' : ''} p={2} >
          {selectedTaskListId === '' && (
            <Masonry
              breakpointCols={{ default: 3, 600: 2, }} // 画面幅600px未満では1列、それ以上は2列
              className={styles.masonryGrid}
              columnClassName={styles.masonryGridColumn}
            >
              {taskLists.map(list => (
                <TaskListItem key={list.id} taskList={list} setSelectedTaskListId={setSelectedTaskListId} />
              ))}
            </Masonry>
          )}

          {/** タスクリスト追加ボタン */}
          <Grow in={showButton} timeout={500}>
            <Fab
              color="info"
              onClick={toggleAddTaskListDrawerOpen}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 16,
                display: 'flex',
                flexDirection: 'column', // 縦に並べる
                alignItems: 'center', // 中央揃え
              }}
            >
              <Icon>add</Icon>
            </Fab>
          </Grow>

          {/** タスクリスト追加ドロワー */}
          <AddTaskListDrawer
            isMdUp={isMdUp}
            open={addTaskListDrawerOpen}
            toggleDrawerOpen={toggleAddTaskListDrawerOpen}
            toggleDrawerClose={toggleAddTaskListDrawerClose}
            onAdd={handleAddTaskList}
          />
        </Box>
      </Fade>
      </>
  );
} 