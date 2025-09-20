// Application State
let currentUser = null;
let currentLanguage = { code: 'en', name: 'English', nativeName: 'English' };
let selectedClass = 'Class 5';
let students = [];
let attendanceRecords = [];
let isRecognizing = false;

// Language Data
const LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

// Demo Users
const DEMO_USERS = [
    { id: 'teacher01', password: 'pass123', name: 'Priya Sharma', type: 'teacher' },
    { id: 'govt01', password: 'gov456', name: 'Rajesh Kumar', type: 'government_official' }
];

// Demo Students Data
const generateStudents = () => {
    const names = [
        'Aarav Patel', 'Vivaan Kumar', 'Aditya Singh', 'Vihaan Sharma', 'Arjun Gupta',
        'Sai Reddy', 'Reyansh Joshi', 'Ayaan Khan', 'Krishna Yadav', 'Ishaan Verma',
        'Ananya Agarwal', 'Diya Mehta', 'Priya Nair', 'Aadhya Desai', 'Kavya Iyer',
        'Anvi Chopra', 'Kiara Malhotra', 'Myra Bansal', 'Aanya Saxena', 'Navya Jain'
    ];
    const classes = ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
    const studentData = [];
    classes.forEach(className => {
        for (let i = 0; i < 20; i++) {
            const classNumber = className.split(' ')[1];
            const studentId = `${classNumber}${String(i + 1).padStart(3, '0')}`;
            studentData.push({ id: studentId, name: names[i] || `Student ${studentId}`, class: className });
        }
    });
    return studentData;
};

// Translations
const TRANSLATIONS = {
    en: {
        'Rural Public School': 'Rural Public School', 'Automated Attendance System': 'Automated Attendance System', 'Teacher Portal Login': 'Teacher Portal Login',
        'User ID': 'User ID', 'Password': 'Password', 'Login': 'Login', 'Signing in...': 'Signing in...', 'Demo Credentials:': 'Demo Credentials:',
        'Teacher:': 'Teacher:', 'Admin:': 'Admin:', 'Empowering education through technology': 'Empowering education through technology',
        'Rural Schools AAS': 'Rural Schools AAS', 'Online': 'Online', 'Offline': 'Offline', 'Logout': 'Logout', 'Face Recognizer': 'Face Recognizer',
        'Ready': 'Ready', 'Recognizing...': 'Recognizing...', 'Student Recognized!': 'Student Recognized!', 'Camera ready for recognition': 'Camera ready for recognition',
        'Analyzing face...': 'Analyzing face...', 'Recognition successful!': 'Recognition successful!', 'Select a student to simulate recognition': 'Select a student to simulate recognition',
        'Simulate Recognize': 'Simulate Recognize', 'RFID Verification': 'RFID Verification', 'Manual Entry': 'Manual Entry',
        "Select a student to mark attendance easily.": "Select a student to mark attendance easily.", "Today's Attendance Overview": "Today's Attendance Overview",
        'Export': 'Export', 'Sync': 'Sync', 'Auto Sync': 'Auto Sync', 'Present': 'Present', 'Absent': 'Absent', 'Late': 'Late', 'Exit': 'Exit',
        'Total Students': 'Total Students', 'Recent Activity': 'Recent Activity', 'No recent activity': 'No recent activity',
        'Just now': 'Just now', 'minutes ago': 'minutes ago', 'Manual Student Entry': 'Manual Student Entry',
        'Student ID (e.g. 5001)': 'Student ID (e.g. 5001)', 'Status': 'Status', 'Mark Entry': 'Mark Entry', 'Cancel': 'Cancel',
        'Welcome to Rural Schools AAS!': 'Welcome to Rural Schools AAS!', 'Login successful. Redirecting to dashboard...': 'Login successful. Redirecting to dashboard...',
        'Login Failed': 'Login Failed', 'Please check your credentials and try again.': 'Please check your credentials and try again.',
        'Please select a student': 'Please select a student', 'Choose a student from the dropdown to simulate recognition.': 'Choose a student from the dropdown to simulate recognition.',
        'Attendance Marked!': 'Attendance Marked!', 'has been marked as': 'has been marked as', 'Student ID Required': 'Student ID Required',
        'Please enter a valid student ID.': 'Please enter a valid student ID.', 'Student Not Found': 'Student Not Found',
        'No student found with ID:': 'No student found with ID:', 'Export Successful!': 'Export Successful!', 'attendance data has been exported.': 'attendance data has been exported.',
        'Export Failed': 'Export Failed', 'There was an error exporting the data.': 'There was an error exporting the data.',
        'Syncing...': 'Syncing...', 'Synchronizing data with the server.': 'Synchronizing data with the server.', 'Sync Complete!': 'Sync Complete!',
        'All data has been synchronized successfully.': 'All data has been synchronized successfully.'
    },
    hi: {
        'Rural Public School': 'ग्रामीण पब्लिक स्कूल', 'Automated Attendance System': 'स्वचालित उपस्थिति प्रणाली', 'Teacher Portal Login': 'शिक्षक पोर्टल लॉगिन',
        'User ID': 'उपयोगकर्ता आईडी', 'Password': 'पासवर्ड', 'Login': 'लॉगिन', 'Signing in...': 'साइन इन हो रहे हैं...',
        'Demo Credentials:': 'डेमो क्रेडेंशियल:', 'Teacher:': 'शिक्षक:', 'Admin:': 'प्रशासक:', 'Empowering education through technology': 'प्रौद्योगिकी के माध्यम से शिक्षा को सशक्त बनाना',
        'Rural Schools AAS': 'ग्रामीण स्कूल AAS', 'Online': 'ऑनलाइन', 'Offline': 'ऑफलाइन', 'Logout': 'लॉगआउट', 'Face Recognizer': 'चेहरा पहचानकर्ता',
        'Ready': 'तैयार', 'Recognizing...': 'पहचान रहा है...', 'Student Recognized!': 'छात्र की पहचान हो गई!',
        'Camera ready for recognition': 'कैमरा पहचान के लिए तैयार', 'Analyzing face...': 'चेहरे का विश्लेषण कर रहे हैं...',
        'Recognition successful!': 'पहचान सफल!', 'Select a student to simulate recognition': 'पहचान का अनुकरण करने के लिए एक छात्र चुनें',
        'Face Recognize': 'Face पहचान करें', 'RFID Verification': 'RFID सत्यापन', 'Manual Entry': 'मैनुअल एंट्री',
        "Select a student to mark attendance easily.": "आसानी से उपस्थिति दर्ज करने के लिए एक छात्र चुनें।", "Today's Attendance Overview": "आज की उपस्थिति का अवलोकन",
        'Export': 'निर्यात', 'Sync': 'सिंक', 'Auto Sync': 'ऑटो सिंक', 'Present': 'उपस्थित', 'Absent': 'अनुपस्थित', 'Late': 'देर से',
        'Exit': 'निकास', 'Total Students': 'कुल छात्र', 'Recent Activity': 'हाल की गतिविधि', 'No recent activity': 'कोई हालिया गतिविधि नहीं',
        'Just now': 'अभी अभी', 'minutes ago': 'मिनट पहले', 'Manual Student Entry': 'मैनुअल छात्र प्रविष्टि',
        'Student ID (e.g. 5001)': 'छात्र आईडी (जैसे 5001)', 'Status': 'स्थिति', 'Mark Entry': 'एंट्री मार्क करें', 'Cancel': 'रद्द करें',
        'Welcome to Rural Schools AAS!': 'ग्रामीण स्कूल AAS में आपका स्वागत है!', 'Login successful. Redirecting to dashboard...': 'लॉगिन सफल। डैशबोर्ड पर रीडायरेक्ट कर रहे हैं...',
        'Login Failed': 'लॉगिन असफल', 'Please check your credentials and try again.': 'कृपया अपनी साख की जांच करें और पुनः प्रयास करें।',
        'Please select a student': 'कृपया एक छात्र चुनें', 'Choose a student from the dropdown to simulate recognition.': 'पहचान का अनुकरण करने के लिए ड्रॉपडाउन से एक छात्र चुनें।',
        'Attendance Marked!': 'उपस्थिति चिह्नित!', 'has been marked as': 'को चिह्नित किया गया है', 'Student ID Required': 'छात्र आईडी आवश्यक',
        'Please enter a valid student ID.': 'कृपया एक वैध छात्र आईडी दर्ज करें।', 'Student Not Found': 'छात्र नहीं मिला',
        'No student found with ID:': 'आईडी के साथ कोई छात्र नहीं मिला:', 'Export Successful!': 'निर्यात सफल!',
        'attendance data has been exported.': 'उपस्थिति डेटा निर्यात किया गया है।', 'Export Failed': 'निर्यात असफल',
        'There was an error exporting the data.': 'डेटा निर्यात करने में एक त्रुटि हुई।', 'Syncing...': 'सिंक हो रहा है...',
        'Synchronizing data with the server.': 'सर्वर के साथ डेटा सिंक्रोनाइज़ कर रहे हैं।', 'Sync Complete!': 'सिंक पूर्ण!',
        'All data has been synchronized successfully.': 'सभी डेटा सफलतापूर्वक सिंक्रोनाइज़ किया गया है।'
    },
    pa: {
        'Rural Public School': 'ਪੇਂਡੂ ਪਬਲਿਕ ਸਕੂਲ', 'Automated Attendance System': 'ਸਵੈਚਲਿਤ ਹਾਜ਼ਰੀ ਸਿਸਟਮ', 'Teacher Portal Login': 'ਅਧਿਆਪਕ ਪੋਰਟਲ ਲੌਗਇਨ',
        'User ID': 'ਯੂਜ਼ਰ ਆਈਡੀ', 'Password': 'ਪਾਸਵਰਡ', 'Login': 'ਲਾਗਇਨ', 'Signing in...': 'ਸਾਈਨ ਇਨ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
        'Demo Credentials:': 'ਡੈਮੋ ਪ੍ਰਮਾਣ ਪੱਤਰ:', 'Teacher:': 'ਅਧਿਆਪਕ:', 'Admin:': 'ਪ੍ਰਬੰਧਕ:', 'Empowering education through technology': 'ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਸਿੱਖਿਆ ਨੂੰ ਸ਼ਕਤੀਕਰਨ',
        'Rural Schools AAS': 'ਪੇਂਡੂ ਸਕੂਲ AAS', 'Online': 'ਆਨਲਾਈਨ', 'Offline': 'ਔਫਲਾਈਨ', 'Logout': 'ਲੌਗਆਉਟ', 'Face Recognizer': 'ਚਿਹਰਾ ਪਛਾਣਨ ਵਾਲਾ',
        'Ready': 'ਤਿਆਰ', 'Recognizing...': 'ਪਛਾਣ ਰਿਹਾ ਹੈ...', 'Student Recognized!': 'ਵਿਦਿਆਰਥੀ ਦੀ ਪਛਾਣ ਹੋ ਗਈ!',
        'Camera ready for recognition': 'ਕੈਮਰਾ ਪਛਾਣ ਲਈ ਤਿਆਰ ਹੈ', 'Analyzing face...': 'ਚਿਹਰੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
        'Recognition successful!': 'ਪਛਾਣ ਸਫਲ!', 'Select a student to simulate recognition': 'ਪਛਾਣ ਦੀ ਨਕਲ ਕਰਨ ਲਈ ਇੱਕ ਵਿਦਿਆਰਥੀ ਚੁਣੋ',
        'Face Recognize': 'Face ਪੁਸ਼ਟੀਕਰਨ', 'RFID Verification': 'RFID ਪੁਸ਼ਟੀਕਰਨ', 'Manual Entry': 'ਮੈਨੁਅਲ ਐਂਟਰੀ',
        "Select a student to mark attendance easily.": "ਹਾਜ਼ਰੀ ਨੂੰ ਆਸਾਨੀ ਨਾਲ ਮਾਰਕ ਕਰਨ ਲਈ ਇੱਕ ਵਿਦਿਆਰਥੀ ਚੁਣੋ।", "Today's Attendance Overview": "ਅੱਜ ਦੀ ਹਾਜ਼ਰੀ ਦਾ ਸੰਖੇਪ",
        'Export': 'ਨਿਰਯਾਤ', 'Sync': 'ਸਿੰਕ', 'Auto Sync': 'ਆਟੋ ਸਿੰਕ', 'Present': 'ਹਾਜ਼ਰ', 'Absent': 'ਗੈਰਹਾਜ਼ਰ', 'Late': 'ਦੇਰ',
        'Exit': 'ਬਾਹਰ', 'Total Students': 'ਕੁੱਲ ਵਿਦਿਆਰਥੀ', 'Recent Activity': 'ਹਾਲੀਆ ਗਤੀਵਿਧੀ', 'No recent activity': 'ਕੋਈ ਹਾਲੀਆ ਗਤੀਵਿਧੀ ਨਹੀਂ',
        'Just now': 'ਹੁਣੇ ਹੁਣੇ', 'minutes ago': 'ਮਿੰਟ ਪਹਿਲਾਂ', 'Manual Student Entry': 'ਮੈਨੁਅਲ ਵਿਦਿਆਰਥੀ ਐਂਟਰੀ',
        'Student ID (e.g. 5001)': 'ਵਿਦਿਆਰਥੀ ਆਈਡੀ (ਜਿਵੇਂ ਕਿ 5001)', 'Status': 'ਸਥਿਤੀ', 'Mark Entry': 'ਐਂਟਰੀ ਮਾਰਕ ਕਰੋ', 'Cancel': 'ਰੱਦ ਕਰੋ',
        'Welcome to Rural Schools AAS!': 'ਪੇਂਡੂ ਸਕੂਲ AAS ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!', 'Login successful. Redirecting to dashboard...': 'ਲੌਗਇਨ ਸਫਲ। ਡੈਸ਼ਬੋਰਡ \'ਤੇ ਮੁੜ-ਨਿਰਦੇਸ਼ਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
        'Login Failed': 'ਲੌਗਇਨ ਅਸਫਲ', 'Please check your credentials and try again.': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪ੍ਰਮਾਣ ਪੱਤਰਾਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
        'Please select a student': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵਿਦਿਆਰਥੀ ਚੁਣੋ', 'Choose a student from the dropdown to simulate recognition.': 'ਪਛਾਣ ਦੀ ਨਕਲ ਕਰਨ ਲਈ ਡ੍ਰੌਪਡਾਉਨ ਤੋਂ ਇੱਕ ਵਿਦਿਆਰਥੀ ਚੁਣੋ।',
        'Attendance Marked!': 'ਹਾਜ਼ਰੀ ਲੱਗ ਗਈ!', 'has been marked as': 'ਨੂੰ ਇਸ ਤਰ੍ਹਾਂ ਮਾਰਕ ਕੀਤਾ ਗਿਆ ਹੈ', 'Student ID Required': 'ਵਿਦਿਆਰਥੀ ਆਈਡੀ ਲੋੜੀਂਦਾ ਹੈ',
        'Please enter a valid student ID.': 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਵਿਦਿਆਰਥੀ ਆਈਡੀ ਦਾਖਲ ਕਰੋ।', 'Student Not Found': 'ਵਿਦਿਆਰਥੀ ਨਹੀਂ ਮਿਲਿਆ',
        'No student found with ID:': 'ਇਸ ਆਈਡੀ ਨਾਲ ਕੋਈ ਵਿਦਿਆਰਥੀ ਨਹੀਂ ਮਿਲਿਆ:', 'Export Successful!': 'ਨਿਰਯਾਤ ਸਫਲ!',
        'attendance data has been exported.': 'ਹਾਜ਼ਰੀ ਡਾਟਾ ਨਿਰਯਾਤ ਕੀਤਾ ਗਿਆ ਹੈ।', 'Export Failed': 'ਨਿਰਯਾਤ ਅਸਫਲ',
        'There was an error exporting the data.': 'ਡਾਟਾ ਨਿਰਯਾਤ ਕਰਨ ਵਿੱਚ ਇੱਕ ਗਲਤੀ ਸੀ।', 'Syncing...': 'ਸਿੰਕ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
        'Synchronizing data with the server.': 'ਸਰਵਰ ਨਾਲ ਡਾਟਾ ਸਿੰਕ੍ਰੋਨਾਈਜ਼ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।', 'Sync Complete!': 'ਸਿੰਕ ਪੂਰਾ!',
        'All data has been synchronized successfully.': 'ਸਾਰਾ ਡਾਟਾ ਸਫਲਤਾਪੂਰਵਕ ਸਿੰਕ੍ਰੋਨਾਈਜ਼ ਹੋ ਗਿਆ ਹੈ।'
    }
};

// Translation Helper
function getTranslation(key) {
    return TRANSLATIONS[currentLanguage.code]?.[key] || TRANSLATIONS.en[key] || key;
}

// Toast Notification
function showToast(title, description, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastDescription').textContent = description;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration);
}

// Local Storage
function saveToStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function loadFromStorage(key, defaultValue = null) {
    const stored = localStorage.getItem(key);
    try {
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error("Error parsing stored data for key:", key, e);
        return defaultValue;
    }
}

// App Initialization
function initializeApp() {
    students = generateStudents();
    const storedRecords = loadFromStorage('attendanceRecords', []);
    attendanceRecords = Array.isArray(storedRecords) ? storedRecords : [];

    currentLanguage = loadFromStorage('currentLanguage', LANGUAGES[0]);
    setupEventListeners();
    populateLanguageSelector();
    
    const storedUser = loadFromStorage('currentUser');
    if (storedUser) {
        currentUser = storedUser;
        showDashboard();
    } else {
        showLoginPage();
    }
    updateLanguageInterface();
    updateOnlineStatus();
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('languageSelect').addEventListener('change', handleLanguageChange);
    document.getElementById('classSelect').addEventListener('change', handleClassChange);
    document.getElementById('recognizeBtn').addEventListener('click', handleSimulateRecognition);
    document.getElementById('rfidBtn').addEventListener('click', handleSimulateRecognition); // RFID uses same logic for now
    document.getElementById('manualBtn').addEventListener('click', showManualModal);
    document.getElementById('exportBtn').addEventListener('click', handleExport);
    document.getElementById('syncBtn').addEventListener('click', handleSync);
    document.getElementById('autoSyncToggle').addEventListener('change', handleAutoSyncToggle);
    document.getElementById('manualForm').addEventListener('submit', handleManualEntry);
    document.getElementById('cancelBtn').addEventListener('click', hideManualModal);
    document.getElementById('manualModal').addEventListener('click', (e) => { if (e.target === e.currentTarget) hideManualModal(); });

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// Online/Offline Status
function updateOnlineStatus() {
    const statusIndicator = document.getElementById('onlineStatusIndicator');
    const statusText = document.getElementById('onlineStatus');
    const statusIcon = statusIndicator.querySelector('.status-icon');
    const isOnline = navigator.onLine;

    const onlineIconSVG = `<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`;
    const offlineIconSVG = `<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a11 11 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a16 16 0 0 1 4.16-2.95"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`;

    if (isOnline) {
        statusIndicator.classList.remove('offline');
        statusText.dataset.translateKey = 'Online';
        statusText.textContent = getTranslation('Online');
        if (statusIcon) statusIcon.innerHTML = onlineIconSVG;
    } else {
        statusIndicator.classList.add('offline');
        statusText.dataset.translateKey = 'Offline';
        statusText.textContent = getTranslation('Offline');
        if (statusIcon) statusIcon.innerHTML = offlineIconSVG;
    }
}

// Authentication
async function handleLogin(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.disabled = true;
    loginBtn.innerHTML = `<div class="animate-spin" style="width: 1rem; height: 1rem; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; margin-right: 0.5rem;"></div> ${getTranslation('Signing in...')}`;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = DEMO_USERS.find(u => u.id === userId && u.password === password);
    
    if (user) {
        currentUser = user;
        saveToStorage('currentUser', user);
        showToast(getTranslation('Welcome to Rural Schools AAS!'), getTranslation('Login successful. Redirecting to dashboard...'), 'success');
        setTimeout(showDashboard, 1000);
    } else {
        showToast(getTranslation('Login Failed'), getTranslation('Please check your credentials and try again.'), 'error');
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10,17 15,12 10,7"/><line x1="15" y1="12" x2="3" y2="12"/></svg><span id="loginBtnText" data-translate-key="Login">${getTranslation('Login')}</span>`;
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginPage();
}

// Page Navigation
function showLoginPage() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('userId').value = '';
    document.getElementById('password').value = '';

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = `<svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10,17 15,12 10,7"/><line x1="15" y1="12" x2="3" y2="12"/></svg><span id="loginBtnText" data-translate-key="Login">${getTranslation('Login')}</span>`;
    }
}

function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userType').textContent = currentUser.type.replace('_', ' ');
    updateStudentDropdown();
    updateAttendanceOverview();
}

// Language Management
function populateLanguageSelector() {
    const select = document.getElementById('languageSelect');
    select.innerHTML = '';
    LANGUAGES.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.nativeName;
        select.appendChild(option);
    });
    select.value = currentLanguage.code;
}

function handleLanguageChange(e) {
    const langCode = e.target.value;
    currentLanguage = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
    saveToStorage('currentLanguage', currentLanguage);
    updateLanguageInterface();
}

function updateLanguageInterface() {
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        const translation = getTranslation(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });
    updateStudentDropdown(); // To update the placeholder text
    updateAttendanceOverview(); // To re-render dates in the new language
}

// Class Management
function handleClassChange(e) {
    selectedClass = e.target.value;
    updateStudentDropdown();
    updateAttendanceOverview();
}

function updateStudentDropdown() {
    const studentSelect = document.getElementById('studentSelect');
    const classStudents = students.filter(s => s.class === selectedClass);
    studentSelect.innerHTML = `<option value="">${getTranslation('Select a student to simulate recognition')}</option>`;
    classStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.name} (${student.id})`;
        studentSelect.appendChild(option);
    });
}

// Recognition Simulation
async function handleSimulateRecognition() {
    const selectedStudentId = document.getElementById('studentSelect').value;
    if (!selectedStudentId) {
        showToast(getTranslation('Please select a student'), getTranslation('Choose a student from the dropdown to simulate recognition.'), 'error');
        return;
    }

    const today = new Date().toDateString();
    const existingRecord = attendanceRecords.find(r => r.studentId === selectedStudentId && r.class === selectedClass && new Date(r.timestamp).toDateString() === today);

    setRecognitionState('recognizing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRecognitionState('recognized');
    
    markAttendance(selectedStudentId, existingRecord ? 'exit' : 'present');
    const student = students.find(s => s.id === selectedStudentId);
    showToast(getTranslation('Attendance Marked!'), `${student?.name} ${getTranslation('has been marked as')} ${getTranslation(existingRecord ? 'exit' : 'present')}.`, 'success');
    
    setTimeout(() => {
        setRecognitionState('ready');
        document.getElementById('studentSelect').value = '';
    }, 2000);
}

function setRecognitionState(state) {
    isRecognizing = (state !== 'ready');
    ['recognizeBtn', 'rfidBtn', 'manualBtn', 'studentSelect'].forEach(id => {
        document.getElementById(id).disabled = isRecognizing;
    });

    const statusElement = document.getElementById('recognizerStatus');
    const statusText = document.getElementById('statusText');
    const cameraContent = document.getElementById('cameraContent');

    statusElement.className = `recognizer-status ${state}`;
    statusText.textContent = getTranslation({ 'ready': 'Ready', 'recognizing': 'Recognizing...', 'recognized': 'Student Recognized!' }[state]);

    if (state === 'recognizing') {
        cameraContent.innerHTML = `<div style="width: 4rem; height: 4rem; background-color: hsl(var(--primary) / 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;"><div class="animate-spin" style="width: 2rem; height: 2rem; border: 2px solid hsl(var(--primary)); border-top: 2px solid transparent; border-radius: 50%;"></div></div><p style="color: hsl(var(--primary));">${getTranslation('Analyzing face...')}</p>`;
    } else if (state === 'recognized') {
        cameraContent.innerHTML = `<div style="width: 4rem; height: 4rem; background-color: hsl(var(--success) / 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--success))" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 8 2 2 4-4"/></svg></div><p style="color: hsl(var(--success));">${getTranslation('Recognition successful!')}</p>`;
    } else {
        cameraContent.innerHTML = `<svg class="camera-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg><p>${getTranslation('Camera ready for recognition')}</p>`;
    }
}

// Manual Entry
function showManualModal() { document.getElementById('manualModal').classList.remove('hidden'); document.getElementById('studentIdInput').focus(); }
function hideManualModal() { document.getElementById('manualModal').classList.add('hidden'); document.getElementById('manualForm').reset(); }
function handleManualEntry(e) {
    e.preventDefault();
    const studentId = document.getElementById('studentIdInput').value.trim();
    const status = document.getElementById('statusSelect').value;
    
    if (!studentId) {
        showToast(getTranslation('Student ID Required'), getTranslation('Please enter a valid student ID.'), 'error');
        return;
    }
    const student = students.find(s => s.id === studentId);
    if (!student) {
        showToast(getTranslation('Student Not Found'), `${getTranslation('No student found with ID:')} ${studentId}`, 'error');
        return;
    }
    markAttendance(studentId, status);
    showToast(getTranslation('Attendance Marked!'), `${student.name} ${getTranslation('has been marked as')} ${getTranslation(status)}.`, 'success');
    hideManualModal();
}

// Attendance Management
function markAttendance(studentId, status) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const record = { studentId, studentName: student.name, class: student.class, status, timestamp: new Date().toISOString() };
    attendanceRecords.unshift(record);
    saveToStorage('attendanceRecords', attendanceRecords);
    updateAttendanceOverview();
}

function updateAttendanceOverview() {
    const today = new Date().toDateString();
    const todayRecords = attendanceRecords.filter(r => new Date(r.timestamp).toDateString() === today && r.class === selectedClass);
    const classStudents = students.filter(s => s.class === selectedClass);
    
    const presentStudents = new Set(todayRecords.filter(r => r.status === 'present' || r.status === 'late').map(r => r.studentId));
    
    document.getElementById('presentCount').textContent = presentStudents.size;
    document.getElementById('absentCount').textContent = todayRecords.filter(r => r.status === 'absent').length;
    document.getElementById('lateCount').textContent = todayRecords.filter(r => r.status === 'late').length;
    document.getElementById('exitCount').textContent = todayRecords.filter(r => r.status === 'exit').length;
    document.getElementById('totalCount').textContent = classStudents.length;
    
    updateRecentActivity();
}

function updateRecentActivity() {
    const activityList = document.getElementById('activityList');
    const recentRecords = attendanceRecords.filter(r => r.class === selectedClass).slice(0, 5);

    if (recentRecords.length === 0) {
        activityList.innerHTML = `<div class="no-activity"><svg class="no-activity-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><p>${getTranslation('No recent activity')}</p></div>`;
        return;
    }

    activityList.innerHTML = recentRecords.map(record => `
        <div class="activity-item animate-fade-in">
            <div class="activity-left">
                <svg class="activity-icon ${record.status}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${getStatusIcon(record.status)}
                </svg>
                <div class="activity-info">
                    <p class="student-name">${record.studentName}</p>
                    <p class="student-id">${record.studentId}</p>
                </div>
            </div>
            <div class="activity-right">
                <div class="status-badge ${record.status}">${getTranslation(record.status)}</div>
                <p class="activity-time">${formatDateTime(record.timestamp)}</p>
            </div>
        </div>
    `).join('');
}

function getStatusIcon(status) {
    const icons = {
        present: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m19 8 2 2 4-4"/>',
        absent: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="23" y2="14"/><line x1="23" y1="8" x2="17" y2="14"/>',
        late: '<circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>',
        exit: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>'
    };
    return icons[status] || icons.present;
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    // Use the app's current language for locale-specific formatting
    const locale = currentLanguage.code;
    try {
        // Use Intl.DateTimeFormat for robust internationalization
        return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (e) {
        // Fallback to a default format if the locale is not supported
        console.warn(`Locale '${locale}' not supported, falling back to default.`);
        return date.toLocaleString(undefined, options);
    }
}

// Export and Sync
function handleExport() {
    try {
        const classRecords = attendanceRecords.filter(r => r.class === selectedClass);
        if (classRecords.length === 0) {
            showToast(getTranslation('Export Failed'), 'No data to export for this class.', 'error');
            return;
        }
        const headers = ['Student ID', 'Student Name', 'Status', 'Date', 'Time'];
        const rows = classRecords.map(r => [r.studentId, r.studentName, r.status, new Date(r.timestamp).toLocaleDateString(), new Date(r.timestamp).toLocaleTimeString()]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
        
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', `${selectedClass}_attendance_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(getTranslation('Export Successful!'), `${selectedClass} ${getTranslation('attendance data has been exported.')}`, 'success');
    } catch (error) {
        showToast(getTranslation('Export Failed'), getTranslation('There was an error exporting the data.'), 'error');
    }
}

async function handleSync() {
    showToast(getTranslation('Syncing...'), getTranslation('Synchronizing data with the server.'));
    await new Promise(resolve => setTimeout(resolve, 1500));
    showToast(getTranslation('Sync Complete!'), getTranslation('All data has been synchronized successfully.'), 'success');
}

function handleAutoSyncToggle(e) {
    const isChecked = e.target.checked;
    document.getElementById('syncBtn').classList.toggle('hidden', isChecked);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeApp);