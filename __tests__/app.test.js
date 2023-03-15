import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import App from "../App";

jest.mock("axios");

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Vehicle MOT & Tax Status")).toBeTruthy();
  });

  it("displays an error if the number plate input is empty", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("Enter number plate");
    const button = getByText("Check Vehicle Status");

    fireEvent.press(button);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(0);
      expect(axios.post).toHaveBeenCalledTimes(0);
    });

    expect(input).toHaveProp("value", "");
  });

  it("fetches and displays vehicle data", async () => {
    const motResponse = {
      data: [
        {
          status: "Valid",
          notes: "No issues found",
        },
      ],
    };

    const taxResponse = {
      data: {
        taxStatus: "Untaxed",
      },
    };

    axios.get.mockResolvedValueOnce(motResponse);
    axios.post.mockResolvedValueOnce(taxResponse);

    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("Enter number plate");
    const button = getByText("Check Vehicle Status");

    fireEvent.changeText(input, "AB12CDE");
    fireEvent.press(button);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(getByText("MOT Status: Valid")).toBeTruthy();
    expect(getByText("MOT Notes: No issues found")).toBeTruthy();
    expect(getByText("Tax Status: Untaxed")).toBeTruthy();
  });
});
