import React from 'react'
import globalHook from 'use-global-hook'
import API from "../helpers/api"

const initialState = {
  user: null,
  users: []
};

const actions = {
  checkAuth: async (store) => {
    const {data: {data}} = await API.get('auth/user')
    store.setState({ user: data })
  },
  getUsers: async(store) => {
    const {data: {data}} = await API.get('admin/user')
    store.setState({
      ...store.state,
      users: data
    })
  }
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser