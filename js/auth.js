// Lưu trữ thông tin người dùng
const users = [
    {
        username: 'tbao',
        password: 'password',
        fullName: 'Trần Quốc Bảo',
        email: 'tbao691006@gmail.com',
        role: 'leader'
    },
    {
        username: 'minhhuy',
        password: 'password',
        fullName: 'Nguyễn Minh Huy',
        email: 'minhhuy@example.com',
        role: 'member'
    },
    {
        username: 'tringuyen',
        password: 'password',
        fullName: 'Đặng Trí Nguyễn',
        email: 'dangtringuyen2018cm@gmail.com',
        role: 'member'
    },
    {
        username: 'quochuy',
        password: 'password',
        fullName: 'Võ Trần Quốc Huy',
        email: 'quocthuy.design@gmail.com',
        role: 'member'
    },
    {
        username: 'chuong',
        password: 'password123',
        fullName: 'Hà Đình Chương',
        email: 'chuonghd@example.com',
        role: 'member'
    }
];

// Quyền truy cập cho từng vai trò
const permissions = {
    leader: ['view_members', 'edit_members', 'delete_members', 'send_messages', 'view_messages', 'send_emails'],
    member: ['view_members', 'send_messages', 'view_messages']
};

// Kiểm tra đăng nhập
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            permissions: permissions[user.role]
        }));
        
        // Chuyển hướng dựa trên vai trò
        if (user.role === 'member') {
            window.location.href = 'modern.html';
        } else {
            window.location.href = 'dashboard.html';
        }
        return true;
    }
    return false;
}

// Kiểm tra đã đăng nhập chưa
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Lấy thông tin người dùng hiện tại
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Kiểm tra quyền truy cập
function hasPermission(permission) {
    const user = getCurrentUser();
    return user && user.permissions.includes(permission);
}

// Đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Chuyển hướng nếu chưa đăng nhập
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Chuyển hướng nếu không phải trưởng nhóm
function requireLeader() {
    const user = getCurrentUser();
    if (!user || user.role !== 'leader') {
        window.location.href = 'dashboard.html';
    }
} 