<!-- 
  <template>
    <div class="register-page">
      
      <div class="register-container">
        <div class="register-card">
          <h2>Create your account</h2>
          
          <form @submit.prevent="handleRegister" class="register-form" enctype="multipart/form-data">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="user.name"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="user.email"
                placeholder="Your email address"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="user.password"
                placeholder="Create a password"
                required
                minlength="6"
              />
            </div>
            
            <div class="form-group">
              <label for="avatar">Profile Picture</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                @change="handleImageUpload"
                ref="fileInput"
                class="file-input"
              />
              <div v-if="user.avatarPreview" class="avatar-preview">
                <img :src="user.avatarPreview" alt="Preview" class="preview-image" />
                <button type="button" @click="removeImage" class="remove-btn">
                  ×
                </button>
              </div>
              <div v-else class="upload-placeholder">
                <span>Click to upload photo</span>
              </div>
            </div>
            
            <button type="submit" class="register-button">Sign Up</button>
            
            <div class="login-link">
              Already have an account? <router-link to="/login">Log in</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  
  export default {
    name: 'Register',
    components: { Navbar },
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: null,
          avatarPreview: null
        },
        users: JSON.parse(localStorage.getItem('users')) || []
      }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0]
        if (!file) return
        
        // التحقق من حجم الصورة (2MB كحد أقصى)
        if (file.size > 2 * 1024 * 1024) {
          alert('Please select an image smaller than 2MB')
          this.$refs.fileInput.value = ''
          return
        }
        
        // تحويل الصورة إلى base64
        const reader = new FileReader()
        reader.onload = (e) => {
          // تحسين الصورة قبل العرض
          const img = new Image()
          img.src = e.target.result
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const MAX_WIDTH = 400
            const MAX_HEIGHT = 400
            let width = img.width
            let height = img.height
            
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)
            
            this.user.avatarPreview = canvas.toDataURL('image/jpeg', 0.8)
            this.user.avatar = canvas.toDataURL('image/jpeg', 0.7) // نسخة مضغوطة للحفظ
          }
        }
        reader.readAsDataURL(file)
      },
      removeImage() {
        this.user.avatar = null
        this.user.avatarPreview = null
        this.$refs.fileInput.value = ''
      },
      handleRegister() {
        // التحقق من البريد الإلكتروني
        const userExists = this.users.some(u => u.email === this.user.email)
        if (userExists) {
          alert('Email already registered!')
          return
        }
  
        // إنشاء مستخدم جديد
        const newUser = {
          id: Date.now(),
          name: this.user.name,
          email: this.user.email,
          avatar: this.user.avatar, // حفظ الصورة المضغوطة
          registeredAt: new Date().toISOString()
        }
        
        this.users.push(newUser)
        localStorage.setItem('users', JSON.stringify(this.users))
        
        // إعادة تعيين النموذج
        this.user = { 
          name: '', 
          email: '', 
          password: '', 
          avatar: null, 
          avatarPreview: null 
        }
        
        // التوجيه إلى صفحة المستخدمين
        this.$router.push('/users')
      }
    }
  }
  </script>
  


  <style scoped>
  .register-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .register-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background-color: #f8f9fa;
  }
  
  .register-card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }
  
  .register-card h2 {
    font-size: 1.8rem;
    color: #2d3748;
    font-weight: 600;
    margin-bottom: 32px;
    text-align: center;
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
  
  .register-button {
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
  
  .register-button:hover {
    background-color: #e04a50;
  }
  
  .login-link {
    margin-top: 24px;
    text-align: center;
    font-size: 0.95rem;
    color: #718096;
  }
  
  .login-link a {
    color: #ff5a5f;
    text-decoration: none;
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    .register-card {
      padding: 30px 20px;
    }
  }

</style>


   -->




   <template>
    <div class="register-page">
      <div class="register-container">
        <div class="register-card">
          <h2>Create your account</h2>
  
          <form @submit.prevent="handleRegister" class="register-form" enctype="multipart/form-data">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="user.name"
                placeholder="Your full name"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="user.email"
                placeholder="Your email address"
                required
              />
            </div>
  
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="user.password"
                placeholder="Create a password"
                required
                minlength="6"
              />
            </div>
  
            <div class="form-group">
              <label for="avatar">Profile Picture</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                @change="handleImageUpload"
                ref="fileInput"
                class="file-input"
              />
              <div v-if="user.avatarPreview" class="avatar-preview">
                <img :src="user.avatarPreview" alt="Preview" class="preview-image" />
                <button type="button" @click="removeImage" class="remove-btn">
                  ×
                </button>
              </div>
              <div v-else class="upload-placeholder">
                <span>Click to upload photo</span>
              </div>
            </div>
  
            <button type="submit" class="register-button">Sign Up</button>
  
            <div class="login-link">
              Already have an account? <router-link to="/login">Log in</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: null,
          avatarPreview: null
        },
        users: JSON.parse(localStorage.getItem('users')) || []
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
  
        if (file.size > 2 * 1024 * 1024) {
          alert('Please select an image smaller than 2MB');
          this.$refs.fileInput.value = '';
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;
  
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
  
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
  
            this.user.avatarPreview = canvas.toDataURL('image/jpeg', 0.8);
            this.user.avatar = canvas.toDataURL('image/jpeg', 0.7); // نسخة مضغوطة للحفظ
          };
        };
        reader.readAsDataURL(file);
      },
      removeImage() {
        this.user.avatar = null;
        this.user.avatarPreview = null;
        this.$refs.fileInput.value = '';
      },
      handleRegister() {
        const userExists = this.users.some(u => u.email === this.user.email);
        if (userExists) {
          alert('Email already registered!');
          return;
        }
  
        const newUser = {
          id: Date.now(),
          name: this.user.name,
          email: this.user.email,
          password: this.user.password, // **هام: في تطبيق حقيقي، يجب تشفير كلمة المرور!**
          avatar: this.user.avatar,
          registeredAt: new Date().toISOString()
        };
  
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
  
        // تخزين بيانات المستخدم الحالي لتسجيل الدخول التلقائي بعد التسجيل
        localStorage.setItem('currentUser', JSON.stringify({ name: newUser.name, email: newUser.email }));
  
        this.user = {
          name: '',
          email: '',
          password: '',
          avatar: null,
          avatarPreview: null
        };
  
        this.$router.push('/'); // توجيه المستخدم إلى الصفحة الرئيسية بعد التسجيل
      }
    }
  };
  </script>
  
  <style scoped>
  .register-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .register-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background-color: #f8f9fa;
  }
  
  .register-card {
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 40px;
  }
  
  .register-card h2 {
    font-size: 1.8rem;
    color: #2d3748;
    font-weight: 600;
    margin-bottom: 32px;
    text-align: center;
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
  
  .register-button {
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
  
  .register-button:hover {
    background-color: #e04a50;
  }
  
  .login-link {
    margin-top: 24px;
    text-align: center;
    font-size: 0.95rem;
    color: #718096;
  }
  
  .login-link a {
    color: #ff5a5f;
    text-decoration: none;
    font-weight: 500;
  }
  
  @media (max-width: 480px) {
    .register-card {
      padding: 30px 20px;
    }
  }

  </style>