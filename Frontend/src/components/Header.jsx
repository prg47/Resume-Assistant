import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../featues/auth/hooks/useAuth.js'
import './header.scss'

const Header = ({ title }) => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const handleLogoutClick = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <header className='app-header'>
            <div className='app-header__brand' onClick={() => navigate('/')}>
                <span className='app-header__logo'>IP</span>
                <span className='app-header__title'>{title || 'Interview Prep'}</span>
            </div>

            <div className='app-header__actions'>
                {user?.userName && (
                    <span className='app-header__user'>{user.userName}</span>
                )}
                <button onClick={handleLogoutClick} className='button logout-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header