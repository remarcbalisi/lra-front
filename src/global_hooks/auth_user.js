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
    const {data: {data}} = await API.get('admin/user');
    console.log(data);
    store.setState({
      ...store.state,
      users: data
    })
  },
  updateUser: async(store, payload) => {
    const {data: {data}} = await API.put(`admin/user/${payload.id}`, payload);
    console.log(data);
  },
  createUser: async(store, payload) => {
    const {data: {data}} = await API.post(`admin/user`, payload);
    console.log(data)
  },
  deleteUser: async (store, payload) => {
    await API.delete(`admin/user/${payload.id}`);
  }
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser