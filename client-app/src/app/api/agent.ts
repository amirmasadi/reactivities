import axios, { AxiosResponse } from "axios";
import IActivity from "../Models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(async function (response) {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

// const responseBody = function <T>(response: AxiosResponse<T>) {
//   return response.data;
// };
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  // get: function <T>(url: string) {
  //   return axios.get<T>(url).then(responseBody);
  // },
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<IActivity[]>("/activities"),
  details: (id: string) => requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity) => requests.post<void>("/activities", activity),
  update: (activity: IActivity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
