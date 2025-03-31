import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import AppsMenu from "./AppMenu";

describe("AppsMenu Component", () => {
  const mockOnAppSelect = jest.fn();

  beforeEach(() => {
    mockOnAppSelect.mockClear();
  });

  it("renders all apps with their names and descriptions", () => {
    render(<AppsMenu onAppSelect={mockOnAppSelect} />);

    expect(screen.getByText("Link in Bio")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("Media Kit")).toBeInTheDocument();
    expect(screen.getByText("Invoicing")).toBeInTheDocument();
    expect(screen.getByText("Bookings")).toBeInTheDocument();

    expect(screen.getByText("Manage your Link in Bio")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your Store activities")
    ).toBeInTheDocument();
    expect(screen.getByText("Manage your Media Kit")).toBeInTheDocument();
    expect(screen.getByText("Manage your Invoices")).toBeInTheDocument();
    expect(screen.getByText("Manage your Bookings")).toBeInTheDocument();
  });

  it("calls onAppSelect with the correct app name when an app is clicked", () => {
    render(<AppsMenu onAppSelect={mockOnAppSelect} />);

    fireEvent.click(screen.getByText("Link in Bio"));

    expect(mockOnAppSelect).toHaveBeenCalledWith("Link in Bio");

    fireEvent.click(screen.getByText("Store"));

    expect(mockOnAppSelect).toHaveBeenCalledWith("Store");
  });
});
