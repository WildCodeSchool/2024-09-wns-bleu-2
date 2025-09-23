import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import PublishRoute from "../../../pages/PublishRoute";
import { GET_CITIES, GET_USER_INFO } from "../../../graphql/queries";
import { CREATE_CARPOOL } from "../../../graphql/mutations";
import "@testing-library/jest-dom/vitest";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  },
}));

describe("PublishRoute - form submission", () => {
  it("remplit et soumet le formulaire avec succès", async () => {
    const mocks = [
      {
        request: { query: GET_CITIES },
        result: {
          data: {
            getCities: [
              { id: "1", name: "Paris" },
              { id: "2", name: "Lyon" },
            ],
          },
        },
      },
      {
        request: { query: GET_USER_INFO },
        result: {
          data: {
            getUserInfo: { id: 1, __typename: "User" },
          },
        },
      },
      {
        request: {
          query: CREATE_CARPOOL,
          variables: {
            data: {
              departure_city: "Paris",
              arrival_city: "Lyon",
              departure_date: "2025-04-05",
              departure_time: "12:00:00",
              num_passenger: 1,
              price: 10,
              toll: false,
              duration: 90,
              options: [],
              driver_id: 1,
            },
          },
        },
        result: {
          data: {
            createCarpool: {
              id: 123,
              __typename: "Carpool",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <PublishRoute />
        </BrowserRouter>
      </MockedProvider>
    );

    const departureSelect = await screen.findAllByRole("combobox");
    fireEvent.change(departureSelect[0], { target: { value: "Paris" } });
    fireEvent.change(departureSelect[1], { target: { value: "Lyon" } });

    const timeInput = screen.getByTestId(
      "departure-time-picker"
    ) as HTMLInputElement;
    fireEvent.focus(timeInput);
    fireEvent.change(timeInput, { target: { value: "12:00" } });

    const incrementBtn = screen.getByRole("button", {
      name: "Augmenter le prix",
    });

    for (let i = 1; i < 11; i++) {
      fireEvent.click(incrementBtn);
    }

    expect(screen.getByTestId("price-value")).toHaveValue(10 + " €");

    const selects = screen.getAllByRole("combobox");

    const durationHours = selects[3];
    fireEvent.change(durationHours, { target: { value: "1" } });

    const durationMinutes = selects[4];
    fireEvent.change(durationMinutes, { target: { value: "30" } });

    const publishBtn = screen.getByRole("button", {
      name: /publier mon trajet/i,
    });
    fireEvent.click(publishBtn);
  });

  it("affiche un message d'erreur si des champs sont vides", async () => {
    const mocks = [
      {
        request: { query: GET_CITIES },
        result: {
          data: {
            getCities: [
              { id: "1", name: "Paris" },
              { id: "2", name: "Lyon" },
            ],
          },
        },
      },
      {
        request: { query: GET_USER_INFO },
        result: {
          data: {
            getUserInfo: { id: 1, __typename: "User" },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <PublishRoute />
        </BrowserRouter>
      </MockedProvider>
    );

    const publishBtn = await screen.findByRole("button", {
      name: /publier mon trajet/i,
    });

    fireEvent.click(publishBtn);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        "Merci de remplir tous les champs !"
      );
    });
  });
});
