
pipeline {
    agent any

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
        bat 'echo Installing dependencies...'
        bat 'node -v'
        bat 'npm -v'
        bat 'npm install'
        bat 'npx playwright install'
    }
}


        
stage('Run Playwright Tests') {
    steps {
        bat 'echo Running tests...'
        bat 'rmdir /s /q test-results 2>nul'
        bat 'rmdir /s /q playwright-report 2>nul'
        bat 'npx playwright test --project=chromium --reporter=html'
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
        failure {
            echo 'Tests failed'
        }
        success {
            echo 'Tests passed'
        }
    }
}
