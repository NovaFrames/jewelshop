// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, ConfirmationResult } from 'firebase/auth';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

interface UserData {
    uid: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    createdAt: string;
    addresses?: Address[];
}

interface Address {
    id: string;
    type: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    phone: string;
}

interface AuthContextType {
    currentUser: User | null;
    userData: UserData | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
    sendOTP: (phoneNumber: string, recaptchaContainer: string) => Promise<ConfirmationResult>;
    verifyOTP: (confirmationResult: ConfirmationResult, code: string, name?: string, email?: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from Firestore
    const fetchUserData = async (uid: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data() as UserData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Sign up new user
    const signup = async (email: string, password: string, name: string, phone: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile with display name
            await updateProfile(user, { displayName: name });

            // Create user document in Firestore
            const newUserData: UserData = {
                uid: user.uid,
                name,
                email,
                phone,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=832729&color=fff&size=200`,
                createdAt: new Date().toISOString(),
                addresses: [],
            };

            await setDoc(doc(db, 'users', user.uid), newUserData);
            setUserData(newUserData);
        } catch (error: any) {
            console.error('Signup error:', error);
            throw new Error(error.message || 'Failed to create account');
        }
    };

    // Login existing user
    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await fetchUserData(userCredential.user.uid);
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Failed to login');
        }
    };

    // Send OTP to phone number
    const sendOTP = async (phoneNumber: string, recaptchaContainer: string): Promise<ConfirmationResult> => {
        try {
            // Format phone number to include country code if not present
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

            // Create RecaptchaVerifier
            const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
                size: 'invisible',
            });

            // Send OTP
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
            return confirmationResult;
        } catch (error: any) {
            console.error('Send OTP error:', error);
            throw new Error(error.message || 'Failed to send OTP');
        }
    };

    // Verify OTP and login/signup user
    const verifyOTP = async (confirmationResult: ConfirmationResult, code: string, name?: string, email?: string) => {
        try {
            const result = await confirmationResult.confirm(code);
            const user = result.user;

            // Check if user exists in Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (!userDoc.exists()) {
                // New user - create profile
                const newUserData: UserData = {
                    uid: user.uid,
                    name: name || 'User',
                    email: email || '',
                    phone: user.phoneNumber || '',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=832729&color=fff&size=200`,
                    createdAt: new Date().toISOString(),
                    addresses: [],
                };

                await setDoc(doc(db, 'users', user.uid), newUserData);
                setUserData(newUserData);

                // Update profile with display name
                if (name) {
                    await updateProfile(user, { displayName: name });
                }
            } else {
                // Existing user - fetch data
                await fetchUserData(user.uid);
            }
        } catch (error: any) {
            console.error('Verify OTP error:', error);
            throw new Error(error.message || 'Invalid OTP');
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await signOut(auth);
            setUserData(null);
        } catch (error: any) {
            console.error('Logout error:', error);
            throw new Error(error.message || 'Failed to logout');
        }
    };

    // Update user data in Firestore
    const updateUserData = async (data: Partial<UserData>) => {
        if (!currentUser) return;

        try {
            const updatedData = { ...userData, ...data };
            await setDoc(doc(db, 'users', currentUser.uid), updatedData, { merge: true });
            setUserData(updatedData as UserData);
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    };

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserData(user.uid);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        userData,
        loading,
        login,
        signup,
        sendOTP,
        verifyOTP,
        logout,
        updateUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
