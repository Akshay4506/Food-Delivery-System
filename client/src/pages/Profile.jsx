import { useState, useContext } from 'react';
import axios from 'axios';
import { UserCircle, KeyRound, Save } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, login } = useContext(AuthContext);

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
            setProfileMsg('Profile updated successfully!');
            setTimeout(() => setProfileMsg(''), 3000);
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
            setTimeout(() => setPassMsg(''), 3000);
        } catch (err) {
            setPassMsg(err.response?.data?.message || 'Failed to update password.');
        }
    };

    return (
        <div className="profile-container">
            <div className="page-header">
                <h1 className="page-title">My Profile</h1>
                <p>Manage your account settings and preferences</p>
            </div>

            <div className="profile-grid">
                {/* Details Section */}
                <div className="profile-card">
                    <div className="card-header">
                        <UserCircle className="card-icon" size={24} />
                        <h2>Personal Details</h2>
                    </div>
                    {profileMsg && <div className={`alert-msg ${profileMsg.includes('Success') || profileMsg.includes('successfully') ? 'success' : 'error'}`}>{profileMsg}</div>}

                    <form onSubmit={handleProfileUpdate} className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-save">
                            <Save size={18} /> Update Profile
                        </button>
                    </form>
                </div>

                {/* Password Section */}
                <div className="profile-card">
                    <div className="card-header">
                        <KeyRound className="card-icon" size={24} />
                        <h2>Change Password</h2>
                    </div>
                    {passMsg && <div className={`alert-msg ${passMsg.includes('Success') || passMsg.includes('successfully') ? 'success' : 'error'}`}>{passMsg}</div>}

                    <form onSubmit={handlePasswordUpdate} className="profile-form">
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={passData.currentPassword}
                                onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={passData.newPassword}
                                onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={passData.confirmPassword}
                                onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn-save btn-secondary">
                            <KeyRound size={18} /> Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
