import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), warning: vi.fn(), error: vi.fn() },
}));
const { toast } = await import("react-toastify");

vi.mock("../../../utils/format.utils", () => ({
  formatDate: vi.fn(() => "2025-04-05"),
  formatTime: vi.fn(() => "12:00:00"),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return { ...actual, useNavigate: () => vi.fn() };
});

const mutateSpy = vi.fn((args?: any) => {
  args?.onCompleted?.({ createCarpool: { id: 123, __typename: "Carpool" } });
  return Promise.resolve({
    data: { createCarpool: { id: 123, __typename: "Carpool" } },
  });
});

vi.mock("../../../generated/graphql-types", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../../generated/graphql-types")
  >();
  return {
    ...actual,
    useGetUserInfoQuery: () => ({
      data: { getUserInfo: { id: 1, __typename: "User" } },
    }),
    useCreateCarpoolMutation: () => [mutateSpy, { data: undefined }] as const,
    useGetCitiesLazyQuery: () => {
      const trigger = vi.fn();
      return [
        trigger,
        {
          data: {
            getCities: [
              { id: "1", name: "Paris" },
              { id: "2", name: "Lyon" },
            ],
          },
        },
      ] as const;
    },
  };
});

import PublishRoute from "../../../pages/PublishRoute";

afterEach(() => {
  vi.clearAllMocks();
});

describe("PublishRoute", () => {
  it("remplit et soumet le formulaire avec succès", async () => {
    render(<PublishRoute />);

    fireEvent.change(screen.getByLabelText(/ville de départ/i), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText(/ville d'arrivée/i), {
      target: { value: "Lyon" },
    });

    const plus = screen.getByRole("button", { name: /augmenter le prix/i });
    for (let i = 0; i < 10; i++) fireEvent.click(plus);
    expect(screen.getByTestId("price-value")).toHaveValue("10 €");

    const time = screen.getByPlaceholderText("08:30") as HTMLInputElement;
    fireEvent.change(time, { target: { value: "12:00" } });

    fireEvent.click(
      screen.getByRole("button", { name: /publier mon trajet/i })
    );

    await waitFor(() => expect(mutateSpy).toHaveBeenCalledTimes(1));
    expect(toast.success).toHaveBeenCalledWith("Trajet bien publié !");
  });

  it("affiche un message d'erreur si des champs sont vides", async () => {
    render(<PublishRoute />);

    fireEvent.click(
      screen.getByRole("button", { name: /publier mon trajet/i })
    );

    await waitFor(() =>
      expect(toast.warning).toHaveBeenCalledWith(
        "Merci de remplir tous les champs !"
      )
    );
  });
});
