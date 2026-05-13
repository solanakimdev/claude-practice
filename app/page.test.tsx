/**
 * Tests for app/page.tsx
 *
 * Home is a Client Component ('use client') that renders a centred MUI Box
 * containing an h1 Typography element with the text "Practice Claude Code".
 * MUI components are rendered as real DOM elements via React Testing Library
 * so no additional MUI mocks are required.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

// ---------------------------------------------------------------------------
// MUI v9 uses Emotion for styling. Emotion works fine in jsdom but it needs
// the document to support stylesheets. No extra mocking is required for
// structural / content tests. If snapshot/style tests are added later,
// consider wrapping renders in a CacheProvider.
// ---------------------------------------------------------------------------

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Happy path
  // -------------------------------------------------------------------------

  describe('happy path — rendering', () => {
    it('renders without throwing', () => {
      expect(() => render(<Home />)).not.toThrow();
    });

    it('displays the heading text "Practice Claude Code"', () => {
      render(<Home />);
      expect(
        screen.getByText('Practice Claude Code')
      ).toBeInTheDocument();
    });

    it('renders the heading as an h1 element', () => {
      render(<Home />);
      // MUI Typography variant="h1" renders an <h1> by default.
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Practice Claude Code');
    });

    it('wraps content inside a <main> landmark', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('contains the heading inside the <main> landmark', () => {
      render(<Home />);
      const main = screen.getByRole('main');
      expect(main).toContainElement(
        screen.getByRole('heading', { level: 1 })
      );
    });
  });

  // -------------------------------------------------------------------------
  // Structural / semantic contracts
  // -------------------------------------------------------------------------

  describe('structural contracts', () => {
    it('renders a single h1 on the page', () => {
      render(<Home />);
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
    });

    it('does not render any interactive elements (buttons, inputs, links)', () => {
      render(<Home />);
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByRole('link')).toBeNull();
    });

    it('does not render more than one main landmark', () => {
      render(<Home />);
      const mains = screen.getAllByRole('main');
      expect(mains).toHaveLength(1);
    });
  });

  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------

  describe('edge cases', () => {
    it('remains stable across multiple renders (idempotency)', () => {
      const { unmount } = render(<Home />);
      expect(screen.getByText('Practice Claude Code')).toBeInTheDocument();
      unmount();

      render(<Home />);
      expect(screen.getByText('Practice Claude Code')).toBeInTheDocument();
    });

    it('does not mutate the document title (no next/head side effects)', () => {
      const originalTitle = document.title;
      render(<Home />);
      // page.tsx has no <title> manipulation; document.title should not change.
      expect(document.title).toBe(originalTitle);
    });
  });
});
