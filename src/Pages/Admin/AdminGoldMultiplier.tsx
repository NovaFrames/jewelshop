import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Stack,
    Divider
} from '@mui/material';
import { Save, TrendingUp } from '@mui/icons-material';
import { getGoldMultiplier, updateGoldMultiplier } from '../../firebase/goldRateService';

const AdminGoldMultiplier: React.FC = () => {
    const [multiplier, setMultiplier] = useState<string>('1.07');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchMultiplier = async () => {
            try {
                const data = await getGoldMultiplier();
                if (data) {
                    setMultiplier(data.value.toString());
                }
            } catch (err: any) {
                setError('Failed to fetch multiplier');
            } finally {
                setLoading(false);
            }
        };

        fetchMultiplier();
    }, []);

    const handleSave = async () => {
        setError('');
        setSuccess('');
        setSaving(true);

        const value = parseFloat(multiplier);
        if (isNaN(value) || value <= 0) {
            setError('Please enter a valid positive number');
            setSaving(false);
            return;
        }

        try {
            await updateGoldMultiplier(value);
            setSuccess('Multiplier updated successfully!');
        } catch (err: any) {
            setError('Failed to update multiplier');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <TrendingUp sx={{ color: '#832729', fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#832729' }}>
                        Gold Price Multiplier
                    </Typography>
                </Stack>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Adjust the selling price multiplier for gold. This value is multiplied by the base gold rate to calculate the final selling price.
                    (e.g., 1.07 adds a 7% markup).
                </Typography>

                <Divider sx={{ mb: 4 }} />

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

                <Box sx={{ maxWidth: 400 }}>
                    <Stack spacing={3}>
                        <TextField
                            label="Selling Multiplier"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={multiplier}
                            onChange={(e) => setMultiplier(e.target.value)}
                            placeholder="e.g. 1.07"
                            inputProps={{ step: "0.01" }}
                            helperText="Current standard is 1.07"
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
                            onClick={handleSave}
                            disabled={saving}
                            sx={{ py: 1.5 }}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminGoldMultiplier;
