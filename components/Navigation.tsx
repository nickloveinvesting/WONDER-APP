'use client';

// Navigation is now empty - all authenticated pages use Header from layout
// This eliminates redundant auth queries and profile fetches
// The authenticated layout already provides the Header with cached profile data

export default function Navigation() {
  return null;
}
