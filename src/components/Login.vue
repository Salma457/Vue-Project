<!-- 
  <template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>Log in to your account</h2>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form" novalidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              :class="{'is-invalid': errors.email}"
              placeholder="Enter your email"
              required
              @input="validateEmail"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              :class="{'is-invalid': errors.password}"
              placeholder="Enter your password"
              required
              minlength="6"
              @input="validatePassword"
            />
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          
          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </button>
          
          <div class="invalid-feedback" v-if="errors.login" style="text-align: center; margin-bottom: 15px;">
  {{ errors.login }}
</div>

          <div class="login-footer">
            <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
            <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
          </div>
        </form>
        
        <div class="social-login">
          <p class="divider"><span>or continue with</span></p>
          <div class="social-buttons">
            <button class="social-button google">
              <img src="@/assets/Google_Icons-09-512.webp" alt="Google" />
              Google
            </button>
            <button class="social-button facebook">
              <img src="@/assets/download.png" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
   
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errors: {
          email: '',
          password: '',
          login: ''
        }
      }
    },
    methods: {
      validateEmail() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!this.email) {
          this.errors.email = 'Email is required'
        } else if (!re.test(this.email)) {
          this.errors.email = 'Please enter a valid email'
        } else {
          this.errors.email = ''
        }
      },
      validatePassword() {
        if (!this.password) {
          this.errors.password = 'Password is required'
        } else if (this.password.length < 6) {
          this.errors.password = 'Password must be at least 6 characters'
        } else {
          this.errors.password = ''
        }
      },
      handleLogin() {
        this.validateEmail()
        this.validatePassword()
        
        if (this.errors.email || this.errors.password) {
          return
        }
  
        // جلب جميع المستخدمين المسجلين
        const registeredUsers = JSON.parse(localStorage.getItem('users')) || []
        
        // البحث عن المستخدم
        const user = registeredUsers.find(u => u.email === this.email)
        
        if (!user) {
          this.errors.login = 'Email not found. Please register first.'
          return
        }
        
        // في تطبيق حقيقي، هنا ستقارن بكلمة مرور مشفرة
        if (user.password !== this.password) {
          this.errors.login = 'Incorrect password'
          return
        }
        
        // تخزين بيانات المستخدم الحالي
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        // توجيه المستخدم للصفحة الرئيسية
        this.$router.push('/')
      }
    }
  }
  </script>
  
  <style scoped>
  /* أنماط Bootstrap المطلوبة */
  .invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
  }
  
  .is-invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  
  .spinner-border {
    vertical-align: text-bottom;
  }
  
  /* باقي الأنماط الأصلية تبقى كما هي */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px);
    padding: 40px 20px;
    background-color: #f8f9fa;
  }
  
  .login-card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px);
    padding: 40px 20px;
    background-color: #f8f9fa;
  }
  
  .login-card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .login-header h2 {
    font-size: 1.8rem;
    color: #2d3748;
    font-weight: 600;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #ff5a5f;
  }
  
  .login-button {
    width: 100%;
    padding: 14px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .login-button:hover {
    background-color: #e04a50;
  }
  
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.95rem;
    color: #718096;
  }
  
  .login-footer a {
    color: #ff5a5f;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password {
    display: block;
    margin-top: 12px;
    color: #718096;
    font-size: 0.9rem;
  }
  
  .social-login {
    margin-top: 32px;
    border-top: 1px solid #e2e8f0;
    padding-top: 32px;
  }
  
  .divider {
    text-align: center;
    position: relative;
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
  
  .divider span {
    background: white;
    padding: 0 10px;
    position: relative;
    top: -12px;
  }
  
  .social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .social-button:hover {
    border-color: #cbd5e0;
  }
  
  .social-button img {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    .login-card {
      padding: 30px 20px;
    }
    
    .social-buttons {
      grid-template-columns: 1fr;
    }
  }  </style> -->


  <template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>Log in to your account</h2>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form" novalidate>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              :class="{'is-invalid': errors.email}"
              placeholder="Enter your email"
              required
              @input="validateEmail"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              :class="{'is-invalid': errors.password}"
              placeholder="Enter your password"
              required
              minlength="6"
              @input="validatePassword"
            />
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          
          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </button>
          
          <div class="invalid-feedback" v-if="errors.login" style="text-align: center; margin-bottom: 15px;">
            {{ errors.login }}
          </div>
  
          <div class="login-footer">
            <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
            <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
          </div>
        </form>
        
        <div class="social-login">
          <p class="divider"><span>or continue with</span></p>
          <div class="social-buttons">
            <button class="social-button google" @click="loginWithGoogle">
              <img src="@/assets/Google_Icons-09-512.webp" alt="Google" />
              Google
            </button>
            <button class="social-button facebook" @click="loginWithFacebook">
              <img src="@/assets/download.png" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        errors: {
          email: '',
          password: '',
          login: ''
        }
      }
    },
    methods: {
      validateEmail() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!this.email) {
          this.errors.email = 'Email is required'
        } else if (!re.test(this.email)) {
          this.errors.email = 'Please enter a valid email'
        } else {
          this.errors.email = ''
        }
      },
      validatePassword() {
        if (!this.password) {
          this.errors.password = 'Password is required'
        } else if (this.password.length < 6) {
          this.errors.password = 'Password must be at least 6 characters'
        } else {
          this.errors.password = ''
        }
      },
      async handleLogin() {
        this.validateEmail()
        this.validatePassword()
        
        if (this.errors.email || this.errors.password) {
          return
        }
  
        this.isLoading = true
        this.errors.login = ''
  
        try {
          // جلب جميع المستخدمين المسجلين
          const registeredUsers = JSON.parse(localStorage.getItem('users')) || []
          
          // البحث عن المستخدم
          const user = registeredUsers.find(u => u.email === this.email)
          
          if (!user) {
            this.errors.login = 'Email not found. Please register first.'
            return
          }
          
          // في تطبيق حقيقي، هنا ستقارن بكلمة مرور مشفرة
          if (user.password !== this.password) {
            this.errors.login = 'Incorrect password'
            return
          }
          
          // تخزين بيانات المستخدم الحالي
          localStorage.setItem('currentUser', JSON.stringify(user))
          
          // توجيه المستخدم للصفحة الرئيسية
          this.$router.push('/')
        } catch (error) {
          console.error('Login error:', error)
          this.errors.login = 'An error occurred during login'
        } finally {
          this.isLoading = false
        }
      },
      loginWithGoogle() {
        // يمكنك إضافة منطق تسجيل الدخول بـ Google هنا
        console.log('Login with Google')
        // في الواقع: ستستخدم Firebase أو مكتبة أخرى للمصادقة
      },
      loginWithFacebook() {
        // يمكنك إضافة منطق تسجيل الدخول بـ Facebook هنا
        console.log('Login with Facebook')
        // في الواقع: ستستخدم Firebase أو مكتبة أخرى للمصادقة
      }
    }
  }
  </script>
  
  <style scoped>
  /* أنماط Bootstrap المطلوبة */
  .invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
  }
  
  .is-invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  }
  
  .spinner-border {
    vertical-align: text-bottom;
  }
  
  /* باقي الأنماط الأصلية تبقى كما هي */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 80px);
    padding: 40px 20px;
    background-color: #f8f9fa;
  }
  
  .login-card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .login-header h2 {
    font-size: 1.8rem;
    color: #2d3748;
    font-weight: 600;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #4a5568;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #ff5a5f;
  }
  
  .login-button {
    width: 100%;
    padding: 14px;
    background-color: #ff5a5f;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .login-button:hover {
    background-color: #e04a50;
  }
  
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.95rem;
    color: #718096;
  }
  
  .login-footer a {
    color: #ff5a5f;
    text-decoration: none;
    font-weight: 500;
  }
  
  .forgot-password {
    display: block;
    margin-top: 12px;
    color: #718096;
    font-size: 0.9rem;
  }
  
  .social-login {
    margin-top: 32px;
    border-top: 1px solid #e2e8f0;
    padding-top: 32px;
  }
  
  .divider {
    text-align: center;
    position: relative;
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
  
  .divider span {
    background: white;
    padding: 0 10px;
    position: relative;
    top: -12px;
  }
  
  .social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .social-button:hover {
    border-color: #cbd5e0;
  }
  
  .social-button img {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    .login-card {
      padding: 30px 20px;
    }
    
    .social-buttons {
      grid-template-columns: 1fr;
    }
  }
  </style>