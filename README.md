# 🤖 AI Chat Assistant

A full-stack AI chatbot application featuring real-time streaming responses, a responsive React frontend, and flexible LLM model integration.

![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![React](https://img.shields.io/badge/React-19+-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED.svg)
![LLM](https://img.shields.io/badge/LLM-Llama%202-orange.svg)

## Overview

This project includes a chatbot implementation featuring:

- **Real-time streaming responses** using Server-Sent Events (SSE)
- **Modern React frontend** with TypeScript and responsive design
- **Robust FastAPI backend** with Python async/await patterns
- **Flexible LLM integration** supporting various llama models
- **Containerized deployment** with Docker and Docker Compose

## Technologies Used

### Frontend
- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **CSS Modules** - Component-scoped styling
- **Axios** - HTTP client for API communication
- **Vitest** - Fast unit testing framework
- **Nginx** - Web server

### Backend
- **FastAPI** - High-performance Python web framework
- **Python 3.10+** - Modern Python with async support
- **Uvicorn** - ASGI server for production
- **Pydantic** - Data validation and settings management
- **llama-cpp-python** - LLM inference engine
- **pytest** - Testing framework

### AI/ML
- **Llama 2-7B Chat** - Open-source language model (default)
- **GGUF format** - Efficient model quantization
- **Flexible model support** - Easy to swap different llama models

### DevOps & Tools
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipelines
- **Shell scripts** - Automation and management
- **ESLint & Prettier** - Code formatting and linting

## Prerequisites

### System Requirements
- **RAM**: 8GB minimum (16GB recommended for optimal performance)
- **CPU**: Multi-core processor recommended

### Required Software
- **Docker** (20.10+) and **Docker Compose** (2.0+)
- **Git** for cloning the repository

### Important for Windows Users
⚠️ **Windows users must use WSL (Windows Subsystem for Linux)** for optimal compatibility. The setup is designed for Unix-like environments. Follow these steps:

1. Install WSL2: `wsl --install`
2. Install Docker Desktop with WSL2 backend
3. Clone and run the project within your WSL2 environment

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Mark-Mekhail/AI-Chatbot.git
cd AI-Chatbot
```

### 2. Start the Application
```bash
# Make scripts executable (Linux/Mac/WSL)
chmod +x scripts/*.sh

# Start the entire application stack
docker compose up -d --build
```

### 3. Access the Application
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

The first startup may take several minutes as Docker downloads images and the AI model.

## Usage

### Basic Chat Interaction
1. Open your browser to http://localhost:80
2. Type your message in the input field
3. Press Enter or click "Send"
4. Watch as the AI responds in real-time with streaming text
5. Use the "Stop" button to cancel generation if needed

### Key Features to Try
- **Multi-turn conversations** - The AI remembers context
- **Real-time streaming** - See responses as they're generated
- **Responsive design** - Works on desktop and mobile
- **Error handling** - Graceful degradation when issues occur

### Example Conversations
```
You: Hello! What can you help me with?
AI: Hello! I'm an AI assistant. I can help you with...

You: Can you explain machine learning?
AI: Machine learning is a subset of artificial intelligence...
```

*Screenshots and demo GIF coming soon*

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   FastAPI       │    │   LLM Model     │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Inference)   │
│   Port: 80      │    │   Port: 8000    │    │   llama-cpp     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Communication Flow
1. **User Input**: React frontend captures user messages
2. **API Request**: Frontend sends POST request to `/api/chat/`
3. **SSE Stream**: Backend establishes Server-Sent Events connection
4. **LLM Processing**: llama-cpp processes the conversation
5. **Real-time Response**: Tokens streamed back through SSE
6. **UI Updates**: React updates the interface in real-time

### Key Components
- **Frontend Router**: Handles navigation and state management
- **Chat Service**: Manages API communication and streaming
- **LLM Service**: Singleton managing model lifecycle
- **Health Monitoring**: Real-time system and model status

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
MODEL_PATH=/app/models/llama-2-7b-chat.gguf
N_CTX=2048                    # Context window size
N_THREADS=4                   # CPU threads for inference
N_GPU_LAYERS=-1               # GPU layers (-1 = auto)
```

### Custom Model Setup
To use a different LLM model:

1. Place your `.gguf` model file in the `models/` directory
2. Update `MODEL_PATH` in docker-compose.yml or .env
3. Restart the application: `./chatbot start`

### Performance Tuning
- **More RAM**: Increase `N_CTX` for longer conversations
- **GPU Available**: Set `N_GPU_LAYERS` to offload to GPU
- **CPU Cores**: Adjust `N_THREADS` to match your CPU

## The Chatbot Management Tool

The project includes a powerful command-line tool `./chatbot` that automates setup, management, and troubleshooting of the AI Chat application.

### Making the Tool Executable
```bash
# First time setup - make the script executable
chmod +x chatbot
```

### Available Commands

#### `./chatbot` or `./chatbot help`
Shows all available commands and usage information.

#### `./chatbot start`
**Complete application startup** - The recommended way to start the application:
- Checks and installs system dependencies (Docker, etc.)
- Verifies or downloads the AI model automatically
- Starts all Docker containers
- Performs health checks
- Opens the application in your browser (macOS)

```bash
./chatbot start
# Output: Step-by-step progress with colored status messages
```

#### `./chatbot stop`
Cleanly stops all application containers:
```bash
./chatbot stop
```

#### `./chatbot restart`
Stops and starts the application:
```bash
./chatbot restart
```

#### `./chatbot logs`
Shows real-time application logs (press Ctrl+C to exit):
```bash
./chatbot logs
```

#### `./chatbot status`
Checks if the application is running properly:
```bash
./chatbot status
```

#### `./chatbot model`
Manages the AI model:
- Checks if model exists
- Downloads model if missing
- Verifies model integrity

```bash
./chatbot model
```

#### `./chatbot test`
Runs all test suites:
```bash
./chatbot test
```

### Smart Features

The chatbot tool includes several intelligent features:

- **Dependency Checking**: Automatically detects and installs missing dependencies
- **Model Management**: Downloads the correct AI model if missing or corrupted
- **Health Monitoring**: Verifies services are running properly before reporting success
- **Error Recovery**: Provides helpful suggestions when issues occur
- **Cross-Platform**: Works on macOS, Linux, and Windows (with WSL)
- **Colored Output**: Easy-to-read status messages with color coding
- **Browser Integration**: Automatically opens the app in your browser (macOS)

### Behind the Scenes

When you run `./chatbot start`, the tool:

1. **Checks Dependencies** (`scripts/check_dependencies.sh`)
   - Verifies Docker and Docker Compose are installed
   - Installs missing dependencies when possible

2. **Manages AI Model** (`scripts/model_manager.sh`)
   - Checks if the Llama model exists
   - Downloads from Hugging Face if missing
   - Verifies file integrity

3. **Docker Operations** (`scripts/docker_manager.sh`)
   - Pulls latest Docker images
   - Builds and starts containers
   - Monitors startup progress
   - Performs health checks

4. **Status Reporting** (`scripts/utils.sh`)
   - Provides colored, informative output
   - Reports success/failure clearly
   - Offers next steps

## Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check if ports are available
docker compose down
netstat -tulpn | grep :80
netstat -tulpn | grep :8000

# Restart with fresh images
docker compose down -v
./chatbot start
```

#### Model Download Issues
```bash
# Check available disk space
df -h

# Manually download model
cd models/
wget https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf
```

#### Memory Issues
- Reduce `N_CTX` in environment variables
- Use a smaller quantized model
- Increase Docker memory limits in Docker Desktop

#### Windows/WSL Specific
- Ensure Docker Desktop WSL2 integration is enabled
- Run commands within WSL2, not Windows Command Prompt
- Check WSL2 memory allocation: `wsl --status`

### Verify Setup
```bash
# Check container status
docker compose ps

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Test backend directly
curl http://localhost:8000/health
```

### Performance Issues
- **Slow responses**: Check available RAM and CPU usage
- **Out of memory**: Reduce model size or context window
- **GPU not detected**: Verify NVIDIA Docker runtime installation
