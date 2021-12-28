import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkWrapper = (func) => (arg, thunkApi) =>
  func(arg, thunkApi).catch((e) => thunkApi.rejectWithValue(e));

export const createAsyncThunkWrapped = (type, payloadCreator, options) =>
  createAsyncThunk(type, thunkWrapper(payloadCreator), options);
