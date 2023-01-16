import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectState } from './types';


const initialState: ProjectState = { projects: [] };

const projectsSlice = createSlice({
    name: 'projetcs',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
        },
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchProjects.pending, (state, action)=>{
                state.projects = [];
            })
            .addCase(fetchProjects.fulfilled, (state, action)=>{
                state.projects =  action.payload;
            });
    }
});

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
