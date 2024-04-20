import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputData from './InputData';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking modules for tests
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(() => Promise.resolve()) 
}));

describe('InputData Component', () => {
    const mockUser = { uid: '123' };

    beforeEach(async () => {
        render(
            <Router>
                <InputData user={mockUser} />
            </Router>
        );
    });

    test('Weight input field updates on user input', async () => {
        await userEvent.type(screen.getByLabelText(/Weight:/i), '70');
        expect(screen.getByLabelText(/Weight:/i)).toHaveValue(70);
    });

    test('Gender select updates on user input', async () => {
        await userEvent.selectOptions(screen.getByLabelText(/Gender:/i), 'male');
        expect(screen.getByLabelText(/Gender:/i)).toHaveValue('male');
    });

    test('Height input field updates on user input', async () => {
        await userEvent.type(screen.getByLabelText(/Height:/i), '180');
        expect(screen.getByLabelText(/Height:/i)).toHaveValue(180);
    });

    test('Form submission triggers Firestore call with valid data', async () => {
        await userEvent.type(screen.getByLabelText(/Weight:/i), '70');
        await userEvent.selectOptions(screen.getByLabelText(/Gender:/i), 'male');
        await userEvent.type(screen.getByLabelText(/Height:/i), '180');

        userEvent.click(screen.getByRole('button', { name: /Update/i }));

        // Wait for potential Firestore calls
        await new Promise(process.nextTick);

        expect(require('firebase/firestore').setDoc).toHaveBeenCalled();
    });

    test('All inputs have initial values set correctly', () => {
        expect(screen.getByLabelText(/Weight:/i)).toHaveValue('');
        expect(screen.getByLabelText(/Gender:/i)).toHaveValue('');
        expect(screen.getByLabelText(/Height:/i)).toHaveValue('');
    });
});
