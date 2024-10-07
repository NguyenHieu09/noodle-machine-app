import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';

interface UserInfo {
    fullName: string;
    birthday: string;
    gender: string;
    department: string;
    cupNoodles: number; // Số ly mì còn lại trong từng tháng của người dùng
}

interface UserState {
    userInfo: UserInfo | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    userInfo: null,
    status: 'idle',
    error: null,
};

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId: string, { rejectWithValue }) => {
        try {
            console.log('Fetching user with ID:', userId); // Log userId
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                return rejectWithValue('No user found with the given ID');
            }

            const userData = userDoc.data() as UserInfo;
            console.log('User data:', userData); // Log user data

            return userData;
        } catch (error) {
            console.error('Error fetching user:', error); // Log error
            return rejectWithValue('Failed to fetch user information');
        }
    }
);

export const updateUserCupNoodles = createAsyncThunk(
    'user/updateUserCupNoodles',
    async ({ userId, cupsToBuy }: { userId: string; cupsToBuy: number }, { rejectWithValue }) => {
        try {
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                return rejectWithValue('User not found');
            }

            const userData = userDoc.data() as UserInfo;
            const newCupNoodles = userData.cupNoodles - cupsToBuy;

            // Kiểm tra xem người dùng có đủ ly mì để mua không
            if (newCupNoodles < 0) {
                return rejectWithValue('Not enough cup noodles available');
            }

            // Cập nhật số lượng ly mì mới
            await updateDoc(userDocRef, { cupNoodles: newCupNoodles });

            return { ...userData, cupNoodles: newCupNoodles };
        } catch (error) {
            console.error('Error updating user cup noodles:', error);
            return rejectWithValue('Failed to update cup noodles');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateUserCupNoodles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserCupNoodles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(updateUserCupNoodles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;