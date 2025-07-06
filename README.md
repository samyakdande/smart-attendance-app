# Smart Attendance App

A modern attendance management system built with React Native and Expo, featuring facial recognition login and real-time attendance tracking.

## 🚀 Features

- **Facial Recognition Login**: Secure authentication using FaceIO
- **Real-time Attendance Tracking**: Mark attendance with location and timestamp
- **Admin Dashboard**: Comprehensive admin interface for managing users and attendance
- **Issue Reporting**: Built-in system for reporting attendance issues
- **Cross-platform**: Works on iOS, Android, and Web
- **Modern UI**: Built with React Native Paper components

## 📱 Screenshots

*Screenshots will be added here*

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **UI Components**: React Native Paper
- **Facial Recognition**: FaceIO
- **Backend**: Supabase (for data storage and authentication)
- **Navigation**: Expo Router
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on mobile devices)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-attendance-app.git
   cd smart-attendance-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_FACEIO_PUBLIC_ID=your_faceio_public_id
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Running the App

### Using Expo Go
1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

### Using Web Browser
1. Press `w` in the terminal to open in web browser
2. Note: FaceIO features may be limited in web browser

### Using Custom Build
For full native features including camera access:
```bash
npx eas build --platform android
npx eas build --platform ios
```

## 🏗️ Project Structure

```
SmartAttendanceApp/
├── app/                    # Expo Router screens
│   ├── admin-dashboard.js  # Admin dashboard
│   ├── attendance-issues.js # Issue reporting
│   ├── attendance-records.js # Attendance records
│   ├── faceio.js          # FaceIO integration
│   ├── index.js           # Main entry point
│   ├── login-admin.js     # Admin login
│   ├── login-user.js      # User login
│   ├── my-attendance.js   # User attendance view
│   ├── report-issue.js    # Issue reporting form
│   └── user-dashboard.js  # User dashboard
├── components/            # Reusable components
├── services/             # API services
│   └── supabase.js       # Supabase configuration
├── constants/            # App constants
├── types/               # TypeScript types
├── utils/               # Utility functions
├── assets/              # Images and static files
└── android/             # Android-specific files
```

## 🔧 Configuration

### FaceIO Setup
1. Sign up at [FaceIO](https://faceio.net/)
2. Create a new application
3. Get your Public ID
4. Add it to your environment variables

### Supabase Setup
1. Create a new project at [Supabase](https://supabase.com/)
2. Set up your database tables
3. Get your project URL and anon key
4. Add them to your environment variables

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Build for Android
npx eas build --platform android

# Build for iOS
npx eas build --platform ios

# Deploy to web
npx eas-cli deploy
```

### Manual APK Build
```bash
npx eas build --platform android --profile preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**FaceIO Error 10**: Invalid Public ID or origin
- Solution: Check your FaceIO Public ID and ensure it matches your domain

**FaceIO Error 16**: Camera access denied
- Solution: Use Expo Go in mobile browser or build custom APK for full camera access

**Build Failures**: Missing assets
- Solution: Ensure all required assets (icons, splash screens) are present in the assets folder

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/yourusername/smart-attendance-app/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [FaceIO](https://faceio.net/) for facial recognition services
- [React Native Paper](https://callstack.github.io/react-native-paper/) for UI components
- [Supabase](https://supabase.com/) for backend services
