"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Kiểm tra đăng nhập khi tải component
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const user = JSON.parse(userData);
      setUser(user);
      
      // Kiểm tra role và chuyển hướng nếu cần
      if (user.role === '0') {
        router.push('/admin/dashboard');
      } else {
        router.push('/account');
      }
    } else {
      setUser(null);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setShowForm(false);
        setError("");
        
        if (data.user.role === '0') {
          router.push('/admin/dashboard');
        } else {
          router.push('/account');
        }
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setError('Đã có lỗi xảy ra');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          fullname: fullname
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        setShowForm(false);
        setError("");
        router.push('/account');
      } else {
        setError(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      setError('Đã có lỗi xảy ra');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSidebarOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative">
      {/* Top bar - Ẩn trên mobile */}
      <div className="bg-black text-white py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>Hotline: (+84) 313-728-397</span>
            <span>Email: info@vclock.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-red-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-red-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-red-400">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`bg-black shadow-md sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'md:shadow-lg' : ''
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Menu button - Chỉ hiện trên mobile */}
            <button 
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu"
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* Logo - Căn giữa */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img src="/logoV.png" alt="Logo" className="w-60 h-60" />
            </Link>

            {/* Icons bên phải */}
            <div className="flex items-center space-x-6 ml-auto">
              {/* Search bar - Ẩn trên mobile */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="bg-transparent border-none focus:outline-none w-40 lg:w-64 text-sm"
                />
                <button className="text-gray-500 hover:text-red-600">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              
              {/* Giỏ hàng */}
              <Link href="/cart" className="relative group">
                <i className="fas fa-shopping-bag text-xl text-gray-700 group-hover:text-red-600 transition-colors"></i>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
              
              {/* Tài khoản */}
              {user ? (
                <Link href="/account" className="ml-2">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.fullname || user.username} 
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-user text-gray-600"></i>
                    </div>
                  )}
                </Link>
              ) : (
                <button 
                  onClick={() => setShowForm(true)}
                  className="ml-2 text-sm font-medium hover:text-red-600 hidden md:block"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
          
          {/* Search bar mobile - Hiển thị dưới header */}
          <div className="md:hidden mt-3">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="bg-transparent border-none focus:outline-none w-full text-sm"
              />
              <button className="text-gray-500">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar cho mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b">
            {user ? (
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.fullname || user.username} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="fas fa-user text-gray-600"></i>
                  </div>
                )}
                <div>
                  <p className="font-medium">{user.fullname || user.username}</p>
                  <p className="text-sm text-gray-500">Tài khoản của tôi</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">Xin chào!</p>
                <button 
                  onClick={() => {
                    setShowForm(true);
                    setSidebarOpen(false);
                  }}
                  className="text-blue-600 text-sm"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            )}
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li><Link href="/" className="block py-2 hover:text-red-600" onClick={() => setSidebarOpen(false)}>Trang chủ</Link></li>
              <li><Link href="/products" className="block py-2 hover:text-red-600" onClick={() => setSidebarOpen(false)}>Sản phẩm</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-red-600" onClick={() => setSidebarOpen(false)}>Giới thiệu</Link></li>
              <li><Link href="/contact" className="block py-2 hover:text-red-600" onClick={() => setSidebarOpen(false)}>Liên hệ</Link></li>
              {user && (
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-600 hover:underline"
                  >
                    Đăng xuất
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Form đăng nhập/đăng ký */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowForm(false)}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            
            <div className="p-6">
              {!isRegister ? (
                <>
                  <h3 className="text-2xl font-bold text-center mb-2">Đăng nhập</h3>
                  <p className="text-gray-500 text-center mb-6">Đăng nhập để mua hàng và theo dõi đơn của bạn</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Email hoặc số điện thoại"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <span className="ml-2 text-sm">Ghi nhớ đăng nhập</span>
                      </label>
                      <a href="#" className="text-sm text-red-600 hover:underline">Quên mật khẩu?</a>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                    
                    {error && (
                      <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                    )}
                  </form>
                  
                  <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-4 text-sm text-gray-500">hoặc</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <i className="fab fa-google text-red-500"></i>
                      <span>Tiếp tục với Google</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <i className="fab fa-facebook text-blue-600"></i>
                      <span>Tiếp tục với Facebook</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">Chưa có tài khoản? </span>
                    <button 
                      type="button" 
                      className="text-red-600 font-medium hover:underline"
                      onClick={() => setIsRegister(true)}
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-center mb-2">Đăng ký tài khoản</h3>
                  <p className="text-gray-500 text-center mb-6">Tạo tài khoản để mua hàng nhanh hơn</p>
                  
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                        Tôi đồng ý với <a href="#" className="text-red-600 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-red-600 hover:underline">Chính sách bảo mật</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
                    
                    {error && (
                      <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                    )}
                  </form>
                  
                  <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">Đã có tài khoản? </span>
                    <button 
                      type="button" 
                      className="text-red-600 font-medium hover:underline"
                      onClick={() => setIsRegister(false)}
                    >
                      Đăng nhập ngay
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
