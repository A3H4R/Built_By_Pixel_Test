import axios from "axios";

export const getUsers = () => {
  return axios.get("https://8ee41f94-d4f4-439d-8233-e573edca74ff.mock.pstmn.io/users").then((response) => 
    response.data.data.map((user, index) => ({
      id: index + 1,
      name: `${user.name}`,
      email: `${user.email}`,
    }))
  );
};
