
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
    parallel {

        stage('Chromium Tests') {
            steps {
                bat 'echo Running Chromium tests...'
                bat 'npx playwright test --project=chromium --reporter=html'
            }
        }

        stage('Firefox Tests') {
            steps {
                bat 'echo Running Firefox tests...'
                bat 'npx playwright test --project=firefox --reporter=html'
            }
        }
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
