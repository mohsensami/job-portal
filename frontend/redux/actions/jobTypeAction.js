import axiosInstance from "../../service/api";
import {
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobTypeConstant";

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axiosInstance.get("/api/type/jobs");
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "خطایی رخ داد";
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: errorMessage,
    });
  }
};
