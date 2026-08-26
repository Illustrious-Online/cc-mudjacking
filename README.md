# CC Mudjacking - Professional Concrete Lifting Services

> **This repository no longer deploys the live site.**
>
> ccmudjacking.com is served by the Illustrious Sites service — one multi-tenant
> deployment rendering the org's saved site config per request (illustrious.platform,
> `apps/sites-essentials`). It cut over in illustrious.platform#188, and the live
> domain is routed by per-domain ingresses in the cluster's `sites` namespace.
>
> Content changes are published with `cloud site set`, not by merging here. This
> Next.js source is kept for reference and for anything not yet ported.

A modern, responsive website for CC Mudjacking, a professional concrete lifting and foundation repair company. Built with Next.js 15 and Chakra UI.

## 🏗️ About

CC Mudjacking provides professional concrete lifting and foundation repair services including:

- **Residential Mudjacking**: Driveways, sidewalks, patios, and garage floors
- **Commercial Services**: Warehouse floors, parking lots, and loading docks  
- **Foundation Repair**: Slab jacking, void filling, and settlement issues

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with Chakra UI components
- **Contact Forms**: Easy-to-use contact and quote request forms
- **Before/After Gallery**: Showcase of completed projects
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Built-in SEO features for better search visibility
- **Performance**: Fast loading with Next.js optimization
- **Testing**: Comprehensive test coverage with Vitest
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Chakra UI 3** - Component library and design system
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Backend & Services

- **Formik** - Form handling
- **Zod** - Schema validation

### Development Tools

- **Bun** - Package manager and runtime
- **Vitest** - Testing framework
- **Biome** - Linting and formatting
- **Husky** - Git hooks
- **Sentry** - Error monitoring

### Deployment

- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **Nginx Ingress** - Load balancing

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) 18+ (if not using Bun)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/cc-mudjacking.git
   cd cc-mudjacking
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun test` | Run tests with coverage |
| `bun test:junit` | Run tests with JUnit reporter |
| `bun check` | Run Biome linting |
| `bun check:fix` | Fix Biome linting issues |

## 🧪 Testing

The project uses Vitest for testing with comprehensive coverage:

```bash
# Run all tests
bun test

# Run tests with JUnit reporter
bun test:junit

# Run tests in watch mode
bun test --watch
```

## 🐳 Docker Deployment

### Build the Docker image

```bash
docker build -t cc-mudjacking .
```

### Run the container

```bash
docker run -p 3000:3000 cc-mudjacking
```

## ☸️ Kubernetes Deployment

The project includes Kubernetes manifests for production deployment:

### Deploy to Kubernetes

```bash
# Install the Helm chart
helm install cc-mudjacking ./k8s

# Upgrade existing deployment
helm upgrade cc-mudjacking ./k8s

# Uninstall
helm uninstall cc-mudjacking
```

### Configuration

Edit `k8s/values.yaml` to customize:

- Replica count
- Resource limits
- Ingress settings
- Image repository

## 📁 Project Structure

```text
cc-mudjacking/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── providers/            # App providers
├── k8s/                  # Kubernetes manifests
└── public/               # Static assets
```

## 🔧 Configuration

### Chakra UI Theme

The project uses a custom Chakra UI theme with brand colors. Edit `providers/ChakraProvider.tsx` to customize the theme.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request!

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email nick@illustrious.online or create an issue in this repository.

## 🔗 Links

- **Website**: [ccmudjacking.com](https://ccmudjacking.com)
- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Chakra UI**: [chakra-ui.com](https://chakra-ui.com)

---

Built with ❤️ by the Illustrious Online team
