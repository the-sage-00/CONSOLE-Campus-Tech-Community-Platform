# Console Frontend

Modern, responsive React application for the Console Tech Community platform.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your values**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_ADMIN_API_URL=http://localhost:5000/api/admin
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── competitive/    # Competitive programming roadmap
│   ├── webdev/         # Web development roadmap
│   ├── ml/             # Machine learning roadmap
│   ├── web3/           # Web3 roadmap
│   ├── infosec/        # Information security roadmap
│   ├── cpp/            # C++ programming roadmap
│   └── python/         # Python programming roadmap
├── admin/              # Admin panel
│   ├── components/     # Admin components
│   └── pages/          # Admin pages
├── context/            # React context (Auth)
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Features

### User Features
- **Landing Page** - Beautiful hero section with animations
- **Leaderboard** - Real-time rankings with filters
- **Contests** - Browse and participate in contests
- **Profile** - Personal dashboard with stats
- **Resources** - Interactive learning roadmaps
- **Tech Guide** - Curated learning resources

### Admin Features
- **Dashboard** - Analytics and statistics
- **User Management** - Approve/manage users
- **Contest Management** - Create/edit contests
- **Analytics** - Detailed insights

### UI/UX Features
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme switching
- **Smooth Animations** - Framer Motion & GSAP
- **Toast Notifications** - User feedback
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton screens
- **Mobile Optimized** - Mobile-first design

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_ADMIN_API_URL` | Admin API URL | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### TailwindCSS Configuration

Custom theme configuration is in `tailwind.config.js`:
- Custom colors
- Custom fonts
- Custom animations
- Responsive breakpoints

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Netlify

1. **Via Netlify UI**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables

2. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   npm run build
   netlify deploy --prod
   ```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login/Logout functionality
- [ ] Profile updates
- [ ] Leaderboard filtering
- [ ] Contest participation
- [ ] Admin panel access
- [ ] Responsive design
- [ ] Cross-browser compatibility

## 🎯 Best Practices

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### Performance
- Lazy load routes
- Optimize images
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Minimize bundle size

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen readers

## 🐛 Common Issues

### Issue: API Connection Failed
**Solution**: Check that backend is running and `VITE_API_URL` is correct

### Issue: Google OAuth Not Working
**Solution**: Verify `VITE_GOOGLE_CLIENT_ID` and authorized redirect URIs

### Issue: Build Errors
**Solution**: Clear `node_modules` and reinstall dependencies

### Issue: Styles Not Loading
**Solution**: Ensure TailwindCSS is properly configured

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- TailwindCSS team for the utility-first CSS framework
- All open-source contributors

---

**Made with ❤️ by the Console Team**
