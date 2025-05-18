import '../lib/immer';

import { configureStore, createSlice } from '@reduxjs/toolkit';

export class Task {
   id: string;
   subject: string;
   description: string;

   constructor(subject: string, description: string) {
      this.id = String(Date.now());
      this.subject = subject;
      this.description = description;
   }
};

export type TaskState = {
   tasks: Map<string, Task>;
}

const initialState: TaskState = { tasks: new Map() };

const taskSlice = createSlice({
   name: 'task',
   initialState: initialState,
   reducers: {
      add(state, action) {
         const newTask = new Task(action.payload.subject, action.payload.description);

         state.tasks.set(newTask.id, newTask);
      },

      remove(state, action) {
         state.tasks.delete(action.payload.id);
      }
   }
});

const store = configureStore({
   reducer: { task: taskSlice.reducer },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredPaths: ['task.tasks'],
            // optionally ignore specific actions too
            ignoredActionPaths: ['meta.arg', 'payload'], // optional
         },
      }),
});

export const taskActions = taskSlice.actions;
export default store;
