const initialState = {
  id: undefined,
  email: undefined,
  displayName: undefined,
};

export const user = {
  state: initialState, // initial state
  reducers: {
    // handle state changes with pure functions
    setUser(_state, newUser) {
      return newUser;
    },
  },
  effects: (dispatch) => ({}),
};
