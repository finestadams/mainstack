import { render, screen, fireEvent } from "@testing-library/react";
import { Filter } from "./Filter";

describe("Filter Component", () => {
  const mockSetIsSheetOpen = jest.fn();
  const mockOnApplyFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Filter button", () => {
    render(
      <Filter
        isSheetOpen={false}
        setIsSheetOpen={mockSetIsSheetOpen}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("opens the filter sheet when the Filter button is clicked", () => {
    render(
      <Filter
        isSheetOpen={false}
        setIsSheetOpen={mockSetIsSheetOpen}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    fireEvent.click(screen.getByText("Filter"));
    expect(mockSetIsSheetOpen).toHaveBeenCalledWith(true);
  });

  it("resets filters when the Clear button is clicked", () => {
    render(
      <Filter
        isSheetOpen={true}
        setIsSheetOpen={mockSetIsSheetOpen}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(mockOnApplyFilters).not.toHaveBeenCalled();
  });
});
