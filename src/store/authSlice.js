import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Фейковая база пользователей (в реальном проекте — запрос на сервер)
const fakeUsers = [
  { id: 1, username: "admin", password: "123456", name: "Админ" },
  { id: 2, username: "user", password: "qwerty", name: "Обычный пользователь" },
];

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    // Имитация задержки сервера
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = fakeUsers.find(u => u.username === username && u.password === password);

    if (!user) {
      return rejectWithValue("Неверный логин или пароль");
    }

    const userData = { id: user.id, username: user.username, name: user.name };
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password, name }, { rejectWithValue }) => {
    await new Promise(resolve => setTimeout(resolve, 700));

    // Проверка, существует ли уже такой пользователь
    if (fakeUsers.find(u => u.username === username)) {
      return rejectWithValue("Пользователь с таким логином уже существует");
    }

    const newUser = { id: Date.now(), username, password, name };
    fakeUsers.push(newUser); // только в памяти

    const userData = { id: newUser.id, username: newUser.username, name: newUser.name };
    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  }
);

export const logoutUser = () => {
  localStorage.removeItem('user');
  return { type: 'auth/logout' };
};

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;