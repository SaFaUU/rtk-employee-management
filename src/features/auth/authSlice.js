import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { signOut } from "firebase/auth";

const initialState = {
    user: {
        email: "",
        role: "",
        companyName: "",
    },
    isLoading: true,
    isError: false,
    error: "",
    appliedJobFilter: "none",
}

export const signUpUser = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        return data;
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        return data;
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (email, thunkAPI) => {
        const res = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`);
        const data = await res.json();
        if (data.status) {
            return data
        }
        return email;
    }
)

export const logOut = createAsyncThunk(
    "auth/signOut",
    async () => {
        await signOut(auth);
    }
)

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async () => {
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, provider);
        return data;
    }
)



const authApi = createSlice({
    name: "auth",
    initialState,
    reducers: {
        appliedJobFilterChange: (state, action) => {
            state.appliedJobFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(signUpUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user.email = action.payload.user;
                state.isLoading = false;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.user = action.payload.data
                }
                else {
                    state.user.email = action.payload;
                }
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = {
                    email: "",
                    role: ""
                }
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    },
});
export const { appliedJobFilterChange } = authApi.actions;

export default authApi.reducer;