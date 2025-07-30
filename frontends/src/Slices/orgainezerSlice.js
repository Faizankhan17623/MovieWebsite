import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orgainezer: null, // Initial state for orgainezer
    loading: false, // Initial loading state
}

const orgainezerSlice = createSlice({
    name: "Orgainezer",
    initialState: initialState,
    reducers: {
        // Define your reducers here
        setOrgainezer: (state, action) => {
            state.orgainezer = action.payload;
        },
        clearOrgainezer: (state) => {
            state.orgainezer = null;
        },
        setLoading: (state, value) => {
            state.loading = value.payload;
        }
    },
});

export const { setOrgainezer, clearOrgainezer, setLoading } = orgainezerSlice.actions;

export default orgainezerSlice.reducer;