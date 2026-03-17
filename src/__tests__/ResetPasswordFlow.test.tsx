import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

// ---- Mock Supabase auth (hoisted so vi.mock can use them) ------------------
const mockGetSession = vi.hoisted(() => vi.fn());
const mockExchangeCodeForSession = vi.hoisted(() => vi.fn());
const mockUpdateUser = vi.hoisted(() => vi.fn());
const mockOnAuthStateChange = vi.hoisted(() => vi.fn());

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      exchangeCodeForSession: mockExchangeCodeForSession,
      onAuthStateChange: mockOnAuthStateChange,
      updateUser: mockUpdateUser,
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      }),
    })),
  },
}));

// ---- Mock Toast ------------------------------------------------------------
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

// ---- Mock Language Context -------------------------------------------------
const authKeys: Record<string, string> = {
  "auth.setNewPassword": "Set New Password",
  "auth.setNewPasswordDescription": "Enter your new password below.",
  "auth.newPassword": "New Password",
  "auth.confirmPassword": "Confirm Password",
  "auth.passwordPlaceholder": "••••••••",
  "auth.updatePassword": "Update Password",
  "auth.passwordsDoNotMatch": "Passwords do not match.",
  "auth.passwordUpdated": "Password updated successfully.",
  "auth.invalidResetLink": "Invalid or Expired Link",
  "auth.invalidResetLinkDescription": "This password reset link is invalid or has expired.",
  "auth.passwordUpdateFailed": "Failed to update password.",
  "auth.samePasswordError": "New password must be different.",
  "auth.backToLogin": "Back to Login",
  "common.error": "Error",
  "common.success": "Success",
  "common.loading": "Loading",
};
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en" as const,
    t: (key: string) => authKeys[key] ?? key,
  }),
}));

function renderResetPage(initialEntry = "/reset-password") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/account" element={<div data-testid="account-page">Account</div>} />
        <Route path="/auth" element={<div data-testid="auth-page">Auth</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Reset Password Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it("shows loading state initially", async () => {
    let resolveSession: (v: unknown) => void;
    mockGetSession.mockImplementation(
      () => new Promise((resolve) => { resolveSession = resolve; })
    );

    renderResetPage("/reset-password");

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();

    resolveSession!({ data: { session: null }, error: null });
    await waitFor(() => {
      expect(screen.getByText("Invalid or Expired Link")).toBeInTheDocument();
    });
  });

  it("shows invalid link UI when no session and no code", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.queryByText("Invalid or Expired Link")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /back to login/i })).toBeInTheDocument();
  });

  it("shows invalid link UI when exchangeCodeForSession fails", async () => {
    const originalLocation = window.location;
    delete (window as unknown as { location: unknown }).location;
    window.location = { ...originalLocation, search: "?code=badcode" } as Location;

    mockExchangeCodeForSession.mockResolvedValue({ error: { message: "Invalid code" } });
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });

    renderResetPage("/reset-password?code=badcode");

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          variant: "destructive",
        })
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Invalid or Expired Link")).toBeInTheDocument();
    });

    (window as unknown as { location: Location }).location = originalLocation;
  });

  it("shows set new password form when session is valid", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.getByText("Set New Password")).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  it("validates password length (min 6 characters)", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    });

    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    await userEvent.type(newPasswordInput, "12345");
    await userEvent.type(confirmInput, "12345");
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("validates that passwords match", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    });

    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    await userEvent.type(newPasswordInput, "newpass123");
    await userEvent.type(confirmInput, "different");
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("calls updateUser and navigates to /account on success", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });
    mockUpdateUser.mockResolvedValue({ data: { user: {} }, error: null });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    });

    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    await userEvent.type(newPasswordInput, "newpass123");
    await userEvent.type(confirmInput, "newpass123");
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({ password: "newpass123" });
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Password updated successfully.",
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("account-page")).toBeInTheDocument();
    });
  });

  it("shows error toast when updateUser fails", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "user-1" } } },
      error: null,
    });
    mockUpdateUser.mockResolvedValue({
      data: { user: null },
      error: { message: "Update failed" },
    });

    renderResetPage("/reset-password");

    await waitFor(() => {
      expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    });

    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    await userEvent.type(newPasswordInput, "newpass123");
    await userEvent.type(confirmInput, "newpass123");
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: "Failed to update password.",
          variant: "destructive",
        })
      );
    });
  });
});
