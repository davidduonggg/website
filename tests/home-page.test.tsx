import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home-page";

vi.mock("@/components/signal-field", () => ({
  SignalField: () => <div data-testid="signal-field" />,
}));

describe("HomePage", () => {
  it("renders the primary personal site sections", () => {
    render(<HomePage resumeHref="https://example.com/current-resume.pdf" />);

    expect(screen.getByRole("heading", { name: "David Duong" })).toBeInTheDocument();
    expect(screen.getByText("I build backend systems, infrastructure, and data platforms.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View experience" })).toHaveAttribute("href", "#experience");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "https://example.com/current-resume.pdf");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. Computer Science, UC Irvine/)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Notes and signals" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/davidduonggg",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:davidduonggg@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/dduong7/",
    );
  });

  it("shows the internship experience", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Ticketmaster" })).toBeInTheDocument();
    expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
    expect(screen.getByText("October 2026 - Present")).toBeInTheDocument();
    expect(screen.getByText("Interning on the Cassandra infrastructure team.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "First American" })).toBeInTheDocument();
    expect(screen.getByText("June 2026 - August 2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Temco Logistics" })).toBeInTheDocument();
    expect(screen.getAllByText("Data Engineer Intern")).toHaveLength(2);
    expect(screen.getByText("March 2026 - June 2026")).toBeInTheDocument();
    expect(screen.queryByText("24M+ row comparisons")).not.toBeInTheDocument();
  });

  it("shows technical skills", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
    expect(screen.getByText(/Python, Go, SQL/)).toBeInTheDocument();
    expect(screen.getByText(/Spark, Arrow, PostgreSQL/)).toBeInTheDocument();
    expect(screen.getByText(/Databricks, Lakebase, Lakeflow/)).toBeInTheDocument();
    expect(screen.getByText(/Git, GitHub Actions, Docker/)).toBeInTheDocument();
  });
});
