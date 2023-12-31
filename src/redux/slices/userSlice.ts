import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Users {
  username: String;
  surname: String;
  email: String;
  password: String;
  isPublic: Boolean;
  posts: Array;
  follower: Array;
  following: Array;
  blockList: Array;
  stories: Array;
  notifications: Array;
  bio: Object;
  id: String;
}
interface UserState {
  users: Users[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("news/fetchUsers", async () => {
  try {
    const response = await axios.get<Users[]>(
      "https://usersapi-2rke.onrender.com/users"
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});
export const deleteUsers = createAsyncThunk("news/deleteUsers", async (id) => {
  try {
    await axios.delete(`https://usersapi-2rke.onrender.com/users/${id}`);
    const response = await axios.get<Users[]>(
      "https://usersapi-2rke.onrender.com/users"
    );
    console.log(response.data);
    const updatedUsers = response.data.filter((item) => item.id !== id);
    return updatedUsers;
  } catch (error) {
    throw new Error("Failed to delete");
  }
});
export const addUser = createAsyncThunk("news/addUser", async (newItem) => {
  try {
    const response = await axios.post(
      `https://usersapi-2rke.onrender.com/users/`,
      newItem
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add");
  }
});
console.log("salam");
/////
export const addNotif = createAsyncThunk("news/addNotif", async (newItem) => {
  try {
    const response = await axios.get(
      `https://usersapi-2rke.onrender.com/users/`
    );
    const updatePromises = response.data.map(async (user: any) => {
      await axios.patch(`https://usersapi-2rke.onrender.com/users/${user.id}`, {
        notifications: [...user.notifications, newItem],
      });
    });
    await Promise.all(updatePromises);
    return response.data;
  } catch (error) {
    throw new Error("Failed");
  }
});
/////
export const deletePost = createAsyncThunk(
  "user/deletePost",
  async ({ userId, postId }) => {
    try {
      const response = await axios.get(
        `https://usersapi-2rke.onrender.com/users/${userId}`
      );
      const userData = response.data;
      const updatedPosts = userData.posts.filter(
        (post) => post.postId !== postId
      );

      await axios.patch(`https://usersapi-2rke.onrender.com/users/${userId}`, {
        posts: updatedPosts,
      });

      return { userId, postId };
    } catch (error) {
      throw error;
    }
  }
);
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNotif.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "error";
    });
    builder.addCase(deleteUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "error";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    });

    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.users = state.users.map((user) => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              posts: user.posts.filter(
                (post) => post.postId !== action.payload.postId
              ),
            };
          }
          return user;
        });
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
