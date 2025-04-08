// Danh sách email thành viên
const memberEmails = {
    'tbao': 'tbao691006@gmail.com',
    'minhhuy': 'minhhuy@example.com',
    'tringuyen': 'dangtringuyen2018cm@gmail.com',
    'quochuy': 'quocthuy.design@gmail.com'
};

// Gửi email thông báo
async function sendEmail(to, subject, message) {
    try {
        // Kiểm tra quyền gửi email
        if (!hasPermission('send_emails')) {
            throw new Error('Bạn không có quyền gửi email thông báo');
        }

        // Lấy email người nhận
        let recipientEmails = [];
        if (to === 'all') {
            recipientEmails = Object.values(memberEmails);
        } else {
            recipientEmails = [memberEmails[to]];
        }

        // Gửi email cho từng người nhận
        for (const email of recipientEmails) {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'YOUR_SERVICE_ID',
                    template_id: 'YOUR_TEMPLATE_ID',
                    user_id: 'YOUR_USER_ID',
                    template_params: {
                        to_email: email,
                        from_name: getCurrentUser().fullName,
                        subject: subject,
                        message: message
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Gửi email thất bại');
            }
        }

        return true;
    } catch (error) {
        console.error('Lỗi gửi email:', error);
        throw error;
    }
}

// Xử lý form gửi email
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const recipient = document.querySelector('select[name="recipient"]').value;
            const subject = document.querySelector('input[name="subject"]').value;
            const message = document.querySelector('textarea[name="message"]').value;

            try {
                await sendEmail(recipient, subject, message);
                alert('Email đã được gửi thành công!');
                emailForm.reset();
            } catch (error) {
                alert(error.message);
            }
        });
    }
});

// Hàm gửi email thông báo
function sendEmailNotification(recipient, subject, content) {
    // Trong thực tế, đây sẽ là API call đến server
    return new Promise((resolve, reject) => {
        // Giả lập gửi email
        console.log('Sending email to:', recipient);
        console.log('Subject:', subject);
        console.log('Content:', content);
        
        // Giả lập thành công sau 1 giây
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Email sent successfully'
            });
        }, 1000);
    });
}

// Hàm lấy email từ tên người dùng
function getRecipientEmail(username) {
    const emailMap = {
        'tbao': 'tbao691006@gmail.com',
        'minhhuy': 'minhhuy@example.com',
        'tringuyen': 'dangtringuyen2018cm@gmail.com',
        'quochuy': 'quocthuy.design@gmail.com'
    };
    return emailMap[username] || null;
}

// Hàm gửi email cho nhiều người
async function sendBulkEmail(recipients, subject, content) {
    const results = [];
    for (const recipient of recipients) {
        try {
            const result = await sendEmailNotification(recipient, subject, content);
            results.push({ recipient, success: true });
        } catch (error) {
            results.push({ recipient, success: false, error });
        }
    }
    return results;
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Hàm để lấy danh sách người nhận từ database hoặc API
function getRecipients() {
    // Mẫu dữ liệu người nhận
    return [
        { id: "quocbao", name: "Trần Quốc Bảo", email: "baotq@example.com", role: "leader" },
        { id: "minhhuy", name: "Nguyễn Minh Huy", email: "huynm@example.com", role: "member" },
        { id: "tringuyen", name: "Đặng Trí Nguyễn", email: "nguyendt@example.com", role: "member" },
        { id: "quochuy", name: "Võ Trần Quốc Huy", email: "huyvtq@example.com", role: "member" },
        { id: "chuong", name: "Hà Đình Chương", email: "chuonghd@example.com", role: "member" }
    ];
}

// Export các hàm để sử dụng ở nơi khác
window.emailUtils = {
    sendEmailNotification,
    getRecipientEmail,
    sendBulkEmail,
    validateEmail
}; 