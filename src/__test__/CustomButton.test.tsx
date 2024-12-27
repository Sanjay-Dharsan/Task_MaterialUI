import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "../components/CustomButton.tsx"; 
import "@testing-library/jest-dom";

describe("CustomButton Component", () => {
  test("renders the CustomButton with children text", () => {
    render(<CustomButton>Test</CustomButton>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("triggers the onClick handler when clicked", () => {
    const mockOnClick = jest.fn();
    render(<CustomButton onClick={mockOnClick}>Test</CustomButton>);
    fireEvent.click(screen.getByText("Test"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});