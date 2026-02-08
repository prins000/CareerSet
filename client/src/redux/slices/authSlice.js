import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    loginTimestamp: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loginTimestamp = action.payload ? Date.now() : null;
    }
  }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;