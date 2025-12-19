import React, { useRef, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';

interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, length = 6, disabled = false }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return; // Only allow digits

        // Use a padded array to ensure indices are preserved
        const currentOTP = value.padEnd(length, ' ').split('');
        const digit = val.slice(-1);

        currentOTP[index] = digit || ' ';

        const finalValue = currentOTP.join('');
        onChange(finalValue);

        // Move to next input if digit was entered
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            const currentOTP = value.padEnd(length, ' ').split('');
            if (!currentOTP[index].trim() && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
        if (pastedData) {
            onChange(pastedData);
            // Focus the box after the last pasted digit or the last box
            const nextIndex = Math.min(pastedData.length, length - 1);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <Stack direction="row" spacing={1} justifyContent="center" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={(value[index] || '').trim()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    disabled={disabled}
                    variant="outlined"
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            padding: '12px 12px',
                            width: '40px',
                            height: '25px'
                        },
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            '&.Mui-focused fieldset': {
                                borderColor: '#832729',
                            },
                        },
                    }}
                />
            ))}
        </Stack>
    );
};

export default OTPInput;
