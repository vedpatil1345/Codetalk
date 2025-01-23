import  {  useReducer, useEffect, memo } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './auth/UserMenu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme/ThemeToggle';
import classNames from 'classnames';
import logo from '@/assets/CodeTalk.png';

// Reducer for managing menu states
const menuReducer = (state: { isMenuOpen: boolean; isCodeRoomOpen: boolean }, action: { type: string }) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'TOGGLE_CODE_ROOM':
      return { ...state, isCodeRoomOpen: !state.isCodeRoomOpen };
    case 'CLOSE_ALL':
      return { isMenuOpen: false, isCodeRoomOpen: false };
    default:
      return state;
  }
};
const NavBar = memo(() => {
  const [state, dispatch] = useReducer(menuReducer, {
    isMenuOpen: false,
    isCodeRoomOpen: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const codeRoomTabs = [
    { path: '/playground', label: 'Overview' },
    { path: '/playground/chat', label: 'Programming with AI' },
    { path: '/playground/code-analysis', label: 'Code Analysis' },
    { path: '/playground/error-analysis', label: 'Error Analysis' },
    { path: '/playground/img-code', label: 'Image to Code' },
    { path: '/playground/code-translation', label: 'Code Translation' },
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch({ type: 'CLOSE_ALL' });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('nav')) {
        dispatch({ type: 'CLOSE_ALL' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="fixed w-full top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 p-4 backdrop-blur-md shadow-sm"
      aria-label="Main Navigation"
    >
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-bold bg-clip-text text-transparent transition-colors duration-300
                         bg-gradient-to-r from-blue-800 via-blue-800 to-blue-800
                         dark:from-blue-500 dark:via-blue-400 dark:to-blue-500 cursor-pointer my-auto"
              aria-label="Navigate to Home"
            >
              <img src={logo} alt="Logo" className="inline h-8 w-auto my-auto mr-3 mt-[-8px]" />
                CodeTalk
            </NavLink>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex md:items-center sm:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                  'dark:text-white': isActive,
                })
              }
            >
              Home
            </NavLink>
            {user && (
              <div className="relative">
                <button
                  onClick={() =>dispatch({ type: 'TOGGLE_CODE_ROOM' })
                      
                  }
                  className="flex items-center space-x-1 cursor-pointer dark:hover:text-white transition-colors"
                  aria-expanded={state.isCodeRoomOpen}
                  aria-controls="codeRoomDropdown"
                >
                  <span>CodeRoom</span>{state.isCodeRoomOpen?<ChevronUp size={16}/>:<ChevronDown size={16} />}
                  
                </button>
                {state.isCodeRoomOpen && (
                  <div
                    id="codeRoomDropdown"
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg py-1 z-50"
                  >
                    {codeRoomTabs.map((tab) => (
                      <a
                        key={tab.path}
                        onClick={() => {
                          navigate(tab.path);
                          dispatch({ type: 'TOGGLE_CODE_ROOM' });
                        }}
                        className={classNames('block px-4 py-2 text-sm cursor-pointer', {
                          'bg-gray-100 dark:bg-slate-800 dark:text-white':
                            location.pathname === tab.path,
                          'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-white':
                            location.pathname !== tab.path,
                        })}
                      >
                        {tab.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <NavLink
              to="/help"
              className={({ isActive }) =>
                classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                  'dark:text-white': isActive,
                })
              }
            >
              Help
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                  'dark:text-white': isActive,
                })
              }
            >
              Contact Us
            </NavLink>
            <ThemeToggle />
            {user ? (
              <UserMenu email={user.email || ''} />
            ) : (
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
              className="text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={state.isMenuOpen}
              aria-controls="mobileMenu"
            >
              {state.isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {state.isMenuOpen && (
          <div
            id="mobileMenu"
            className="absolute w-[40%] sm:w-[30%] right-0 mt-4 bg-gray-200/95 dark:bg-slate-900/95 p-4 md:hidden rounded-lg shadow-lg"
          >
            <div className="flex flex-col space-y-4 justify-center items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                    'dark:text-white': isActive,
                  })
                }
                onClick={() => dispatch({ type: 'CLOSE_ALL' })}
              >
                Home
              </NavLink>
              {user && (
                <div className="relative">
                  <button
                    onClick={() =>
                      dispatch({ type: 'TOGGLE_CODE_ROOM' })
                    }
                    className="flex items-center space-x-1 cursor-pointer dark:hover:text-white transition-colors"
                    aria-expanded={state.isCodeRoomOpen}
                    aria-controls="mobileCodeRoomDropdown"
                  >
                    <span>CodeRoom</span>{state.isCodeRoomOpen?<ChevronUp size={16}/>:<ChevronDown size={16} />}
                    
                  </button>
                  {state.isCodeRoomOpen && (
                    <div
                      id="mobileCodeRoomDropdown"
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-md shadow-lg py-1 z-50"
                    >
                      {codeRoomTabs.map((tab) => (
                        <a
                          key={tab.path}
                          onClick={() => {
                            navigate(tab.path);
                            dispatch({ type: 'CLOSE_ALL' });
                          }}
                          className={classNames('block px-4 py-2 text-sm cursor-pointer', {
                            'bg-gray-100 dark:bg-slate-800 dark:text-white':
                              location.pathname === tab.path,
                            'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 dark:hover:text-white':
                              location.pathname !== tab.path,
                          })}
                        >
                          {tab.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                    'dark:text-white': isActive,
                  })
                }
                onClick={() => dispatch({ type: 'CLOSE_ALL' })}
              >
                Help
              </NavLink>
              <NavLink
              to="/contact"
              className={({ isActive }) =>
                classNames('dark:text-gray-300 transition-colors cursor-pointer', {
                  'dark:text-white': isActive,
                })
              }
            >
              Contact Us
            </NavLink>
              <ThemeToggle />
              {user ? (
                <div className="flex items-center">
                  <UserMenu email={user.email || ''} />
                </div>
              ) : (
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                  onClick={() => {
                    navigate('/auth');
                    dispatch({ type: 'CLOSE_ALL' });
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

export default NavBar;
