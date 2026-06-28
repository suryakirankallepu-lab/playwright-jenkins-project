
pipeline {
    agent any

    options {
        timestamps()
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
                bat '''
                echo Installing Node and dependencies
                node -v
                npm -v
                npm install
                npx playwright install
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat '''
                echo Running tests
                rmdir /s /q test-results 2>nul
                rmdir /s /q playwright-report 2>nul

                npx playwright test --project=chromium --reporter=html
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
            echo 'All tests passed'
        }

        failure {
            echo 'Tests failed'
        }
    }
}
