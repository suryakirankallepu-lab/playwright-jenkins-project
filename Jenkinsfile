pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Run Tests in Docker (Linux/Docker only)') {
            when {
                expression { isUnix() }
            }
            steps {
                sh '''
                    echo "Running Playwright inside Docker..."

                    docker run --rm \
                      -v $PWD:/app \
                      -w /app \
                      mcr.microsoft.com/playwright:v1.45.0-focal \
                      bash -c "npm install && npx playwright test"
                '''
            }
        }

        stage('Run Tests on Windows') {
            when {
                not { expression { isUnix() } }
            }
            steps {
                bat '''
                    echo Running on Windows machine
                    npm install
                    npx playwright install
                    npx playwright test
                '''
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo '✅ Tests Passed'
        }
        failure {
            echo '❌ Tests Failed'
        }
    }
}