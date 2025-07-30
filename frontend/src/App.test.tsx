import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders CI/CD PoC Frontend heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/CI\/CD PoC Frontend/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to the CI\/CD Proof of Concept application!/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders feature list', () => {
  render(<App />);
  const reactFeature = screen.getByText(/React 18 with TypeScript/i);
  const jestFeature = screen.getByText(/Jest testing framework/i);
  const githubFeature = screen.getByText(/GitHub Actions CI\/CD/i);
  const gitlabFeature = screen.getByText(/GitLab CI\/CD/i);
  const awsFeature = screen.getByText(/AWS deployment/i);
  
  expect(reactFeature).toBeInTheDocument();
  expect(jestFeature).toBeInTheDocument();
  expect(githubFeature).toBeInTheDocument();
  expect(gitlabFeature).toBeInTheDocument();
  expect(awsFeature).toBeInTheDocument();
}); 