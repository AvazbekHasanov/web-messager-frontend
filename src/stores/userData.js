import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: null,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    },
    isLoggedIn: false,
  }),

  getters: {
    getUser(state) {
      return state.user ?? {};
    },
  },

  actions: {
    login(userData) {
      this.user = userData;
      this.isLoggedIn = true;
    },

    setters(field, value, is_param_object = false) {
    return new Promise((resolve) => {
        if (!is_param_object) {
        this.user[field] = value;
        } else {
        this.user = value;
        }

        console.log("come to setter", this.user);
        resolve(this.user); // Resolve the updated user object
    });
    },


    logout() {
      this.user = {
        id: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
      };
      this.isLoggedIn = false;
    },
  },
});
