<template>
  <div class="contact-wrapper">
    <div class="contact-card slide-in">
      <div class="contact-left">
        <h2 class="title">Get in Touch</h2>
        <p class="description">
          We'd love to hear from you. Fill out the form and our team will get back to you shortly.
        </p>

        <div class="contact-info">
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <span>13038044100@163.com</span>
          </div>
          <div class="info-item">
            <i class="fas fa-phone-alt"></i>
            <span>+353 (87)4712525</span>
            <span>+86 13038044100</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Mayor Street Upper, Point Village, Dublin</span>
          </div>
        </div>

        <div class="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61575126306358"><i class="fab fa-facebook-f"></i></a>
          <a href="https://x.com/Hope52411"><i class="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/james_xuee/"><i class="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/xiangze-xue"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <div class="contact-right">
        <form @submit.prevent="submitForm" class="contact-form">
          <input type="text" v-model="form.name" placeholder="Your Name" required />
          <input type="email" v-model="form.email" placeholder="Your Email" required />
          <input type="text" v-model="form.subject" placeholder="Subject" required />
          <textarea v-model="form.message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "ContactUs",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("📩 Contact form submitted:", this.form);
      Swal.fire({
        title: '✅ Message Sent!',
        text: "Thanks for reaching out. We'll be in touch shortly.",
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#667eea'
      });
      this.form = {
        name: "",
        email: "",
        subject: "",
        message: ""
      };
    }
  }
};
</script>

<style scoped>
.contact-wrapper {
  padding-top: 100px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.contact-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  max-width: 1100px;
  box-sizing: border-box;
}

.contact-left {
  flex: 1;
  background: #f4f6fa;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-left .title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.contact-left .description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #444;
  gap: 10px;
}

.info-item i {
  color: #667eea;
  font-size: 1.2rem;
}

.social-icons {
  display: flex;
  gap: 20px;
  margin-top: auto;
}

.social-icons a {
  font-size: 18px;
  color: #667eea;
  transition: transform 0.2s;
}

.social-icons a:hover {
  transform: scale(1.2);
}

.contact-right {
  flex: 1;
  padding: 40px;
  background: #fff;
  box-sizing: border-box;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-form input,
.contact-form textarea {
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.4);
}

.contact-form textarea {
  min-height: 100px;
  resize: vertical;
}

.contact-form button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 14px 20px;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.contact-form button:hover {
  background: linear-gradient(45deg, #764ba2, #667eea);
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .contact-wrapper {
    padding-top: 100px;
    height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 20px 10px;
    box-sizing: border-box;
  }

  .contact-card {
    flex-direction: column;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    overflow: hidden;
    width: 100%;
  }

  .contact-left,
  .contact-right {
    padding: 30px 15px;
    box-sizing: border-box;
  }

  .contact-left .title {
    font-size: 2.2rem;
    margin-bottom: 15px;
    text-align: center;
  }

  .contact-left .description {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 30px;
    color: #555;
  }

  .contact-info {
    gap: 18px;
    font-size: 1rem;
    align-items: center;
  }

  .info-item {
    justify-content: center;
    text-align: center;
  }

  .social-icons {
    margin-top: 30px;
    justify-content: center;
    gap: 30px;
  }

  .social-icons a {
    font-size: 24px;
    transition: transform 0.3s ease;
  }

  .social-icons a:hover {
    transform: scale(1.2);
  }

  .contact-form {
    gap: 20px;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 16px;
    padding: 16px;
    width: 100%;
    max-width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .contact-form textarea {
    min-height: 120px;
  }

  .contact-form button {
    font-size: 18px;
    padding: 14px;
    width: 100%;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: all 0.3s ease;
  }

  .contact-form button:hover {
    transform: scale(1.05);
  }
}

.slide-in {
  animation: slideInUp 0.6s ease-out both;
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

