import React from 'react'
import globalHook from 'use-global-hook'
import API from "../helpers/api"

const initialState = {
  user: null,
};

const actions = {
  checkAuth: async (store) => {
    const {data: {data}} = await API.get('auth/user')
    store.setState({ user: data })
  }
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser