import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import PublishRoute from "../../../pages/PublishRoute";
import { GET_CITIES, GET_USER_INFO } from "../../../graphql/queries";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";


describe("PublishRoute - rendering", () => {
  it("affiche tous les éléments clés du formulaire", async () => {
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

    expect(
      await screen.findByText("Proposez votre Grumpy Trip")
    ).toBeInTheDocument();

    // Deux selects pour villes
    const comboboxes = await screen.findAllByRole("combobox");
    expect(comboboxes.length).toBeGreaterThanOrEqual(2);

    expect(
      screen.getByRole("button", { name: /Publier mon trajet/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Quelles sont vos préférences de voyage/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Fixez votre prix par place/i)
    ).toBeInTheDocument();
  });
});
