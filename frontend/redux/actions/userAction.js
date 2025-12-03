import { toast } from "react-toastify";
import {
  ALL_USER_LOAD_FAIL,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  USER_APPLY_JOB_FAIL,
  USER_APPLY_JOB_REQUEST,
  USER_APPLY_JOB_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../constants/userConstant";
import axiosInstance from "../../service/api";

export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axiosInstance.post("/api/signin", user);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    toast.success("ورود با موفقیت انجام شد!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

//log out action
export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = await axiosInstance.get("/api/logout");
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("خروج با موفقیت انجام شد!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

//user profile action
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await axiosInstance.get("/api/me");
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: USER_LOAD_FAIL,
      payload: errorMessage,
    });
  }
};

//all user action
export const allUserAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_LOAD_REQUEST });
  try {
    const { data } = await axiosInstance.get("/api/allusers");
    dispatch({
      type: ALL_USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: ALL_USER_LOAD_FAIL,
      payload: errorMessage,
    });
  }
};

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
  dispatch({ type: USER_APPLY_JOB_REQUEST });
  try {
    const { data } = await axiosInstance.post("/api/user/jobhistory", job);

    dispatch({
      type: USER_APPLY_JOB_SUCCESS,
      payload: data,
    });
    toast.success("درخواست برای این شغل با موفقیت ثبت شد!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: USER_APPLY_JOB_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};
