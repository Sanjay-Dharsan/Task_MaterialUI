import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Input from "../components/Input.tsx";

test("renders the Input component with correct placeholder and type", () => {
  render(<Input placeholder="Enter your name" type="text" />);
  const inputElement = screen.getByPlaceholderText("Enter your name");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "text");
});

test("toggles password visibility when the icon is clicked", () => {
  render(<Input placeholder="Enter your password" type="password" />);
  const inputElement = screen.getByPlaceholderText("Enter your password");
  const toggleButton = screen.getByRole("button", { name: /toggle password visibility/i });

  
  expect(inputElement).toHaveAttribute("type", "password");

 
  fireEvent.click(toggleButton);
  expect(inputElement).toHaveAttribute("type", "text");

  
  fireEvent.click(toggleButton);
  expect(inputElement).toHaveAttribute("type", "password");
});

test("displays error text when errorText prop is provided", () => {
  render(<Input placeholder="Enter your name" errorText="This field is required" />);
  const errorTextElement = screen.getByText("This field is required");
  expect(errorTextElement).toBeInTheDocument();
  expect(errorTextElement).toHaveClass("text-red-500");
});