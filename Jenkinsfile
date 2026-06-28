pipeline {
    agent any

    options {
        skipDefaultCheckout(true)   // ✅ VERY IMPORTANT
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                sh '''
                echo "Running Playwright inside Docker..."

                docker run --rm \
                  -v $(pwd):/app \
                  -w /app \
                  mcr.microsoft.com/playwright:v1.45.0-focal \
                  bash -c "ls -la && npm install && npx playwright test"
                '''
            }
        }
    }
}