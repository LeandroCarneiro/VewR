# Research Project Presentation

A modern, scroll-driven single-page application (SPA) built with Angular 16 for presenting academic research projects. Each section functions like a presentation slide with smooth scroll-snapping and elegant animations.

## 🚀 Features

- **Modern Angular 16**: Built with standalone components and latest best practices
- **Scroll-Driven Navigation**: Smooth scroll-snapping between sections
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Fixed navigation with progress tracking
- **Professional Styling**: Clean, academic design with subtle animations
- **Chart Integration**: Built-in support for data visualization with ngx-charts
- **Customizable Content**: Easy to modify sections with your research content

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Angular CLI** (version 16)

### Installing Prerequisites

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/)

2. **Install Angular CLI globally**:
   ```bash
   npm install -g @angular/cli@16
   ```

3. **Verify installations**:
   ```bash
   node --version
   npm --version
   ng version
   ```

## 🛠️ Installation

1. **Navigate to the project directory**:
   ```bash
   cd research-presentation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   Or if you prefer yarn:
   ```bash
   yarn install
   ```

## 🏃‍♂️ Running the Application

### Development Server

Start the development server:
```bash
npm start
```

Or using Angular CLI directly:
```bash
ng serve
```

The application will be available at `http://localhost:4200`. The app will automatically reload when you make changes to the source files.

### Production Build

To build the project for production:
```bash
npm run build
```

Or:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
research-presentation/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── section.component.ts      # Reusable section component
│   │   │   └── navigation.component.ts   # Fixed navigation component
│   │   ├── app.component.ts              # Main app component
│   │   └── app.config.ts                 # App configuration
│   ├── assets/                           # Static assets (images, etc.)
│   ├── styles.scss                       # Global styles
│   ├── index.html                        # Main HTML file
│   └── main.ts                          # Bootstrap file
├── angular.json                          # Angular CLI configuration
├── package.json                          # Dependencies and scripts
├── tsconfig.json                         # TypeScript configuration
└── README.md                            # This file
```

## 🎨 Customization

### 1. Update Your Research Content

Edit the `app.component.ts` file to customize:

- **Title and Author Information**: Update the title slide content
- **Research Data**: Modify the `relatedWorks`, `datasets`, and `chartData` arrays
- **Section Content**: Update the template content for each section

### 2. Add Your Research Diagram

Replace the placeholder in the Research Diagram section:

1. Add your diagram image to `src/assets/`
2. Update the diagram section in `app.component.ts`:
   ```html
   <img src="assets/your-diagram.png" alt="Research Diagram" class="diagram-image">
   ```

### 3. Update Chart Data

Replace the dummy chart data in `app.component.ts`:
```typescript
chartData = [
  { name: 'Your Method 1', value: your_value_1 },
  { name: 'Your Method 2', value: your_value_2 },
  // Add your actual data here
];
```

### 4. Styling Customization

Modify the CSS variables in `src/styles.scss`:
```scss
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
  // Customize other variables
}
```

## 📱 Sections Overview

The application includes 11 sections:

1. **Presentation** - Title slide with project info
2. **Introduction** - Field overview and objectives
3. **Problematic** - Problem statement and significance
4. **Related Work** - Literature review and existing approaches
5. **Research Diagram** - Methodology/architecture visualization
6. **Datasets** - Data sources and characteristics
7. **Results** - Key findings with charts
8. **Discussion** - Interpretation and implications
9. **Future Work** - Next steps and open questions
10. **Conclusion** - Summary and contributions
11. **Thanks** - Acknowledgments and contact info

## 🎯 Key Features Explained

### Scroll Behavior
- Each section snaps into view when scrolling
- Smooth transitions between sections
- Progress tracking in the navigation

### Navigation
- Fixed right-side navigation on desktop
- Bottom navigation on mobile
- Click to jump to any section
- Visual progress indicator

### Animations
- Fade-in effects for sections coming into view
- Slide-in animations from different directions
- Intersection Observer API for performance

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation on mobile

## 🔧 Development Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `ng generate component [name]` - Generate new component
- `ng generate service [name]` - Generate new service

## 📦 Dependencies

### Main Dependencies
- `@angular/core` - Angular framework
- `@angular/animations` - Animation support
- `@swimlane/ngx-charts` - Chart library
- `d3` - Data visualization (required by ngx-charts)

### Development Dependencies
- `@angular/cli` - Angular CLI tools
- `typescript` - TypeScript support

## 🎨 Design Principles

- **Clean & Professional**: Academic-focused design
- **Readable Typography**: Optimized font choices and spacing
- **Accessible Colors**: High contrast and WCAG compliant
- **Smooth Interactions**: Subtle animations and transitions
- **Mobile-First**: Responsive design for all devices

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist/research-presentation/` folder
3. Popular hosting options:
   - **Netlify**: Drag and drop the dist folder
   - **Vercel**: Connect your Git repository
   - **GitHub Pages**: Use GitHub Actions for deployment
   - **Firebase Hosting**: Use Firebase CLI

## 📝 Customization Tips

1. **Replace placeholder content** with your actual research data
2. **Add your institution's colors** by updating CSS variables
3. **Include your research diagrams** in the assets folder
4. **Update chart data** with your actual results
5. **Customize animations** by modifying the animation classes

## 🤝 Support

If you need help customizing the application:

1. Check the comments in the code for guidance
2. Refer to [Angular Documentation](https://angular.io/docs)
3. Check [ngx-charts documentation](https://swimlane.gitbook.io/ngx-charts/) for chart customization

## 📄 License

This project is created for academic purposes. Feel free to use and modify for your research presentations.

---

**Happy Presenting! 🎓**
