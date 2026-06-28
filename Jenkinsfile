
pipeline {
    agent any   // ✅ THIS WAS MISSING

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
                // ✅ Windows Jenkins → use bat instead of sh
                bat 'node -v'
                bat 'npm -v'
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            parallel {

                stage('Chromium') {
                    steps {
                        bat 'npx playwright test --project=chromium'
                    }
                }

                stage('Firefox') {
                    steps {
                        bat 'npx playwright test --project=firefox'
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
}
