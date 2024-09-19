// slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Định nghĩa kiểu dữ liệu cho thông tin người dùng
interface UserInfo {
    fullName: string;
    birthday: string;
    gender: string;
    department: string;
}

// Định nghĩa kiểu dữ liệu cho trạng thái của người dùng
interface UserState {
    userInfo: UserInfo | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Đặt giá trị mặc định cho trạng thái người dùng
const initialState: UserState = {
    userInfo: null,
    status: 'idle',
    error: null,
};

// Tạo một async thunk để lấy thông tin người dùng từ Firestore
export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId: string, { rejectWithValue }) => {
        try {
            const q = query(collection(firestore, 'users'), where('id', '==', userId));
            const querySnapshot = await getDocs(q);
            const userData = querySnapshot.docs.map(doc => doc.data());

            // Kiểm tra nếu không tìm thấy người dùng và ném lỗi
            if (userData.length === 0) {
                return rejectWithValue('No user found with the given ID');
            }

            return userData[0] as UserInfo;
        } catch (error) {
            return rejectWithValue('Failed to fetch user information');
        }
    }
);

// Tạo slice cho người dùng
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
                state.error = action.payload as string; // Lấy thông điệp lỗi từ action.payload
            });
    },
});

export default userSlice.reducer;
