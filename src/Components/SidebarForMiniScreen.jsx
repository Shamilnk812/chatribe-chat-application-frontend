import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiLogOut, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { RiUserSearchLine } from 'react-icons/ri';



const SidebarForMiniScreen = ({setIsSidebarOpen, handleLogout}) => {

    const location = useLocation()
    
    const sidebarVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        },
        exit: {
            x: '-100%',
            opacity: 0,
            transition: {
                ease: 'easeInOut',
                duration: 0.3
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const menuItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + i * 0.1,
                ease: 'easeOut'
            }
        })
    };

    const menuItems = [
        {
            path: '/home',
            name: 'Home',
            icon: <RiUserSearchLine className="w-6 h-6" />,
            active: location.pathname === '/home'
        },
        {
            path: '/chat',
            name: 'Chat',
            icon: <FiMessageSquare className="w-6 h-6" />,
            active: location.pathname === '/chat'
        },
        {
            action: handleLogout,
            name: 'Logout',
            icon: <FiLogOut className="w-6 h-6" />
        }
    ];
    return (

       <AnimatePresence>
      
          <>
            <motion.div
              key="overlay"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.div
              key="sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-full bg-gradient-to-b from-indigo-200 to-white shadow-xl"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-10 pb-2 border-b border-gray-400">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <nav className="flex-1 space-y-4">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={menuItemVariants}
                    >
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`flex items-center p-4 rounded-xl text-lg font-medium transition-all ${item.active
                              ? 'bg-indigo-100 text-indigo-600 shadow-md'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-500'
                            }`}
                        >
                          <span className="mr-4">{item.icon}</span>
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            item.action();
                            setIsSidebarOpen(false);
                          }}
                          className="flex items-center w-full p-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-500 transition-all"
                        >
                          <span className="mr-4">{item.icon}</span>
                          {item.name}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-auto pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center text-gray-500 text-sm">
                    Chatribe
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
      
      </AnimatePresence>
    )
}

export default SidebarForMiniScreen
