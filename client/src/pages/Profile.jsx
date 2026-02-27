import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, login } = useContext(AuthContext); // Re-using login to update context user state if needed

    // Profile State
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || ''
    });
    const [profileMsg, setProfileMsg] = useState('');

    // Password State
    const [passData, setPassData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passMsg, setPassMsg] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('http://localhost:5000/api/auth/profile', profileData, {
                headers: { 'x-auth-token': token }
            });
            // Ideally update context, but for now just show success
            setProfileMsg('Profile updated successfully!');
        } catch (err) {
            setProfileMsg('Failed to update profile.');
            console.error(err);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            setPassMsg("New passwords don't match.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/profile/password', {
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            }, {
                headers: { 'x-auth-token': token }
            });
            setPassMsg('Password updated successfully!');
            setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPassMsg(err.response?.data?.message || 'Failed to update password.');
        }
    };

    return (
        <div className="profile-container">
            <h1 className="page-title">My Profile</h1>

            <div className="profile-grid">
                {/* Details Section */}
                <div className="profile-card">
                    <h2>Personal Details</h2>
                    {profileMsg && <p className={`msg ${profileMsg.includes('Success') ? 'success' : 'error'}`}>{profileMsg}</p>}
                    <form onSubmit={handleProfileUpdate}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-primary">Update Profile</button>
                    </form>
                </div>

                {/* Password Section */}
                <div className="profile-card">
                    <h2>Change Password</h2>
                    {passMsg && <p className={`msg ${passMsg.includes('Success') ? 'success' : 'error'}`}>{passMsg}</p>}
                    <form onSubmit={handlePasswordUpdate}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                value={passData.currentPassword}
                                onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={passData.newPassword}
                                onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={passData.confirmPassword}
                                onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-primary">Update Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
