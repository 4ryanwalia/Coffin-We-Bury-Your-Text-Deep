import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Send, User, LogOut, MessageSquare, Skull, Eye, EyeOff } from 'lucide-react';
import './App.css';

const API_BASE_URL = '/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [decryptedMessages, setDecryptedMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, currentUser, selectedUser]);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/current-user/`, {
        withCredentials: true
      });
      if (response.data.user) {
        setCurrentUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, loginForm, {
        withCredentials: true
      });
      if (response.data.success) {
        setCurrentUser(response.data.user);
        setIsAuthenticated(true);
        setSuccess('Login successful!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (registerForm.password !== registerForm.password_confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, registerForm, {
        withCredentials: true
      });
      if (response.data.success) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => {
          setShowLogin(true);
          setSuccess('');
        }, 2000);
      }
    } catch (error) {
      // Handle Django REST Framework validation errors
      if (error.response?.data) {
        const errorData = error.response.data;
        // If it's a single error message
        if (typeof errorData === 'string') {
          setError(errorData);
        } 
        // If it's an object with field errors
        else if (typeof errorData === 'object') {
          // Get first error message from any field
          const firstError = Object.values(errorData).flat()[0];
          setError(firstError || 'Registration failed. Please check your input.');
        } else {
          setError('Registration failed. Please check your input.');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout/`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUsers([]);
      setMessages([]);
      setSelectedUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`, {
        withCredentials: true
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async () => {
    if (!currentUser) return;
    try {
      if (selectedUser) {
        // Fetch conversation with selected user
        const response = await axios.get(`${API_BASE_URL}/conversation/${selectedUser.username}/`, {
          withCredentials: true
        });
        setMessages(response.data.messages || []);
      } else {
        // Fetch all inbox messages if no user selected
        const response = await axios.get(`${API_BASE_URL}/inbox/${currentUser.username}/`, {
          withCredentials: true
        });
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedUser || !messageText.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${API_BASE_URL}/send/`,
        {
          recipient_username: selectedUser.username,
          message: messageText
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        setMessageText('');
        setSuccess('Message sent!');
        setTimeout(() => setSuccess(''), 3000);
        fetchMessages();
      }
    } catch (error) {
      // Better error handling
      if (error.response) {
        // Server responded with error
        const errorData = error.response.data;
        if (typeof errorData === 'string') {
          setError(errorData);
        } else if (errorData.error) {
          setError(errorData.error);
        } else if (typeof errorData === 'object') {
          // Get first error message
          const firstError = Object.values(errorData).flat()[0];
          setError(firstError || 'Failed to send message');
        } else {
          setError(`Failed to send message: ${error.response.status} ${error.response.statusText}`);
        }
      } else if (error.request) {
        // Request made but no response
        setError('Failed to connect to server. Is the backend running?');
      } else {
        // Something else happened
        setError(error.message || 'Failed to send message');
      }
      console.error('Send message error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async (messageId, encryptedContent) => {
    if (decryptedMessages[messageId]) {
      const newDecrypted = { ...decryptedMessages };
      delete newDecrypted[messageId];
      setDecryptedMessages(newDecrypted);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/decrypt/`,
        { emoji_text: encryptedContent },
        { withCredentials: true }
      );
      setDecryptedMessages({
        ...decryptedMessages,
        [messageId]: response.data.message
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to decrypt message');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <div className="emoji-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-container"
        >
          <div className="auth-header">
            <Skull size={48} />
            <h1>⚰️ Coffin</h1>
            <p>We Bury Your Text Deep</p>
          </div>

          <div className="auth-tabs">
            <button
              className={showLogin ? 'active' : ''}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={!showLogin ? 'active' : ''}
              onClick={() => setShowLogin(false)}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="auth-form"
              >
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleRegister}
                className="auth-form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={registerForm.first_name}
                      onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={registerForm.last_name}
                      onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={registerForm.password_confirm}
                    onChange={(e) => setRegisterForm({ ...registerForm, password_confirm: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="alert alert-error"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="alert alert-success"
            >
              {success}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="emoji-background"></div>
      <div className="chat-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <User size={20} />
              <span>{currentUser?.username}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout" title="Logout">
              <LogOut size={18} />
            </button>
          </div>

          <div className="users-section">
            <h3>Users</h3>
            <div className="users-list">
              {users.map((user) => (
                <motion.button
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <User size={16} />
                  <span>{user.username}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-header">
            {selectedUser ? (
              <>
                <User size={20} />
                <span>Chat with {selectedUser.username}</span>
              </>
            ) : (
              <span>Select a user to start chatting</span>
            )}
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                {selectedUser ? 'No messages yet. Start the conversation!' : 'Select a user to view messages'}
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message ${message.sender.username === currentUser.username ? 'sent' : 'received'}`}
                >
                  <div className="message-header">
                    <span className="sender-name">{message.sender.username}</span>
                    <span className="message-time">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-content">
                    {decryptedMessages[message.id] ? (
                      <div className="decrypted-message">
                        {decryptedMessages[message.id]}
                      </div>
                    ) : (
                      <div className="encrypted-message">{message.encrypted_content}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDecrypt(message.id, message.encrypted_content)}
                    className="btn-decrypt"
                    title={decryptedMessages[message.id] ? 'Hide message' : 'Decrypt message'}
                  >
                    {decryptedMessages[message.id] ? <Lock size={16} /> : <Unlock size={16} />}
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {selectedUser && (
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="message-input"
              />
              <button type="submit" disabled={loading || !messageText.trim()} className="btn-send">
                <Send size={20} />
              </button>
            </form>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert alert-error"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert alert-success"
            >
              {success}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

