pipeline {

    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.45.0-focal'
            args '--ipc=host'
        }
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "Running in Playwright Docker"
                    node -v
                    npm -v
                    npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
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