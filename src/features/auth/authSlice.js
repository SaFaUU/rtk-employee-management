import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { signOut } from "firebase/auth";

const initialState = {
    user: {
        email: "",
        role: ""
    },
    isLoading: true,
    isError: false,
    error: ""
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
    async (user) => {
        console.log(user);
        const data = await auth.currentUser;
        return data;
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
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user.email = action.payload.user;
            state.isLoading = false;
        })
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload.user;
            state.isLoading = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(logOut.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.error = "";
            state.user = {
                email: "",
                role: ""
            }
        })
        builder.addCase(logOut.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(googleLogin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(googleLogin.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
        })
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    },
});

export default authApi.reducer;