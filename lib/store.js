"use client"

import { configureStore, createSlice } from "@reduxjs/toolkit"

// Create a slice for form data
const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    industry: "",
    message: "",
    submitted: false,
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
    submitForm: (state) => {
      state.submitted = true
    },
    resetForm: (state) => {
      state.name = ""
      state.email = ""
      state.industry = ""
      state.message = ""
      state.submitted = false
    },
  },
})

// Create a slice for UI state
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    darkMode: false,
    menuOpen: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
    closeMenu: (state) => {
      state.menuOpen = false
    },
  },
})

export const { updateField, submitForm, resetForm } = formSlice.actions
export const { toggleDarkMode, toggleMenu, closeMenu } = uiSlice.actions

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    ui: uiSlice.reducer,
  },
})
