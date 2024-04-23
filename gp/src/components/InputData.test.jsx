import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputData from './InputData';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(() => Promise.resolve())
}));

describe('InputData Component', () => {
    const mockUser = { uid: '123' };

    it('updates input fields and selects gender', async () => {
        render(
            <Router>
                <InputData user={mockUser} />
            </Router>
        );

        await userEvent.type(screen.getByLabelText(/Weight:/i), '70');
        expect(screen.getByLabelText(/Weight:/i)).toHaveValue(70);

        await userEvent.selectOptions(screen.getByLabelText(/Gender:/i), 'male');
        expect(screen.getByLabelText(/Gender:/i)).toHaveValue('male');

        await userEvent.type(screen.getByLabelText(/Height:/i), '180');
        expect(screen.getByLabelText(/Height:/i)).toHaveValue(180);
    });

    it('submits form with valid data', async () => {
        const { getByLabelText, getByRole } = render(
            <Router>
                <InputData user={mockUser} />
            </Router>
        );

        await userEvent.type(getByLabelText(/Weight:/i), '70');
        await userEvent.selectOptions(getByLabelText(/Gender:/i), 'male');
        await userEvent.type(getByLabelText(/Height:/i), '180');

        fireEvent.click(getByRole('button', { name: /Update/i }));

       
        expect(getByLabelText(/Weight:/i)).toHaveValue(70); 
    });
});
